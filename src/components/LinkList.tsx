"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/links";
import LinkCard from "@/components/LinkCard";

type ClickCount = { id: string; count: number };

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 모든 링크를 0회로 표시합니다.
  const [counts, setCounts] = useState<Record<string, number>>({});

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져옵니다.
  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<ClickCount[]>) : Promise.reject(res)))
      .then((data) => {
        // 응답을 기다리는 사이 클릭으로 늘어난 값은 잃지 않도록 더 큰 값을 남깁니다.
        setCounts((prev) => {
          const next = { ...prev };
          for (const { id, count } of data) next[id] = Math.max(count, prev[id] ?? 0);
          return next;
        });
      })
      .catch(() => {
        // 불러오기에 실패하면 0회 표시를 그대로 둡니다.
      });

    return () => controller.abort();
  }, []);

  // 클릭하면 서버 응답을 기다리지 않고 화면의 숫자를 바로 1 올립니다.
  const handleClick = (id: string) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <ul className="mt-12 flex w-full flex-col gap-4 sm:gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard {...link} count={counts[link.id] ?? 0} onClick={handleClick} />
        </li>
      ))}
    </ul>
  );
}
