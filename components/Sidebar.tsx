"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Users, Map, LayoutDashboard } from "lucide-react";
import clsx from "clsx";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Vozidla", href: "/vehicles", icon: Car },
  { name: "Řidiči", href: "/drivers", icon: Users },
  { name: "Jízdy", href: "/rides", icon: Map },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-zinc-950 text-white border-r border-zinc-800">
      <div className="flex h-16 items-center px-6 border-b border-zinc-800">
        <Car className="h-6 w-6 text-indigo-500" />
        <span className="ml-3 text-lg font-bold">Správa vozidel</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
                )}
              >
                <item.icon
                  className={clsx(
                    isActive ? "text-white" : "text-zinc-400 group-hover:text-white",
                    "mr-3 h-5 w-5 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
