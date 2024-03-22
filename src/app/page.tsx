"use client";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { DEFAULT_CAMPAIGNS } from "@/lib/data";
import { Campaign } from "@/lib/types";
import { useState } from "react";
import _ from "lodash";

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(
    _.cloneDeep(DEFAULT_CAMPAIGNS)
  );
  return <Dashboard campaigns={campaigns} />;
}
