import { NextResponse } from "next/server";
import { links } from "@/data/links";
import { getClicksCollection } from "@/lib/mongodb";

const validIds = new Set(links.map((link) => link.id));

// POST /api/clicks/:id — 해당 링크의 클릭 수를 1 올립니다.
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!validIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 404 });
  }

  try {
    const clicks = await getClicksCollection();
    await clicks.updateOne({ _id: id }, { $inc: { count: 1 } }, { upsert: true });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
