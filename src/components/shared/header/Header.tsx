"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, User, ShoppingBag, LogOut, UserCircle } from "lucide-react";
import { FaBowlFood } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Accordion, AccordionItem } from "@/components/ui/accordion";

// Shadcn Dropdown Menu Imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { IconStar } from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";
import { MdDashboard } from "react-icons/md";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
}

export function Header({ className }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const router = useRouter();

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const session = await authClient.getSession();
      // console.log(session);
      if (session.data?.user) {
        setIsLoggedIn(true);
        setUser(session ? session : null);
      } else {
        setIsLoggedIn(false);
      }
    })();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const menu: MenuItem[] = [
    { title: "Home", url: "/" },
    { title: "Meal", url: "/meal" },
    { title: "Provider", url: "/provider" },
  ];

  const handelSignout = async () => {
    const data = await authClient.signOut();
    if (data.data?.success) {
      router.push("/auth/login");
      setIsLoggedIn(false);
    }
  };

  // console.log("User=>", user);

  return (
    <section
      className={cn(
        "fixed top-0 left-0 w-full z-50 py-5 transition-transform duration-300",
        showHeader ? "translate-y-0 " : "-translate-y-full",
        isHome ? "bg-black/50 backdrop-blur-md" : "bg-[#0a0a0a]",
        className,
      )}
    >
      <div className="container mx-auto md:px-0 px-4">
        {/* Desktop */}
        <nav className="hidden lg:flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white">
            <FaBowlFood size={35} />
            <span className="text-xl font-bold">Food Hub</span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {menu.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <NavigationMenuItem key={item.title}>
                    <Link
                      href={item.url}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive
                          ? "bg-white/20 text-white"
                          : "text-white hover:bg-white/20",
                      )}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              /* Profile Dropdown when Logged In */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 p-0 overflow-hidden border border-white/10"
                  >
                    <UserCircle className="h-6 w-6 text-[#a3a380]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-[#1f2120] border-white/10 text-white mt-2"
                  align="end"
                >
                  <DropdownMenuLabel className="font-black uppercase text-[10px] tracking-widest text-[#a3a380]">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  {["admin", "provider"].includes(
                    user?.data?.user?.role as string,
                  ) && (
                    <DropdownMenuItem
                      asChild
                      className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white"
                    >
                      <Link
                        href={`${user?.data?.user?.role === "admin" ? "/admin" : "/provider/dashboard"}`}
                        className="flex items-center gap-2 w-full"
                      >
                        <MdDashboard size={16} /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {["customer", "provider"].includes(
                    user?.data?.user?.role as string,
                  ) && (
                    <DropdownMenuItem
                      asChild
                      className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white"
                    >
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 w-full"
                      >
                        <User size={16} /> Profile
                      </Link>
                    </DropdownMenuItem>
                  )}

                  {String(user?.data?.user?.role || "").startsWith(
                    "customer",
                  ) && (
                    <DropdownMenuItem
                      asChild
                      className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white"
                    >
                      <Link
                        href="/review"
                        className="flex items-center gap-2 w-full"
                      >
                        <IconStar size={16} />
                        My Review
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {String(user?.data?.user?.role || "").startsWith(
                    "customer",
                  ) && (
                    <DropdownMenuItem
                      asChild
                      className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white"
                    >
                      <Link
                        href="/order"
                        className="flex items-center gap-2 w-full"
                      >
                        <ShoppingBag size={16} /> My Orders
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem
                    onClick={() => handelSignout()}
                    className="text-red-500 focus:bg-red-500/10 focus:text-red-500 cursor-pointer"
                  >
                    <LogOut size={16} className="mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Auth Buttons when Logged Out */
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="bg-[#1a1a1a] text-white border-white/10 hover:bg-[#252525] hover:text-[#a3a380] transition-all duration-300"
                >
                  <Link href="/auth/login">Login</Link>
                </Button>

                <Button
                  asChild
                  size="sm"
                  className="bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] tracking-tight active:scale-95 transition-all duration-300 border-none"
                >
                  <Link href="/auth/register">Signup</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex items-center justify-between lg:hidden">
          <Link href="/" className="flex items-center gap-2 text-white">
            <FaBowlFood size={32} />
            <span className="text-lg font-bold">Food Hub</span>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost">
                <Menu className="text-white" />
              </Button>
            </SheetTrigger>

            <SheetContent className="bg-[#1f2120] border-l-white/10 text-white">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <FaBowlFood size={30} className="text-[#a3a380]" />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-4 p-5">
                <Accordion type="single" collapsible>
                  {menu.map((item) => {
                    const isActive = pathname === item.url;

                    return (
                      <AccordionItem
                        key={item.title}
                        value={item.title}
                        className="border-b-0"
                      >
                        <Link
                          href={item.url}
                          className={cn(
                            "block py-2 text-lg font-semibold",
                            isActive ? "text-[#a3a380]" : "text-white",
                          )}
                        >
                          {item.title}
                        </Link>
                      </AccordionItem>
                    );
                  })}
                </Accordion>

                <Separator className="bg-white/5 my-2" />

                <div className="flex flex-col gap-3">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 py-2 text-gray-300 hover:text-[#a3a380]"
                      >
                        <User size={20} /> Profile
                      </Link>
                      <Link
                        href="/order"
                        className="flex items-center gap-3 py-2 text-gray-300 hover:text-[#a3a380]"
                      >
                        <ShoppingBag size={20} /> My Orders
                      </Link>
                      <Button
                        onClick={() => handelSignout()}
                        variant="default"
                        className="mt-4 border-red-500/50 text-red-500 hover:bg-red-500/10"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        asChild
                        className="border-white/10 hover:bg-white/5"
                      >
                        <Link href="/auth/login">Login</Link>
                      </Button>
                      <Button
                        asChild
                        className="bg-[#a3a380] text-[#1f2120] hover:bg-[#8e8e6f] font-bold"
                      >
                        <Link href="/auth/register">Sign up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}
