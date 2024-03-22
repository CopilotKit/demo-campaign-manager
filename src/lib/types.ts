export interface Campaign {
  id: string;
  title: string;
  finalUrl: string;
  displayUrl: string;
  headline: string;
  description: string;
  status: "active" | "paused";
  budget: number;
}
