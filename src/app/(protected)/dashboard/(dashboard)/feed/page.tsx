import { fetchServerFeed } from "api/routes/Feed/feed";
import IslandLayout from "components/IslandLayout";
import { Suspense } from "react";
import { LoadMore } from "views/Feed/loadFeed";

async function getData() {
  const feedVideos = await fetchServerFeed(1);
  if (!feedVideos) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch data");
  }

  return feedVideos;
}

export default async function Home({}: // searchParams,
{
  searchParams: { [key: string]: string | undefined };
}) {
  const feedVideos = await getData();

  return (
    <IslandLayout>
      <Suspense>
        <LoadMore passedFeedVideos={feedVideos} />
      </Suspense>
    </IslandLayout>
  );
}
