export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const data = await fetch(
    `https://api.mihomo.me/sr_info_parsed/${slug}?lang=fr&is_force_update=true`
  );

  const jsonData = await data.json();
  if (!data.ok) {
    if (jsonData.detail === "User not found") {
      return Response.json({ status: 404 });
    }

    if (jsonData.detail === "Invalid uid") {
      return Response.json({ status: 400 });
    }

    return Response.json({ status: 503 });
  }

  return Response.json({ status: 200, ...jsonData });
}
