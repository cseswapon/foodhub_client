import {
  IconLayoutDashboard,
  IconUsers,
  IconShoppingBag,
  IconCategory,
} from "@tabler/icons-react";

import { RouteItem } from "@/types";

export const adminRoute: RouteItem[] = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: IconLayoutDashboard,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: IconUsers,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: IconShoppingBag,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: IconCategory,
  },
];
