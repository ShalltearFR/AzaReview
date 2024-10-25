import { EditPage } from "@/components/Editor/EditPage";

async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  return <EditPage id={id} />;
}

export default Page;
