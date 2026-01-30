import OrdersTable from "@/components/module/order/OrderTable";

export default function AdminOrders() {
  const fakeOrdersData = [
    {
      id: "ec809d49-317e-4c6a-9c73-70688aa87260",
      user_id: "wzPBmBrU5FAnkNieXf3pqsmUd6LOfXKP",
      provider_id: "0dd55798-1b64-4ecd-bb47-be82951d7d06",
      total_price: "1500",
      delivery_address: "ধানমন্ডি, ঢাকা",
      payment_method: "cod",
      status: "placed",
      created_at: "2026-01-30T10:29:32.454Z",
      provider: {
        restaurant_name: "Pizza Point - 10",
        address: "গুলশান ১, ঢাকা",
      },
      orderItems: [
        {
          quantity: 3,
          meal: { name: "Chicken Biryani", price: "500" },
        },
      ],
      user: {
        name: "Csutomer One",
        email: "customer1@gmail.com",
      },
    },
    {
      id: "bbc0db56-6225-41da-b021-86d940705a96",
      user_id: "wzPBmBrU5FAnkNieXf3pqsmUd6LOfXKP",
      provider_id: "1ea33618-d7c7-4ac2-8ef9-aa0915bcacd4",
      total_price: "1500",
      delivery_address: "ধানমন্ডি, ঢাকা",
      payment_method: "cod",
      status: "preparing",
      created_at: "2026-01-30T09:41:40.026Z",
      provider: {
        restaurant_name: "Pizza Point - 9",
        address: "গুলশান ১, ঢাকা",
      },
      orderItems: [
        {
          quantity: 3,
          meal: { name: "Chicken Biryani", price: "500" },
        },
      ],
      user: {
        name: "Customer Two",
        email: "customer2@gmail.com",
      },
    },
  ];

  return (
    <main className="p-6 md:p-10 space-y-8">
      {/* Table Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter  italic">
            Order <span className="text-[#a3a380]">Logistics</span>
          </h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">
            Real-time incoming orders & management
          </p>
        </div>
      </div>

      {/* Orders Table Component */}
      <OrdersTable orders={fakeOrdersData} role="admin"/>
    </main>
  );
}
