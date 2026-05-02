import {
  IconLayoutDashboard,
  IconUsers,
  IconShoppingBag,
  IconCategory,
  IconStar,
  IconBrain,
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
  {
    title: "Reviews",
    url: "/admin/reviews",
    icon: IconStar,
  },
  {
    title: "AI Index",
    url: "/admin/ai-index",
    icon: IconBrain,
  },
];
