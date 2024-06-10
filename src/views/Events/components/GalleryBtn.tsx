import { EventsItem, GalleryItem } from "api/models/Hive/events";
import { ChildComponent } from "api/models/Hive/hiveComponents";
import Link from "next/link";
import React, { useEffect } from "react";

interface Props {
  gallery: GalleryItem[];
  childComponents: ChildComponent[];
  currentEvent: EventsItem;
}

const GalleryBtn = ({ gallery, childComponents, currentEvent }: Props) => {
  return (
    <>
      {childComponents[0] && gallery[0] && (
        <Link href={`/events/${currentEvent.eventIdentifier}/gallery`}>
          <div className="primaryBtn w-fit">View Gallery</div>
        </Link>
      )}
    </>
  );
};

export default GalleryBtn;
