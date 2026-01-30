import {
  IconLayoutDashboard,
  IconSoup,
  IconShoppingBag,
} from "@tabler/icons-react";

import { HiOutlineBuildingStorefront } from "react-icons/hi2";

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
    title: "Provider",
    url: "/provider/my-provider",
    icon: HiOutlineBuildingStorefront,
  },
  {
    title: "Orders",
    url: "/provider/orders",
    icon: IconShoppingBag,
  },
];
