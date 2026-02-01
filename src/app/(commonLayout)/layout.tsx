import Cart from "@/components/common/cart/Cart";
// import CustomCursor from "@/components/common/cursor/CustomCursor";
import { Footer } from "@/components/shared/footer/Footer";
import { Header } from "@/components/shared/header/Header";
import { CartProvider } from "@/context/cart-context";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CartProvider>
        {/* <CustomCursor /> */}
        <div className="fixed bottom-10 right-10 z-100">
          <Cart />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#a3a380]/5 rounded-full blur-[120px]" />
        </div>
        <Header className="py-3 backdrop-blur-md fixed z-50 top-0 w-full" />
        {children}
        <Footer />
      </CartProvider>
    </>
  );
}
