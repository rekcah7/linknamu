"use client";

import type { LinkItem } from "@/data/links";

export default function LinkCard({ id, title, url }: LinkItem) {
  // 페이지를 떠나도 요청이 전송되도록 sendBeacon을 사용합니다.
  // 링크 이동 자체는 막지 않으므로 집계가 실패해도 사용자는 영향이 없습니다.
  const trackClick = () => {
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
      className="block w-full rounded-2xl border border-white/70 bg-white/45 px-6 py-[1.125rem] text-center text-[15px] font-medium text-stone-700 shadow-[0_4px_24px_-6px_rgb(120_70_40/0.12)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_8px_28px_-6px_rgb(120_70_40/0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 active:translate-y-0"
    >
      {title}
    </a>
  );
}
