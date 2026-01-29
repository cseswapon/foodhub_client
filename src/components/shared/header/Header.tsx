"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";
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
import {
  Accordion,
  AccordionItem,
} from "@/components/ui/accordion";

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

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  return (
    <section
      className={cn(
        "fixed top-0 left-0 w-full z-50 py-5! transition-transform duration-300",
        showHeader ? "translate-y-0" : "-translate-y-full",
        isHome ? "bg-black/50 backdrop-blur-md" : "bg-[#0a0a0a]",
        className,
      )}
    >
      <div className="container mx-auto">
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

          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/auth/register">Sign up</Link>
            </Button>
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

            <SheetContent className="bg-secondary">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <FaBowlFood size={30} />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-4">
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
                            isActive ? "text-primary" : "text-foreground",
                          )}
                        >
                          {item.title}
                        </Link>
                      </AccordionItem>
                    );
                  })}
                </Accordion>

                <div className="flex flex-col gap-3 pt-4">
                  <Button asChild variant="outline">
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth/register">Sign up</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}
