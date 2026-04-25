import "./App.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { SidebarProvider, SidebarInset } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { Header } from "./components/Header";
import { Page, PageHeader } from "./components/Page";
import { DashboardCard } from "./components/DashboardCard";
import AppBarChart from "./components/AppBarChart";
import AppRadialChart from "./components/AppRadialChart";
import { TrendingUpIcon } from "lucide-react";
import DashboardTable from "./components/DashboardTable";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main>
            <Page>
              <PageHeader />

              <div className=" grid  gap-6 py-8 lg:grid-cols-[1fr_360px]">
                <DashboardCard
                  title={"Vendor Breakdown"}
                  description={
                    "Keep track of vendors and their security ratings."
                  }
                  buttonText={"View Full Report"}
                >
                  <AppBarChart />
                </DashboardCard>

                <DashboardCard
                  title={"Vendor Monitored"}
                  description={"You're using 80% of available spots"}
                  buttonText={"Upgrade Plan"}
                >
                  <div className="flex justify-between items-start">
                    <AppRadialChart />
                    <div className="">
                      <TrendingUpIcon
                        size={20}
                        className="text-emerald-500 dark:text-emerald-400"
                      />

                      <span className="text-sm text-emerald-500 dark:text-emerald-400">
                        10%
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 lg:mt-8">
                    <p className="font-medium">
                      You have almost reached your limit
                    </p>
                    <p className="text-muted-foreground">
                      You have used 80% of your available spots. Upgrade plan to
                      monitor more vendors.
                    </p>
                  </div>
                </DashboardCard>
              </div>
              <DashboardTable />
            </Page>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
