"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Target,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from "recharts";

const stats = [
  {
    title: "Total Customers",
    value: "1,284",
    description: "+12.5% from last month",
    icon: Users,
    trend: "up",
  },
  {
    title: "Active Leads",
    value: "452",
    description: "+4.3% from last week",
    icon: Target,
    trend: "up",
  },
  {
    title: "Open Opportunities",
    value: "$4.2M",
    description: "-2.1% from last month",
    icon: Briefcase,
    trend: "down",
  },
  {
    title: "Win Rate",
    value: "24.5%",
    description: "+1.2% from last quarter",
    icon: TrendingUp,
    trend: "up",
  },
];

const barData = [
  { name: "Jan", total: 1540 },
  { name: "Feb", total: 980 },
  { name: "Mar", total: 2400 },
  { name: "Apr", total: 1800 },
  { name: "May", total: 3200 },
  { name: "Jun", total: 2800 },
];

const pieData = [
  { name: "Leads", value: 400, color: "#2563eb" },
  { name: "Qualified", value: 300, color: "#10b981" },
  { name: "Negotiation", value: 200, color: "#f59e0b" },
  { name: "Closed Won", value: 100, color: "#8b5cf6" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back, here's what's happening with your sales pipeline today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3 text-rose-500" />
                )}
                <span className={stat.trend === "up" ? "text-emerald-500" : "text-rose-500"}>
                  {stat.description.split(" ")[0]}
                </span>
                <span className="ml-1">{stat.description.split(" ").slice(1).join(" ")}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>
              Monthly revenue growth for the current fiscal year.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar
                    dataKey="total"
                    fill="#2563eb"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Pipeline Distribution</CardTitle>
            <CardDescription>
              Leads breakdown by their current stage.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
