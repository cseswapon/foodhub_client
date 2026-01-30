import { ComponentType } from "react";

export interface RouteItem {
  title: string;
  url: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}
