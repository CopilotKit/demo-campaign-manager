"use client";
import { DEFAULT_CAMPAIGNS } from "@/lib/data";
import { Campaign } from "@/lib/types";
import { use, useState } from "react";
import {
  useCopilotAction,
  useMakeCopilotReadable,
} from "@copilotkit/react-core";

import _ from "lodash";
import { Dashboard } from "../dashboard/Dashboard";
import { CampaignForm } from "./CampaignForm";
import { randomId } from "@/lib/utils";

export function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(
    _.cloneDeep(DEFAULT_CAMPAIGNS)
  );

  function updateCampaign(campaign: Campaign) {
    if (campaign.id === "") {
      campaign.id = randomId();
      setCampaigns([campaign, ...campaigns]);
    } else {
      const index = campaigns.findIndex((c) => c.id === campaign.id);
      if (index === -1) {
        setCampaigns([...campaigns, campaign]);
      } else {
        campaigns[index] = campaign;
        setCampaigns([...campaigns]);
      }
    }
  }

  const [editingCampaign, setEditingCampaign] = useState<Campaign | undefined>(
    undefined
  );

  useMakeCopilotReadable(
    "These are the active campaigns:" + JSON.stringify(campaigns)
  );

  useMakeCopilotReadable(
    editingCampaign
      ? `Currently editing campaign id ${editingCampaign.id}`
      : "Not editing a campaign"
  );

  useMakeCopilotReadable("Today's date is " + new Date().toDateString());

  useCopilotAction({
    name: "UpdateCampaign",
    description:
      "Edit an existing campaign or create a new one. To update only a part of a campaign, provide the id of the campaign to edit and the new values only.",
    parameters: [
      {
        name: "id",
        description:
          "The id of the campaign to edit. If empty, a new campaign will be created",
        type: "string",
      },
      {
        name: "title",
        description: "The title of the campaign",
        type: "string",
        required: false,
      },
      {
        name: "keywords",
        description: "Search keywords for the campaign",
        type: "string",
        required: false,
      },
      {
        name: "url",
        description:
          "The URL to link the ad to. Most of the time, the user will provide this value, leave it empty unless asked by the user.",
        type: "string",
        required: false,
      },
      {
        name: "headline",
        description:
          "The headline displayed in the ad. This should be a 5-10 words",
        type: "string",
        required: false,
      },
      {
        name: "description",
        description:
          "The description displayed in the ad. This should be a short text",
        type: "string",
        required: false,
      },

      {
        name: "budget",
        description: "The budget of the campaign",
        type: "number",
        required: false,
      },
    ],
    handler: (campaign) => {
      setEditingCampaign(campaign as Campaign);
    },
    render: (props) => {
      if (props.status === "complete") {
        return "Campaign updated successfully";
      } else {
        return "Updating campaign";
      }
    },
  });

  return (
    <div className="relative">
      <CampaignForm
        campaign={_.cloneDeep(editingCampaign)}
        updateCampaign={(campaign) => {
          if (campaign) {
            updateCampaign(campaign);
          }
          setEditingCampaign(undefined);
        }}
      />
      <Dashboard
        campaigns={campaigns}
        setEditingCampaign={setEditingCampaign}
      />
    </div>
  );
}
