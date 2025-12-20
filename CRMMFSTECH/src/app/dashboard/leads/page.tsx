"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus, Search, Filter } from "lucide-react";

const initialLeads = [
  {
    id: "1",
    name: "Alice Johnson",
    company: "TechCorp Solutions",
    email: "alice@techcorp.com",
    status: "New",
    value: "$12,000",
    date: "2024-05-12",
  },
  {
    id: "2",
    name: "Bob Smith",
    company: "Global Logistics",
    email: "bob@global.com",
    status: "Contacted",
    value: "$45,000",
    date: "2024-05-14",
  },
  {
    id: "3",
    name: "Charlie Brown",
    company: "Creative Design Co",
    email: "charlie@design.io",
    status: "Qualified",
    value: "$8,500",
    date: "2024-05-15",
  },
  {
    id: "4",
    name: "Diana Prince",
    company: "Summit Enterprises",
    email: "diana@summit.com",
    status: "Lost",
    value: "$2,000",
    date: "2024-05-10",
  },
  {
    id: "5",
    name: "Edward Norton",
    company: "Fight Fit Gyms",
    email: "edward@fightfit.com",
    status: "New",
    value: "$34,000",
    date: "2024-05-16",
  },
];

const statusMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  New: "default",
  Contacted: "secondary",
  Qualified: "outline",
  Lost: "destructive",
};

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = initialLeads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            Manage and track your incoming prospects and sales inquiries.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>All Leads</CardTitle>
              <CardDescription>
                A list of all leads in your sales funnel.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prospect Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Potential Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{lead.name}</span>
                      <span className="text-xs text-muted-foreground font-normal">
                        {lead.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>{lead.date}</TableCell>
                  <TableCell>{lead.value}</TableCell>
                  <TableCell>
                    <Badge variant={statusMap[lead.status] || "default"}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-rose-500">
                          Delete Lead
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
