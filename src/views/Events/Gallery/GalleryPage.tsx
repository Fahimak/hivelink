"use client";
import IslandLayout from "components/IslandLayout";
import LineBreak from "components/LineBreak";
import React, { useEffect, useState } from "react";
import BackButton from "components/BackButton";
import DeleteStoryWhiteSVG from "assets/svg/delete_story_white.svg";
import RedirectSVG from "assets/svg/redirect.svg";
import { EventsItem, GalleryItem } from "api/models/Hive/events";
import { ChildComponent } from "api/models/Hive/hiveComponents";
import UploadGallery from "../components/UploadGallery";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import Link from "next/link";
import { removeGalleryEvent } from "api/routes/Events/events";
import revalidateTags from "utils/revalidate";
import { useTriggerAlert } from "hooks/useTriggerAlert";
import Image from "next/image";
import Loading from "app/loading";

type Props = {
  child: ChildComponent[];
  galleryItems: GalleryItem[];
  currentEvent: EventsItem;
  hiveDetails: HiveDetails;
};

const EventGalleryPage = ({
  galleryItems,
  child,
  currentEvent,
  hiveDetails,
}: Props) => {
  const { toastError, toastSuccess } = useTriggerAlert();

  const handleDelete = async (item: GalleryItem) => {
    const removed = await removeGalleryEvent({
      eventUuid: item.eventUuid,
      galleryId: item.id,
    });

    if (removed) {
      await revalidateTags("gallery");
      toastSuccess("Removed gallery item");
    } else {
      toastError("Failed to remove gallery item");
    }
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <IslandLayout>
          <div className="p-4">
            <BackButton to={`/events/${currentEvent?.eventIdentifier}`} />
            <LineBreak />
            <h2 className="font-bold text-2xl">Gallery</h2>
            <LineBreak />
            <div className="gallery_items_container">
              {galleryItems.map((data, idx) => {
                return (
                  <div key={idx} className="gallery_item">
                    <img
                      className="gallery_image"
                      key={idx}
                      src={data.thumbnailUrl || data.galleryUrl}
                    />
                    <div className="gallery_action_items">
                      <Link
                        href={data.galleryUrl}
                        target="_blank"
                        className="gallery_action_item"
                      >
                        <Image alt="svg" src={RedirectSVG} />
                      </Link>
                      {child[0] && (
                        <div
                          className="gallery_action_item"
                          onClick={() => handleDelete(data)}
                        >
                          <Image alt="svg" src={DeleteStoryWhiteSVG} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {galleryItems.length < 1 && (
                <h4 className="font-bold">
                  Looks like the media gallery is feeling a bit lonely! Spice it
                  up by uploading more media to bring it to life!
                </h4>
              )}
            </div>
            <LineBreak />
            {child[0] && (
              <>
                <h3 className="font-bold">Add More Media</h3>
                <LineBreak />
                <UploadGallery
                  currentEvent={currentEvent}
                  hiveDetails={hiveDetails}
                />
                <LineBreak />
              </>
            )}
          </div>
        </IslandLayout>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EventGalleryPage;
