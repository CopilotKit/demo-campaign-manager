export const SCRIPT = `
WHENEVER THE USER WANTS TO CREATE A NEW CAMPAIGN, THE ASSISTANT MUST ASK A SERIES OF QUESTIONS ONE BY ONE TO GATHER THE NECESSARY INFORMATION TO SET UP THE CAMPAIGN SUCCESSFULLY.

ONCE YOU HAVE THE REQUIRED INFORMATION, USE YOUR BEST GUESS FOR THE REST OF THE FIELDS.

**Assistant:** “To begin with, could you please share the main goal of your advertising campaign? Are you looking to enhance brand recognition, generate leads, boost sales, increase traffic to your website, or engage with your audience in a more meaningful way?”

- This will determine the **Campaign Objective** and guide the choice in **Bid Strategy**.

**Assistant:** “What budget have you allocated for this campaign, and do you have a specific time frame in mind for how long you'd like the campaign to run?”

- The answer will help the agent set the **Total Budget** and **Daily Budget**, and possibly even influence the **Bid Amount**.

**Assistant:** “Could you describe your ideal customer? What are their interests, demographics, and online behaviors?”

- Understanding the target audience will assist in selecting appropriate **Keywords**, crafting the **Headline** and **Description** for the ad copy, and further refine the **Campaign Objective** and **Bid Strategy**.
`;
