import Avatar from "react-avatar";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarHeader,
  SidebarGroupContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarMenuButton,
  SidebarContent,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LogOutIcon } from "lucide-react";
import { Logo } from "@/assets/Logo";
import { APP_SIDEBAR } from "@/constant";
import { UserMenu } from "./UserMenu";

export const AppSidebar = () => {
  const { isMobile, state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <TooltipProvider>
      <Sidebar variant="floating" collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className="flex justify-start">
              <Logo variant="icon" />
              {isMobile && (
                <span className="text-2xl pl-2 font-semibold">Dashboard</span>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {APP_SIDEBAR.primaryNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a href={item.url} className="flex items-center gap-2">
                        <item.Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {isMobile && (
            <SidebarGroup className="mt-auto">
              <SidebarGroupContent>
                <SidebarMenu>
                  {APP_SIDEBAR.secondaryNav.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <a href={item.url} className="flex items-center gap-2">
                          <item.Icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>

        <SidebarFooter className={cn((isMobile || isExpanded) && "border-t")}>
          <SidebarMenu>
            <SidebarMenuItem className={cn((isMobile || isExpanded) && "p-2")}>
              {isMobile || isExpanded ? (
                <div className="flex justify-between items-start gap-2">
                  <div className="grid grid-cols-[max-content_minmax(0,1fr)] items-center gap-2">
                    <div className="relative">
                      <Avatar
                        src={APP_SIDEBAR.curProfile.src}
                        size="36px"
                        round="8px"
                      />
                      <div className="absolute bottom-0 right-0 size-2 rounded-full bg-emerald-500 dark:bg-emerald-400 ring-sidebar ring-1"></div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold">
                        {APP_SIDEBAR.curProfile.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {APP_SIDEBAR.curProfile.email}
                      </p>
                    </div>
                  </div>

                  <Button variant="ghost" size="icon-sm" aria-label="Logout">
                    <LogOutIcon />
                  </Button>
                </div>
              ) : (
                <UserMenu />
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
};
