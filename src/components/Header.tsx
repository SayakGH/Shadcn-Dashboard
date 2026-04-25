import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";
import { Logo } from "@/assets/Logo";
import { MenuIcon } from "lucide-react";

export const Header = () => {
  const { isMobile, toggleSidebar } = useSidebar();

  if (isMobile) {
    return (
      <header className="flex items-center justify-between gap-4 px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <Logo variant="icon" />
          <span className="text-2xl font-bold">Dashboard</span>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="Toggle mobile Sidebar"
          >
            <MenuIcon />
          </Button>
        </div>
      </header>
    );
  }

  return null;
};
