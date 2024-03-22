import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Campaign } from "@/lib/types";

interface ActiveCampaignsProps {
  campaigns: Campaign[];
}

export function ActiveCampaigns({ campaigns }: ActiveCampaignsProps) {
  return (
    <div className="space-y-8">
      {campaigns.map((campaign) => (
        <ActiveCampaign key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}

function ActiveCampaign({ campaign }: { campaign: Campaign }) {
  const titleInitials = campaign.title
    .split(" ")
    .map((word) => (word.length > 0 ? word[0] : ""))
    .slice(0, 2)
    .join("");
  const budget = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    // Ensuring that the output is formatted as a positive number
  }).format(Math.abs(campaign.budget));

  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarFallback>{titleInitials}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p
          className="text-sm font-medium leading-none truncate"
          style={{ maxWidth: "250px" }}
        >
          {campaign.title}
        </p>
        <p
          className="text-sm text-muted-foreground truncate"
          style={{ maxWidth: "250px" }}
        >
          {campaign.headline}
        </p>
      </div>
      <div className="ml-auto font-medium">{budget}</div>
    </div>
  );
}
