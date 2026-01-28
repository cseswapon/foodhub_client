export default async function Provider({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <h1>Provider Page {id}</h1>
    </>
  );
}
