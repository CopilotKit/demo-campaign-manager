"use client";
import { App } from "@/components/app/App";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";

export default function DashboardPage() {
  return (
    <CopilotKit url="/api/copilotkit/">
      <CopilotSidebar
        instructions="Help the user create and manage ad campaigns."
        defaultOpen={true}
        labels={{
          title: "Campaign Manager Copilot",
          initial: "Hi you! 👋 I can help you manage your ad campaigns.",
        }}
        clickOutsideToClose={false}
      >
        <App />
      </CopilotSidebar>
    </CopilotKit>
  );
}
