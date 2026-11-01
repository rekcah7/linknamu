import { NextResponse } from "next/server";
import { links } from "@/data/links";
import { getClicksCollection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

// GET /api/clicks — 링크별 클릭 수를 조회합니다.
export async function GET() {
  try {
    const clicks = await getClicksCollection();
    const docs = await clicks.find({}).toArray();
    const counts = new Map(docs.map((doc) => [doc._id, doc.count]));

    return NextResponse.json(
      links.map((link) => ({ id: link.id, title: link.title, count: counts.get(link.id) ?? 0 })),
    );
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return NextResponse.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}
