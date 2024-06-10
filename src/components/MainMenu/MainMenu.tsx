import ChannelItem from "./components/ChannelItem";
import MenuItem from "./components/MenuItem";
import React from "react";
import IslandLayout from "components/IslandLayout";
import { RawComponents } from "api/models/Hive/hiveComponents";
import { ChannelListModel } from "api/models/Hive/hiveChannels";

interface Props {
  hiveComponents: RawComponents[];
  channelList: ChannelListModel[];
}

const MainMenu = ({ hiveComponents, channelList }: Props) => {
  const hasAdminMenu =
    !!hiveComponents &&
    hiveComponents[0] &&
    hiveComponents.some(
      (component) => component.componentType === "admin_menu"
    );

  return (
    <div className="main_menu_container">
      <IslandLayout>
        <div className="user_menu">
          {!!hiveComponents &&
            hiveComponents[0] &&
            hiveComponents.map((menuItem) => {
              if (menuItem.componentType === "user_menu")
                return (
                  <MenuItem key={menuItem.componentCode} menuItem={menuItem} />
                );
            })}
        </div>
      </IslandLayout>
      {hasAdminMenu && (
        <IslandLayout>
          <div className="admin_menu">
            {!!hiveComponents &&
              hiveComponents[0] &&
              hiveComponents.map((adminItem) => {
                if (adminItem.componentType === "admin_menu")
                  return (
                    <MenuItem
                      key={adminItem.componentCode}
                      menuItem={adminItem}
                    />
                  );
              })}
          </div>
        </IslandLayout>
      )}
      {channelList && channelList.length > 0 && (
        <IslandLayout>
          <div className="channels_menu">
            <h2 className="channel_heading">Channels</h2>
            {channelList.map((channelItem) => {
              return (
                <ChannelItem
                  key={channelItem.channelUuid}
                  channelItem={channelItem}
                />
              );
            })}
          </div>
        </IslandLayout>
      )}
      {/* {hiveDetails && hiveDetails.showSuggested && (
        <IslandLayout>
          <PublicHives />
        </IslandLayout>
      )}
      <IslandLayout>
        <Footer />
      </IslandLayout> */}
    </div>
  );
};

export default MainMenu;
