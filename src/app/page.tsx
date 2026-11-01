import Profile from "@/components/Profile";
import LinkCard from "@/components/LinkCard";
import { links, profile } from "@/data/links";

// 와이어프레임(wireframe.png) 구성:
// 상단 — 원형 프로필 사진, 이름, 한 줄 소개
// 하단 — 링크 카드 목록(세로 배치)
export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center px-6 pt-20 pb-16 sm:pt-28">
      <Profile {...profile} />

      <ul className="mt-12 flex w-full flex-col gap-4 sm:gap-5">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard {...link} />
          </li>
        ))}
      </ul>
    </main>
  );
}
