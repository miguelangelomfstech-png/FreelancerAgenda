"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight, DollarSign, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stages = [
  {
    id: "lead",
    name: "Lead",
    items: [
      { id: "1", title: "Enterprise Software License", customer: "Acme Corp", value: "$50,000", date: "Jun 12" },
      { id: "2", title: "Monthly Support Plan", customer: "Nexus AI", value: "$5,000", date: "Jun 15" },
    ],
  },
  {
    id: "qualified",
    name: "Qualified",
    items: [
      { id: "3", title: "Custom Dashboard Build", customer: "Zenith Inc", value: "$15,000", date: "Jun 20" },
    ],
  },
  {
    id: "negotiation",
    name: "Negotiation",
    items: [
      { id: "4", title: "Cloud Migration Services", customer: "Horizon Star", value: "$120,000", date: "Jul 05" },
    ],
  },
  {
    id: "closed",
    name: "Closed Won",
    items: [
      { id: "5", title: "Annual Maintenance Contract", customer: "Vector GMBH", value: "$25,000", date: "May 28" },
    ],
  },
];

export default function OpportunitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Pipeline</h1>
          <p className="text-muted-foreground">
            Track and manage your sales opportunities through the funnel.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Opportunity
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {stages.map((stage) => (
          <div key={stage.id} className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                {stage.name}
              </h3>
              <Badge variant="secondary">{stage.items.length}</Badge>
            </div>
            
            <div className="space-y-3 bg-muted/40 p-2 rounded-lg min-h-[500px]">
              {stage.items.map((item) => (
                <Card key={item.id} className="cursor-pointer hover:border-primary/50 transition-colors shadow-sm">
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-sm font-bold leading-tight">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-xs font-medium text-primary">
                      {item.customer}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <DollarSign className="h-3 w-3" />
                        <span className="font-semibold text-foreground">{item.value}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {stage.items.length === 0 && (
                <div className="h-24 flex items-center justify-center border-2 border-dashed border-muted rounded-md">
                   <span className="text-xs text-muted-foreground italic">No items here</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
