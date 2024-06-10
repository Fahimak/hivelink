import "./globals.css";
import "styles/index.scss";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { fetchHiveDetails } from "api/routes/Hive/hive";
import { org_uuid } from "constants/constants";
import { RawComponents } from "api/models/Hive/hiveComponents";
import { fetchHiveComponents } from "api/routes/Hive/components";
import AppInit from "components/AppInit/AppInit";
import { Suspense } from "react";
import Loading from "./loading";
import AlertPopUp from "components/AlertPopUp";
import { checkMemberView } from "utils/auth";
import SessionId from "components/SessionId/SessionId";

export const metadata = {
  metadataBase: new URL("https://veehive.ai"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  title: "Veehive.ai",
  description: "Videofy your reach.",
  openGraph: {
    images: [
      "https://veehiveprod-images.s3.ap-south-1.amazonaws.com/organizationImages/communityWebLogo/9262600fcc7f4b269043d2377487fc79ThuJan11082339GMT2024",
    ],
  },
  icons: {
    icon: "https://veehiveprod-images.s3.ap-south-1.amazonaws.com/organizationImages/communityWebLogo/9262600fcc7f4b269043d2377487fc79ThuJan11082339GMT2024",
    shortcut:
      "https://veehiveprod-images.s3.ap-south-1.amazonaws.com/organizationImages/communityWebLogo/9262600fcc7f4b269043d2377487fc79ThuJan11082339GMT2024",
    apple:
      "https://veehiveprod-images.s3.ap-south-1.amazonaws.com/organizationImages/communityWebLogo/9262600fcc7f4b269043d2377487fc79ThuJan11082339GMT2024",
  },
};

async function getData() {
  const hiveDetails: HiveDetails = await fetchHiveDetails({
    organizationUuid: org_uuid,
  }); // The return value is *not* serialized
  if (!hiveDetails) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive details");
  }

  const hiveComponents: RawComponents[] = await fetchHiveComponents({
    organizationUuid: org_uuid,
    organizationId: hiveDetails?.communityId || 1,
    isMemberView: checkMemberView(),
  }); // The return value is *not* serialized

  if (!hiveComponents) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch hive components");
  }

  return { hiveDetails, hiveComponents };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: "https://veehive.ai",
    logo: "https://veehiveprod-images.s3.ap-south-1.amazonaws.com/organizationImages/communityWebLogo/9262600fcc7f4b269043d2377487fc79ThuJan11082339GMT2024",
  };

  const { hiveDetails, hiveComponents } = await getData();

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preconnect"
          href="https://veehiveprod-images.s3.ap-south-1.amazonaws.com"
        />
        <link
          rel="preconnect"
          href="https://veehiveprod.uaenorth.cloudapp.azure.com/"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />{" "}
      </head>
      <body>
        <AppInit
          hiveDetails={hiveDetails}
          subdomain={hiveDetails?.communitySubDomain || ""}
          communityId={hiveDetails?.communityId || 0}
        />
        <AlertPopUp />
        <SessionId />
        <div className="main_app_container">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </body>
    </html>
  );
}
