import DefaultChatrooms from "components/DefaultChatrooms";
import IslandLayout from "components/IslandLayout";

export default async function Page() {
  return (
    <IslandLayout>
      <DefaultChatrooms />
    </IslandLayout>
  );
}
