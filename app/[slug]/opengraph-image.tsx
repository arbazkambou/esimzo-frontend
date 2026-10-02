import { ImageResponse } from "next/og";
import { displayNameFromSlug } from "@/lib/display-name";

export const alt = "eSIMzo — Compare travel eSIM plans";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

function destinationLabel(slug: string | undefined): string {
  if (!slug) return "Travel";
  if (slug.toLowerCase() === "global") return "Global";
  return displayNameFromSlug(slug);
}

/** Per-destination social share image (country / region / global). */
export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const name = destinationLabel(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #0B1F3A 0%, #123056 55%, #0B1F3A 100%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          eSIMzo
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 40,
            fontWeight: 600,
            lineHeight: 1.2,
            color: "#FFFFFF",
            maxWidth: 960,
          }}
        >
          {name} eSIM plans
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 28,
            fontWeight: 500,
            lineHeight: 1.3,
            color: "#D7E2F0",
            maxWidth: 900,
          }}
        >
          Compare prices, data, and fair-use rules
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 22,
            fontWeight: 600,
            color: "#F47854",
          }}
        >
          esimzo.com
        </div>
      </div>
    ),
    { ...size },
  );
}
