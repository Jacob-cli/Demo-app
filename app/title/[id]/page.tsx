import { notFound } from "next/navigation";
import { getTitleById } from "@/lib/store";
import TitleDetailClient from "./TitleDetailClient";

export default function TitlePage({ params }: { params: { id: string } }) {
  const title = getTitleById(params.id);
  if (!title) return notFound();
  return <TitleDetailClient title={title} />;
}
