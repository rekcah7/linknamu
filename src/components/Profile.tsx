import Image from "next/image";
import type { Profile as ProfileData } from "@/data/links";

export default function Profile({ name, bio, image }: ProfileData) {
  return (
    <header className="flex flex-col items-center text-center">
      {image ? (
        <Image
          src={image}
          alt={`${name} 프로필 사진`}
          width={112}
          height={112}
          priority
          // SVG는 Next.js 이미지 최적화를 거치지 않도록 그대로 사용합니다.
          unoptimized={image.endsWith(".svg")}
          className="h-28 w-28 rounded-full object-cover shadow-[0_10px_30px_-8px_rgb(120_70_40/0.35)] ring-4 ring-white/80"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-28 w-28 items-center justify-center rounded-full bg-white/60 text-4xl font-semibold text-orange-400 shadow-[0_10px_30px_-8px_rgb(120_70_40/0.35)] ring-4 ring-white/80"
        >
          {name.charAt(0)}
        </div>
      )}
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-stone-900">
        {name}
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-stone-500">{bio}</p>
    </header>
  );
}
