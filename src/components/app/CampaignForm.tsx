import React, { useEffect, useState } from "react";
import { Campaign } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
          <TextInput id="title" label="Title" campaign={campaign} />
          <TextInput id="keywords" label="Keywords" campaign={campaign} />
          <TextInput id="finalUrl" label="Final URL" campaign={campaign} />
          <TextInput id="headline" label="Headline" campaign={campaign} />
          <TextInput id="description" label="Description" campaign={campaign} />
          <TextInput id="budget" label="Budget" campaign={campaign} />
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
  campaign: Campaign;
}

function TextInput({ id, label, campaign }: TextInputProps) {
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
    <div className="grid w-full items-center gap-1.5 mt-10">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type="text"
        id={id}
        placeholder={label}
        onChange={handleChange}
        value={inputValue}
      />
    </div>
  );
}
