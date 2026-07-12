/**
 * Central project registry for the work archive and vertical pages.
 * The home page renders every entry; vertical landing pages filter by
 * `vertical`. Add new builds here and they flow everywhere.
 */

const S3 = "https://dripdome-site.s3.us-east-2.amazonaws.com";

export type VerticalKey =
  | "podcast"
  | "activation"
  | "setDesign"
  | "musicVideo";

export interface Vertical {
  key: VerticalKey;
  label: string;
  /** Landing page. Legacy verticals have none: shown in the archive only. */
  href?: string;
  /** Sunset services: still taken for the right project, not promoted. */
  legacy?: boolean;
}

export const VERTICALS: Record<VerticalKey, Vertical> = {
  podcast: {
    key: "podcast",
    label: "PODCAST STUDIOS",
    href: "/podcast-studios",
  },
  activation: {
    key: "activation",
    label: "BRAND ACTIVATIONS",
    href: "/brand-activations",
  },
  setDesign: { key: "setDesign", label: "SET DESIGN", legacy: true },
  musicVideo: { key: "musicVideo", label: "MUSIC VIDEOS", legacy: true },
};

export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  jobNo: string;
  client: string;
  title: string;
  vertical: VerticalKey;
  scope: string;
  blurb: string;
  images: string[];
  stats: ProjectStat[];
  /** Featured projects get a full job file on the home archive. */
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "notloveline",
    jobNo: "01",
    client: "TRISHA PAYTAS x TANA MONGEAU",
    title: "THE SET OF NOTLOVELINE",
    vertical: "podcast",
    scope: "STUDIO DESIGN · FABRICATION · CUSTOM WIRING",
    blurb: `Designed and fabricated the NotLoveline podcast studio for Trisha Paytas and Tana Mongeau in four days. A vaporwave inspired environment anchored by a hand wired LED neon heart wall with alternating color sequences. The set has since carried 65+ episodes and crossed 20 million YouTube views with 230K+ subscribers.`,
    images: [
      `${S3}/NLL/IMG_1.JPG`,
      `${S3}/NLL/IMG_2.JPG`,
      `${S3}/NLL/IMG_3.JPG`,
      `${S3}/NLL/IMG_4.jpeg`,
      `${S3}/NLL/IMG_5.jpeg`,
    ],
    stats: [
      { value: "20M+", label: "YOUTUBE VIEWS" },
      { value: "230K+", label: "SUBSCRIBERS" },
      { value: "65+", label: "EPISODES SHOT" },
      { value: "4 DAYS", label: "BUILD TIMELINE" },
    ],
    featured: true,
  },
  {
    slug: "google-photos",
    jobNo: "02",
    client: "GOOGLE PHOTOS",
    title: "VIDEO RECAP CAMPAIGN",
    vertical: "activation",
    scope: "PRODUCTION DESIGN · SET DRESSING · PROP SOURCING",
    blurb: `Led production design for Google Photos' video recap campaign featuring K-pop star EJAE. Full scope: set design, prop and furniture sourcing, and complete set dressing across multiple color stories. Every visual element curated to support a clean, lifestyle driven aesthetic aligned with the brand.`,
    images: [
      `${S3}/goog-photos/ejae.png`,
      `${S3}/goog-photos/purple.jpg`,
      `${S3}/goog-photos/red.jpg`,
      `${S3}/goog-photos/laydown.jpg`,
    ],
    stats: [
      { value: "214K+", label: "IG ENGAGEMENTS" },
      { value: "208K+", label: "LIKES" },
      { value: "2.5K+", label: "REPOSTS" },
      { value: "1K+", label: "COMMENTS" },
    ],
    featured: true,
  },
  {
    slug: "lesgc-alice",
    jobNo: "03",
    client: "LOWER EAST SIDE GIRLS CLUB",
    title: "ALICE IN WONDERLAND GALA",
    vertical: "activation",
    scope: "CONCEPT · FABRICATION · TWO-HOUR VENUE INSTALL",
    blurb: `Built a 10 by 8 foot Alice in Wonderland photo moment featuring custom vinyl wrapped playing cards with the organization's initials and a lush garden wall backdrop. Fabricated off site and installed in under two hours despite strict venue constraints. Organizers cited it as the highlight of the evening.`,
    images: [
      `${S3}/lesgc/view.jpg`,
      `${S3}/lesgc/twogirls.jpg`,
      `${S3}/lesgc/frame.jpg`,
      `${S3}/lesgc/render.jpg`,
      `${S3}/lesgc/mattdiana.jpg`,
    ],
    stats: [
      { value: "200+", label: "GUESTS" },
      { value: "100+", label: "UGC STORIES" },
      { value: "< 2 HR", label: "VENUE INSTALL" },
      { value: "10 × 8 FT", label: "CUSTOM BUILD" },
    ],
    featured: true,
  },
  {
    slug: "original-southside",
    jobNo: "04",
    client: "THE ORIGINAL SOUTHSIDE",
    title: "PRODUCT LAUNCH CAMPAIGN",
    vertical: "activation",
    scope: "PROP SOURCING · STYLING · CUSTOM VINYL",
    blurb: `Collaborated with The Original Southside on their launch ad campaign. Scope included prop sourcing, styling, and custom vinyl wraps that reinforced a modern twist on the classic 1920s Southside cocktail. The campaign and product were later named among Forbes' Best Canned Cocktails.`,
    images: [
      `${S3}/southside/ss1.png`,
      `${S3}/southside/ss2.png`,
      `${S3}/southside/ss3.png`,
      `${S3}/southside/ss4.png`,
    ],
    stats: [
      { value: "FORBES", label: "BEST CANNED COCKTAIL" },
      { value: "LAUNCH", label: "CAMPAIGN SCOPE" },
      { value: "CUSTOM", label: "VINYL FABRICATION" },
    ],
  },
  {
    slug: "sunnyd",
    jobNo: "05",
    client: "WHETHAN x EMEI",
    title: "'SUNNYD' MUSIC VIDEO",
    vertical: "musicVideo",
    scope: "WORLD BUILDING · PROPS · BRANDED VINYL",
    blurb: `Transformed a vacant office building into the world of the 'SUNNYD' music video for Whethan and Emei. We worked with the bones of the space, trucking in custom props, branded vinyl, and layered dressing. Empty corridors, lobbies, and offices became distinct performance and narrative beats inside the track's saturated Sunny D palette.`,
    images: [`${S3}/sunnyd/still.jpg`],
    stats: [
      { value: "444K+", label: "YOUTUBE VIEWS" },
      { value: "OFFICIAL", label: "MUSIC VIDEO" },
    ],
  },
];

export const featuredProjects = () => PROJECTS.filter((p) => p.featured);

export const projectsByVertical = (key: VerticalKey) =>
  PROJECTS.filter((p) => p.vertical === key);
