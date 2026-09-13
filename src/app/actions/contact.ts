'use server';

import { Resend } from 'resend';

// 폼 제출 결과 타입 정의
export type ContactFormState = {
  success: boolean;
  message: string;
};

// 이메일 HTML 본문에 삽입하기 전 사용자 입력을 이스케이프 (HTML 인젝션 방지)
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// 문의 이메일을 발송하는 Server Action
export async function sendContactEmail(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // 허니팟 필드: 사람 눈에는 안 보이지만 봇은 채우는 경우가 많아 스팸을 걸러냄.
  // "company"처럼 흔한 자동완성 토큰은 브라우저가 실제 값을 채워 정상 제출을 막을 수 있어
  // 일부러 의미 없는 필드명을 사용함 (ContactSection.tsx의 name="hp_field"와 매칭)
  const honeypot = formData.get('hp_field') as string;
  if (honeypot) {
    console.warn('[contact] 허니팟 필드가 채워져 스팸으로 판단, 발송을 건너뜀');
    // 봇에게는 성공처럼 보이게 하여 재시도를 유도하지 않음
    return { success: true, message: '✓ 메시지가 전송되었습니다!' };
  }

  // 앞뒤 공백 제거 후 검증/발송 양쪽에 동일한 값을 사용 (검증만 trim하고 발송은 원본을 쓰는 불일치 방지)
  const name = ((formData.get('name') as string) ?? '').trim().slice(0, 100);
  const email = ((formData.get('email') as string) ?? '').trim().slice(0, 200);
  const subject = ((formData.get('subject') as string) ?? '').trim().slice(0, 200);
  const message = ((formData.get('message') as string) ?? '').trim().slice(0, 5000);

  // 필수 입력값 유효성 검사
  if (!name || !email || !message) {
    return { success: false, message: '이름, 이메일, 메시지는 필수 입력 항목입니다.' };
  }

  // 이메일 형식 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: '올바른 이메일 주소를 입력해주세요.' };
  }

  // API 키가 플레이스홀더면 개발 환경으로 처리 — 실제 전송은 없었음을 명확히 알림
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith('re_placeholder')) {
    console.warn(
      '[contact] RESEND_API_KEY가 설정되지 않아 이메일을 실제로 발송하지 않았습니다. (개발 환경 시뮬레이션)',
      { name, email, subject }
    );
    return {
      success: false,
      message: '⚠ 현재 이메일 발송이 설정되지 않아 실제로는 전송되지 않았습니다. 관리자에게 문의해주세요.',
    };
  }

  try {
    const resend = new Resend(apiKey);
    // 빈 문자열(Vercel 대시보드에서 값 없이 키만 등록된 경우 흔함)도 placeholder로 취급
    const toEmail = process.env.CONTACT_EMAIL?.trim() || 'contact@jk.dev';

    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: email,
      subject: `[포트폴리오 문의] ${subject || '새 메시지'}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;">
          <h2 style="color:#2c241e;border-bottom:3px solid #d8532d;padding-bottom:12px;">포트폴리오 문의</h2>
          <table style="width:100%;border-collapse:collapse;margin:20px 0;">
            <tr><td style="padding:8px 0;color:#74675a;width:80px;">이름</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#74675a;">이메일</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#74675a;">제목</td><td style="padding:8px 0;">${escapeHtml(subject || '제목 없음')}</td></tr>
          </table>
          <hr style="border-color:#ded4c2;margin:20px 0;" />
          <p style="white-space:pre-wrap;line-height:1.8;color:#2c241e;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return { success: true, message: '✓ 메시지가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다!' };
  } catch (error) {
    console.error('이메일 발송 오류:', error);
    return { success: false, message: '전송 중 오류가 발생했습니다. 이메일로 직접 연락해주세요.' };
  }
}
