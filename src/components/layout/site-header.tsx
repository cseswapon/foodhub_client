"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../ui/mood-toggle";
import React from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) py-4">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <nav className="flex items-center gap-1.5 overflow-hidden">
          {pathSegments.length === 0 ? (
            <span className="text-sm font-medium">Dashboard</span>
          ) : (
            pathSegments.map((segment, index) => {
              const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
              const isLast = index === pathSegments.length - 1;

              return (
                <React.Fragment key={href}>
                  {index > 0 && (
                    <ChevronRight className="size-3.5 text-muted-foreground" />
                  )}
                  {isLast ? (
                    <span className="text-sm font-semibold capitalize text-foreground truncate">
                      {segment.replace(/-/g, " ")}
                    </span>
                  ) : (
                    <Link
                      href={href}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors capitalize truncate"
                    >
                      {segment.replace(/-/g, " ")}
                    </Link>
                  )}
                </React.Fragment>
              );
            })
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
