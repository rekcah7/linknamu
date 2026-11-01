import Image from "next/image";
import type { Profile as ProfileData } from "@/data/links";

export default function Profile({ name, bio, image }: ProfileData) {
  return (
    <header className="flex flex-col items-center text-center">
      {image ? (
        <Image
          src={image}
          alt={`${name} 프로필 사진`}
          width={192}
          height={192}
          priority
          // SVG는 Next.js 이미지 최적화를 거치지 않도록 그대로 사용합니다.
          unoptimized={image.endsWith(".svg")}
          className="h-48 w-48 rounded-full border-2 border-gray-900 object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-48 w-48 items-center justify-center rounded-full border-2 border-gray-900 bg-emerald-100 text-5xl font-bold text-emerald-700"
        >
          {name.charAt(0)}
        </div>
      )}
      <h1 className="mt-6 text-xl font-bold">{name}</h1>
      <p className="mt-2 text-gray-600">{bio}</p>
    </header>
  );
}
