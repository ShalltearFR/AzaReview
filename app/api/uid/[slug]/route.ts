export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const data = await fetch(
    `https://api.mihomo.me/sr_info_parsed/${slug}?lang=fr&is_force_update=true`
  );
  if (!data.ok) {
    return Response.json({ status: 500 });
  }

  const jsonData = await data.json();
  return Response.json({ status: 200, ...jsonData });
}
