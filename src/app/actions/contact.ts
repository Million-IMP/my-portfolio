'use server';

import { Resend } from 'resend';

// 폼 제출 결과 타입 정의
export type ContactFormState = {
  success: boolean;
  message: string;
};

// 문의 이메일을 발송하는 Server Action
export async function sendContactEmail(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  // 필수 입력값 유효성 검사
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { success: false, message: '이름, 이메일, 메시지는 필수 입력 항목입니다.' };
  }

  // 이메일 형식 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: '올바른 이메일 주소를 입력해주세요.' };
  }

  // API 키가 플레이스홀더면 개발 환경으로 처리
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith('re_placeholder')) {
    console.log('[개발 환경] 이메일 발송 시뮬레이션:', { name, email, subject, message });
    return { success: true, message: '✓ 메시지가 전송되었습니다! (개발 환경 — 실제 키 설정 후 실제 발송)' };
  }

  try {
    const resend = new Resend(apiKey);
    const toEmail = process.env.CONTACT_EMAIL ?? 'contact@jk.dev';

    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: email,
      subject: `[포트폴리오 문의] ${subject || '새 메시지'}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;">
          <h2 style="color:#2c241e;border-bottom:3px solid #d8532d;padding-bottom:12px;">포트폴리오 문의</h2>
          <table style="width:100%;border-collapse:collapse;margin:20px 0;">
            <tr><td style="padding:8px 0;color:#74675a;width:80px;">이름</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#74675a;">이메일</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#74675a;">제목</td><td style="padding:8px 0;">${subject || '제목 없음'}</td></tr>
          </table>
          <hr style="border-color:#ded4c2;margin:20px 0;" />
          <p style="white-space:pre-wrap;line-height:1.8;color:#2c241e;">${message}</p>
        </div>
      `,
    });

    return { success: true, message: '✓ 메시지가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다!' };
  } catch (error) {
    console.error('이메일 발송 오류:', error);
    return { success: false, message: '전송 중 오류가 발생했습니다. 이메일로 직접 연락해주세요.' };
  }
}
