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
      className="block w-full rounded-xl border-2 border-gray-900 bg-white px-5 py-4 text-center font-medium transition hover:-translate-y-0.5 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 active:translate-y-0"
    >
      {title}
    </a>
  );
}
