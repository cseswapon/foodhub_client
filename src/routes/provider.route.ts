import {
  IconLayoutDashboard,
  IconSoup,
  IconShoppingBag,
} from "@tabler/icons-react";

import { RouteItem } from "@/types";

export const providerRoute: RouteItem[] = [
  {
    title: "Dashboard",
    url: "/provider/dashboard",
    icon: IconLayoutDashboard,
  },
  {
    title: "Menu",
    url: "/provider/menu",
    icon: IconSoup,
  },
  {
    title: "Orders",
    url: "/provider/orders",
    icon: IconShoppingBag,
  },
];
