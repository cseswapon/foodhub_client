import OrderUpdateForm from "@/components/module/order/OrderUpdateForm";
import { OrderService } from "@/services/order.service";

const orderService = new OrderService();
export default async function OrderUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const details = await orderService.getOrderDetails(id);
  // console.log(details?.data?.status);
  const fakeOrder = {
    id: id,
    status: details?.data?.status,
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <OrderUpdateForm order={fakeOrder as any} />
    </div>
  );
}
