import { fetchCampaignsList } from "api/routes/Campaigns/campaigns";
import IslandLayout from "components/IslandLayout";
import CampaignContainer from "views/Campaigns";

async function getData() {
  const campaigns = await fetchCampaignsList(); // The return value is *not* serialized

  if (!campaigns) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch campaigns list");
  }

  return campaigns;
}

export default async function Page() {
  const campaignsList = await getData();

  return (
    <div className="">
      <IslandLayout>
        <CampaignContainer campaignList={campaignsList} />
      </IslandLayout>
    </div>
  );
}
