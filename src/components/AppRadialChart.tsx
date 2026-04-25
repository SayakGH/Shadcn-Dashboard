import { RadialBar, RadialBarChart, Label, PolarRadiusAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

import type { ChartConfig } from "./ui/chart";

import { VENDOR_MONITORED } from "@/constant";

const chartConfig = {
  monitored: { label: "Total Monitored", color: "var(--chart-3)" },
  limit: {
    label: "Available Limit",
    color: "var(--color-secondary)",
  },
} satisfies ChartConfig;

function AppRadialChart() {
  const totalLimits = VENDOR_MONITORED[0].monitored + VENDOR_MONITORED[0].limit;
  return (
    <ChartContainer config={chartConfig} className="w-[200px] h-[110px]">
      <RadialBarChart
        data={VENDOR_MONITORED}
        startAngle={0}
        endAngle={180}
        innerRadius="90"
        outerRadius="140"
        cy={104}
      >
        <PolarRadiusAxis />
        <RadialBar
          dataKey="limit"
          stackId="a"
          fill="var(--color-limit)"
          cornerRadius={20}
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="monitored"
          stackId="a"
          fill="var(--color-monitored)"
          cornerRadius={20}
        />

        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={(viewBox.cy || 0) - 16}
                    textAnchor="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {totalLimits.toLocaleString()}
                    </tspan>
                  </text>
                );
              }
              return null;
            }}
          />
        </PolarRadiusAxis>

        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      </RadialBarChart>
    </ChartContainer>
  );
}

export default AppRadialChart;
