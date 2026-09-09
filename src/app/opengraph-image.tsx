import { ImageResponse } from 'next/og';

// 소셜 공유 OG 이미지 동적 생성 (1200x630)
export const alt = 'JK Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ background: '#f2eadb', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '80px', position: 'relative' }}>
        <div style={{ position: 'absolute', right: 0, top: 0, width: '38%', height: '100%', background: 'linear-gradient(135deg, rgba(216,83,45,0.08), rgba(216,83,45,0.02))', borderLeft: '1px solid rgba(44,36,30,0.1)' }} />
        <div style={{ fontFamily: 'monospace', fontSize: '15px', color: '#d8532d', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '28px', height: '2px', background: '#d8532d' }} />
          PORTFOLIO · DEVELOPER
        </div>
        <div style={{ fontSize: '130px', fontWeight: 700, color: '#2c241e', lineHeight: 0.9, marginBottom: '20px', letterSpacing: '-0.04em' }}>JK</div>
        <div style={{ fontSize: '26px', color: '#74675a', marginBottom: '40px' }}>Full-Stack Developer</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '28px', borderTop: '1px solid rgba(44,36,30,0.18)', width: '480px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d8532d' }} />
          <div style={{ fontSize: '17px', color: '#74675a' }}>사용자 경험을 코드로 설계합니다</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
