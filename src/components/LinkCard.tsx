"use client";

import type { LinkItem } from "@/data/links";

type LinkCardProps = LinkItem & {
  count: number;
  onClick?: (id: string) => void;
};

export default function LinkCard({ id, title, url, count, onClick }: LinkCardProps) {
  // 페이지를 떠나도 요청이 전송되도록 sendBeacon을 사용합니다.
  // 링크 이동 자체는 막지 않으므로 집계가 실패해도 사용자는 영향이 없습니다.
  const trackClick = () => {
    onClick?.(id);
    const endpoint = `/api/clicks/${encodeURIComponent(id)}`;
    if (!navigator.sendBeacon?.(endpoint)) {
      fetch(endpoint, { method: "POST", keepalive: true }).catch(() => {});
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackClick}
      onAuxClick={(e) => e.button === 1 && trackClick()}
      // 글래스모피즘: 반투명 흰 배경 + 배경 블러 + 얇은 흰 테두리. 호버는 살짝 밝아지고 1px만 떠오릅니다.
      // 3칸 그리드: 왼쪽 빈칸과 오른쪽 클릭 수의 너비를 같게 두어 제목이 정확히 가운데에 옵니다.
      className="grid w-full grid-cols-[3.5rem_1fr_3.5rem] items-center rounded-2xl border border-white/70 bg-white/45 px-4 py-[1.125rem] text-[15px] font-medium text-stone-700 shadow-[0_4px_24px_-6px_rgb(120_70_40/0.12)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_8px_28px_-6px_rgb(120_70_40/0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 active:translate-y-0"
    >
      <span aria-hidden />
      <span className="text-center">{title}</span>
      <span
        className="text-right text-xs font-normal text-stone-400 tabular-nums"
        aria-label={`클릭 ${count.toLocaleString("ko-KR")}회`}
      >
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
