import Cart from "@/components/shared/cart/Cart";
import CustomCursor from "@/components/shared/cursor/CustomCursor";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <CustomCursor /> */}
      <div className="fixed bottom-10 right-10 z-100">
        <Cart />
      </div>
      {children}
    </>
  );
}
