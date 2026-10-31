import Image from "next/image";
import { NB_BRAND_LOGO } from "@/lib/theme";

type Props = {
  /** Which band the logo sits on. Picks the filter that keeps it legible. */
  on: keyof typeof NB_BRAND_LOGO.filterOn;
  priority?: boolean;
};

const { width, height, artworkTop, artworkBottom } = NB_BRAND_LOGO;
const artworkOffsetPct = (((artworkTop + artworkBottom) / 2 - height / 2) / height) * 100;

/** Fills the parent's height and keeps the asset's aspect ratio, so the
 *  caller sizes it with a responsive `height` on the wrapping Box. */
export default function BrandLogo({ on, priority }: Props) {
  return (
    <Image
      src={NB_BRAND_LOGO.src}
      alt="DripDome Productions"
      width={width}
      height={height}
      priority={priority}
      style={{
        display: "block",
        height: "100%",
        width: "auto",
        transform: `translateY(${-artworkOffsetPct}%)`,
        filter: NB_BRAND_LOGO.filterOn[on],
      }}
    />
  );
}
