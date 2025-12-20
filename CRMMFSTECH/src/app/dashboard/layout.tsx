import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <div className="flex-1">
              <h2 className="text-sm font-medium text-muted-foreground">
                Enterprise CRM Portal
              </h2>
            </div>
          </header>
          <div className="p-6 md:p-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
