
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface SidebarNavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SidebarNavProps {
  items: SidebarNavItem[];
  className?: string;
}

export function SidebarNav({ items, className }: SidebarNavProps) {
  return (
    <nav className={cn("grid gap-2", className)}>
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) => cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
            "transition-all hover:bg-accent hover:text-accent-foreground",
            isActive ? "bg-accent text-accent-foreground" : "transparent",
            item.disabled && "pointer-events-none opacity-60"
          )}
        >
          {item.icon && <span>{item.icon}</span>}
          <span>{item.title}</span>
        </NavLink>
      ))}
    </nav>
  );
}
