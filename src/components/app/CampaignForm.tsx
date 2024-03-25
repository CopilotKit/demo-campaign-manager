import React, { useEffect, useState } from "react";
import { Campaign } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface CampaignFormProps {
  campaign?: Campaign;
  updateCampaign: (campaign?: Campaign) => void;
}

export function CampaignForm({ campaign, updateCampaign }: CampaignFormProps) {
  if (!campaign) return null;
  return (
    <div
      className="bg-white/70 absolute inset-0 z-10"
      style={{
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
    >
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-2xl w-full mx-auto my-16 space-y-4 border">
        <h2 className="text-xl font-semibold text-gray-900 border-b pb-3">
          {campaign.id == "" ? "New" : "Edit"} Campaign
        </h2>
        <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
          <div className="p-4 border border-gray-200 rounded-sm mr-1">
            <h3 className="text-lg font-semibold mb-4">Campaign Information</h3>
            <div className="flex">
              <TextInput
                id="title"
                label="Campaign Name"
                campaign={campaign}
                className="w-1/2"
              />
              <Dropdown
                id="objective"
                label="Campaign Objective"
                campaign={campaign}
                className="w-1/2"
                items={{
                  "brand-awareness": "Brand Awareness",
                  "lead-generation": "Lead Generation",
                  "sales-conversion": "Sales Conversion",
                  "website-traffic": "Website Traffic",
                  engagement: "Engagement",
                }}
              />
            </div>
            <div className="flex">
              <DatePicker
                id="startDate"
                label="Start Date"
                className="w-1/2"
                campaign={campaign}
              />
              <DatePicker
                id="endDate"
                label="End Date"
                className="w-1/2"
                campaign={campaign}
              />
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-sm mt-3 mr-1">
            <h3 className="text-lg font-semibold mb-4">Budget & Bidding</h3>
            <div className="flex">
              <TextInput
                id="budget"
                label="Total Budget"
                className="w-1/2"
                campaign={campaign}
              />
              <TextInput
                id="dailyBudget"
                label="Daily Budget"
                className="w-1/2"
                campaign={campaign}
              />
            </div>
            <div className="flex">
              <Dropdown
                id="bidStrategy"
                label="Bid Strategy"
                className="w-1/2"
                campaign={campaign}
                items={{
                  "manual-cpc": "Manual CPC",
                  cpa: "CPA",
                  cpm: "CPM",
                }}
              />
              <TextInput
                id="bidAmount"
                label="Bid Amount"
                className="w-1/2"
                campaign={campaign}
              />
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-sm mt-3 mr-1">
            <h3 className="text-lg font-semibold mb-4">Ad Copy</h3>
            <div className="flex">
              <TextInput
                className="w-1/2"
                id="keywords"
                label="Keywords"
                campaign={campaign}
              />
              <TextInput
                className="w-1/2"
                id="finalUrl"
                label="Final URL"
                campaign={campaign}
              />
            </div>
            <div className="flex">
              <TextInput
                className="w-1/2"
                id="headline"
                label="Headline"
                campaign={campaign}
              />
              <TextInput
                className="w-1/2"
                id="description"
                label="Description"
                campaign={campaign}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            variant="secondary"
            className="mr-5"
            onClick={() => updateCampaign(undefined)}
          >
            Cancel
          </Button>
          <Button onClick={() => updateCampaign(campaign)}>Save</Button>
        </div>
      </div>
    </div>
  );
}

interface TextInputProps {
  id: string;
  label: string;
  className?: string;
  campaign: Campaign;
}

function TextInput({ id, label, className, campaign }: TextInputProps) {
  const [inputValue, setInputValue] = useState((campaign as any)[id] || "");

  useEffect(() => {
    setInputValue((campaign as any)[id] || "");
  }, [campaign, id]);

  const handleChange = (e: any) => {
    const newValue =
      id === "budget" ? parseInt(e.target.value, 10) : e.target.value;
    setInputValue(newValue);

    (campaign as any)[id] = newValue;
  };

  return (
    <div className={clsx("grid w-full items-center gap-1.5 p-2", className)}>
      <Label className="text-xs " htmlFor={id}>
        {label}
      </Label>
      <Input
        type="text"
        className="text-xs px-2 ring-0 outline-0 focus-visible:ring-0"
        id={id}
        placeholder={label}
        onChange={handleChange}
        value={inputValue}
      />
    </div>
  );
}

interface DropdownProps {
  id: string;
  label: string;
  className?: string;
  campaign: Campaign;
  items: { [key: string]: string };
}

function Dropdown({ id, label, className, campaign, items }: DropdownProps) {
  const [inputValue, setInputValue] = useState((campaign as any)[id] || "");

  useEffect(() => {
    setInputValue((campaign as any)[id] || "");
  }, [campaign, id]);

  const handleChange = (newValue: string) => {
    setInputValue(newValue);

    (campaign as any)[id] = newValue;
  };

  return (
    <div className={clsx("grid w-full items-center gap-1.5 p-2", className)}>
      <Label className="text-xs" htmlFor={id}>
        {label}
      </Label>
      <Select onValueChange={handleChange} value={inputValue}>
        <SelectTrigger className="w-full text-xs focus:ring-0">
          <SelectValue className="text-xs" placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(items).map(([key, value]) => (
            <SelectItem key={key} value={key} className="text-xs">
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface DaterPickerProps {
  id: string;
  label: string;
  className?: string;
  campaign: Campaign;
}

function DatePicker({ id, label, className, campaign }: DaterPickerProps) {
  const [inputValue, setInputValue] = useState(
    (campaign as any)[id] || undefined
  );

  useEffect(() => {
    setInputValue((campaign as any)[id] || undefined);
  }, [campaign, id]);

  const handleChange = (newValue?: Date) => {
    setInputValue(newValue);

    (campaign as any)[id] = newValue;
  };

  return (
    <div className={clsx("grid w-full items-center gap-1.5 p-2", className)}>
      <Label className="text-xs" htmlFor={id}>
        {label}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={clsx(
              "justify-start text-left font-normal text-xs",
              !inputValue && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {inputValue ? format(inputValue, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={inputValue}
            onSelect={handleChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
