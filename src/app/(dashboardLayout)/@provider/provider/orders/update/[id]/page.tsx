import OrderUpdateForm from "@/components/module/order/OrderUpdateForm";

export default async function OrderUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const fakeOrder = {
    id: id,
    status: "preparing" as const, 
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <OrderUpdateForm order={fakeOrder} />
    </div>
  );
}
