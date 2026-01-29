import Cart from "@/components/shared/cart/Cart";
import CustomCursor from "@/components/shared/cursor/CustomCursor";
import { Footer } from "@/components/shared/footer/Footer";
import { Header } from "@/components/shared/header/Header";

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
      <Header className="py-7 backdrop-blur-md fixed z-50 top-0 w-full" />
      {children}
      <Footer />
    </>
  );
}
