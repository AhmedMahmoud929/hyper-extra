import { Product } from "@/lib/types";
import {
  Apple,
  CreditCard,
  Flower,
  Flower2,
  LayoutDashboard,
  Logs,
  Package,
  Settings,
  ShoppingBasket,
  Truck,
  UsersRound,
} from "lucide-react";

export const sidebarItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    href: "/",
  },
  {
    label: "Products",
    icon: <Apple />,
    href: "/products",
  },
  {
    label: "Categories",
    icon: <Logs />,
    href: "/categories",
  },
  {
    label: "Customers",
    icon: <UsersRound />,
    href: "/customers",
  },
  {
    label: "Delivery Boys",
    icon: <Package />,
    href: "/delivery",
  },
  {
    label: "Orders",
    icon: <ShoppingBasket />,
    href: "/orders",
  },
  {
    label: "Shipments",
    icon: <Truck />,
    href: "/shipments",
  },
  {
    label: "Transactions",
    icon: <CreditCard />,
    href: "/transactions",
  },
  {
    label: "Settings",
    icon: <Settings />,
    href: "/settings",
  },
  {
    label: "React Query",
    icon: <Flower2 />,
    href: "/reactQuery",
  },
];
