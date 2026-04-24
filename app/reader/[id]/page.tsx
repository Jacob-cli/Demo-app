import { notFound } from "next/navigation";
import { getTitleById } from "@/lib/store";
import ReaderClient from "./ReaderClient";

export default function ReaderPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { chapter?: string; page?: string };
}) {
  const title = getTitleById(params.id);
  if (!title) return notFound();
  return (
    <ReaderClient
      title={title}
      initialChapter={searchParams.chapter ? parseInt(searchParams.chapter) : 1}
      initialPage={searchParams.page ? parseInt(searchParams.page) : 1}
    />
  );
}
