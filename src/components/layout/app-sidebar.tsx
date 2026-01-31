"use client";

import * as React from "react";

import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { FaBowlFood } from "react-icons/fa6";
import { RouteItem } from "@/types";
import { adminRoute, providerRoute } from "@/routes";

const user = {
  role: "provider",
};
let route: RouteItem[] = [];

if (user.role === "admin") {
  route = adminRoute;
} else if (user.role === "provider") {
  route = providerRoute;
} else {
  route = providerRoute;
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/no-image.png",
  },
  navMain: route,
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/" className="flex items-center gap-2 ">
                <FaBowlFood size={35} />
                <span className="text-xl font-bold">Food Hub</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
