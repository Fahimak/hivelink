"use client";
import { HiveActivitiesItem } from "api/models/Hive/hiveActivities";
import { defaultAvatar } from "constants/constants";
import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";

interface Props {
  activities: HiveActivitiesItem;
}

const HiveActivities = ({ activities }: Props) => {
  const [contentLimit, setContentLimit] = useState(6);

  const [showMoreClicked, setShowMoreClicked] = useState(false);

  const [clientActivities, setClientActivities] = useState(
    !!activities && activities.content[0] && activities.content.slice(0, 6)
  );

  const handleShowMore = () => {
    showMoreClicked
      ? setClientActivities(activities.content.slice(0, 6))
      : setClientActivities(activities.content.slice(0, 30));
    setShowMoreClicked((prevState) => !prevState);
  };

  return (
    <div>
      <div className="activities_container">
        <h4 className="font-bold">Activities</h4>
        {!!clientActivities[0] &&
          clientActivities.map((activity, idx) => {
            return (
              <div
                //   onClick={() => handleUserClick(activity)}
                className="activity_wrapper"
                key={idx}
              >
                <img
                  src={activity.profile_photo || defaultAvatar}
                  alt=""
                  className="activity_profile_photo"
                />

                <div>
                  <p className="text-sm">{activity.activity}</p>
                  <div className="bold_xs_text">
                    {activity.created_date && (
                      <h1 className="bold_xs_text">
                        {activity.created_date &&
                          formatDistanceToNow(new Date(activity.created_date), {
                            addSuffix: true,
                          })}
                      </h1>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="show_more_btn" onClick={handleShowMore}>
        <div className="secondaryBtn">
          Show {showMoreClicked ? "Less" : "More"}
        </div>
      </div>
    </div>
  );
};

export default HiveActivities;
