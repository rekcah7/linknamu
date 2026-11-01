// ⚠️ 아래 값은 모두 보여 주기용 더미 데이터입니다. 실제 내용으로 교체하세요.

export type Profile = {
  name: string;
  bio: string;
  /** public/ 폴더 기준 경로. 비워 두면 이름 첫 글자로 아바타를 표시합니다. */
  image?: string;
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export const profile: Profile = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
  image: "/profile-placeholder.svg",
};

export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com" },
  { id: "blog", title: "Blog", url: "https://example.com/blog" },
];
