/**
 * 클래스명들을 병합하고 falsy 값(false, undefined, null 등)을 필터링하는 유틸리티 함수
 * @param classes - 결합할 클래스명 목록
 * @returns 필터링되어 공백으로 구분된 클래스명 문자열
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * 날짜 문자열을 한국어 로케일 형식으로 변환하는 유틸리티 함수
 * @param date - 변환할 날짜 문자열 (예: '2024-05-15' 또는 ISO 문자열)
 * @returns 한국어 날짜 형식 문자열 (예: '2024년 5월 15일')
 */
export function formatDate(date: string): string {
  const parsedDate = new Date(date);

  // 유효하지 않은 날짜인 경우 원본 문자열을 그대로 반환
  if (isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate);
}
