/**
 * Central project registry for the work archive and vertical pages.
 * The home page renders every entry; vertical landing pages filter by
 * `vertical`. Add new builds here and they flow everywhere.
 */

const S3 = "https://dripdome-site.s3.us-east-2.amazonaws.com";

export type VerticalKey =
  | "podcast"
  | "activation"
  | "interior"
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
  interior: {
    key: "interior",
    label: "INTERIOR + OFFICE DESIGN",
    href: "/interior-office-design",
  },
  setDesign: { key: "setDesign", label: "SET DESIGN", legacy: true },
  musicVideo: { key: "musicVideo", label: "MUSIC VIDEOS", legacy: true },
};

export interface ProjectStat {
  value: string;
  label: string;
}

/**
 * A filmstrip frame. Use a bare URL for the default framing, or an object with
 * a per-image `position` (CSS object-position) to override the project default
 * for a single shot that crops badly.
 */
export type ProjectImage = string | { src: string; position?: string };

/**
 * Pre-build concept render (SketchUp / 3D). Shown in its own panel beside the
 * filmstrip so the design intent sits next to the shipped build.
 */
export interface ProjectRender {
  src: string;
  /** CSS object-position for the render crop. Defaults to "center". */
  position?: string;
}

export interface Project {
  slug: string;
  jobNo: string;
  client: string;
  title: string;
  vertical: VerticalKey;
  scope: string;
  blurb: string;
  images: ProjectImage[];
  /** Optional concept render, displayed alongside the build filmstrip. */
  render?: ProjectRender;
  /**
   * Default CSS object-position for the filmstrip frames (which crop to 4:3
   * with object-fit: cover). Defaults to "center". Use "top" for tall portrait
   * shots so heads are not cropped out. Per-image overrides live on the image.
   */
  imagePosition?: string;
  stats: ProjectStat[];
  /** Featured projects get a full job file on the home archive. */
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "lesgc-alice",
    jobNo: "01",
    client: "LOWER EAST SIDE GIRLS CLUB",
    title: "ALICE IN WONDERLAND GALA - LOWER EAST SIDE GIRLS CLUB",
    vertical: "activation",
    scope: "CONCEPT · FABRICATION · TWO-HOUR VENUE INSTALL",
    blurb: `Built a 10 by 8 foot Alice in Wonderland photo moment featuring custom vinyl wrapped playing cards with the organization's initials and a lush garden wall backdrop. Fabricated off site and installed in under two hours despite strict venue constraints. Organizers cited it as the highlight of the evening.`,
    render: { src: `${S3}/lesgc/render.jpg` },
    images: [
      `${S3}/lesgc/view.jpg`,
      `${S3}/lesgc/twogirls.jpg`,
      `${S3}/lesgc/frame.jpg`,
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
    slug: "seismic-systems-office",
    jobNo: "02",
    client: "SEISMIC SYSTEMS",
    title: "SEISMIC SYSTEMS HQ - FLATIRON NYC",
    vertical: "interior",
    scope: "INTERIOR DESIGN · SPACE PLANNING · SIGNAGE · FF&E · STYLING",
    blurb: `Designed Seismic Systems' headquarters in the Flatiron District, turning a raw loft floor into a working office with a point of view. The entry is anchored by a Seismic wordmark we CNC cut from a single panel, then reused the leftover negative as a second sign elsewhere in the office. A private conference room sits behind black steel and glass, and we handled space planning, furniture and FF&E, and styling across every zone. Warm white oak floors, heavy biophilic planting, and reclaimed wood details keep the industrial shell warm, while a retro lounge with modular seating and a game area gives the team somewhere to decompress. The result photographs like a brand and works like an office.`,
    render: { src: `${S3}/seismic/render.jpg` },
    images: [
      `${S3}/seismic/hero.jpg`,
      `${S3}/seismic/1.jpg`,
      `${S3}/seismic/2.jpg`,
      `${S3}/seismic/3.jpg`,
      `${S3}/seismic/4.jpg`,
      `${S3}/seismic/5.jpg`,
      `${S3}/seismic/6.jpg`,
      `${S3}/seismic/7.jpg`,
      `${S3}/seismic/8.jpg`,
      `${S3}/seismic/9.jpg`,
      `${S3}/seismic/10.jpg`,
      `${S3}/seismic/11.jpg`,
    ],
    stats: [
      { value: "FLATIRON", label: "NYC HEADQUARTERS" },
      { value: "FULL FLOOR", label: "LOFT FIT-OUT" },
      { value: "1 PANEL", label: "2 CNC-CUT SIGNS" },
      { value: "TURNKEY", label: "DESIGN TO STYLING" },
    ],
    featured: true,
  },
  {
    slug: "this-is-not-a-billboard",
    jobNo: "03",
    client: "VITA KARI",
    title: "THIS IS NOT A BILLBOARD - VITA KARI",
    vertical: "activation",
    scope: "PUBLIC ART · LIGHT BOX FABRICATION · ROOFTOP INSTALL",
    blurb: `Fabricated and installed THIS IS NOT A BILLBOARD, a large scale public art installation by artist Vita Kari, mounted on the roof of Endless Romance at 8722 Santa Monica Blvd, directly on the WeHo Pride parade route on June 7, 2026. We built the 16 foot monochrome light box to read as a half rendered digital billboard from the street: a black and white shell with no branding, a foil lined interior, and a wall of light on one side that turned the performers inside into moving silhouettes. Up close it revealed live bodies repeating looping gestures for hours, a nod to Magritte's "This is not a pipe" that turned an advertising format into a living performance. The project was funded through Instagram's Drafts Fund, featured by Instagram Creators, and covered by WeHo Times and Wonderland, which credited DripDome among the collaborators.`,
    render: { src: `${S3}/vita_tinab/render.jpg` },
    images: [
      `${S3}/vita_tinab/1.png`,
      `${S3}/vita_tinab/2.png`,
      `${S3}/vita_tinab/3.png`,
      `${S3}/vita_tinab/4.png`,
    ],
    stats: [
      { value: "8.8M+", label: "SOCIAL VIEWS" },
      { value: "16 FT", label: "LIGHT BOX BUILD" },
      { value: "100K+", label: "WEHO PRIDE ATTENDEES" },
      { value: "IG DRAFTS FUND", label: "PROJECT BACKING" },
    ],
    featured: true,
  },
  {
    slug: "google-photos",
    jobNo: "04",
    client: "GOOGLE PHOTOS",
    title: "YEARLY RECAP WITH EJAE - GOOGLE PHOTOS",
    vertical: "activation",
    scope: "PRODUCTION DESIGN · SET DRESSING · PROP SOURCING",
    blurb: `Led production design for Google Photos' video recap campaign featuring K-pop star EJAE. Full scope: set design, prop and furniture sourcing, and complete set dressing across multiple color stories. Every visual element curated to support a clean, lifestyle driven aesthetic aligned with the brand.`,
    images: [
      // EJAE is centered in frame with headroom, so "top" leaves her sitting
      // low. Nudge the crop down to ~17% to center her; the rest stay "top".
      { src: `${S3}/goog-photos/ejae.png`, position: "50% 17%" },
      `${S3}/goog-photos/purple.jpg`,
      `${S3}/goog-photos/red.jpg`,
      `${S3}/goog-photos/laydown.jpg`,
    ],
    imagePosition: "top",
    stats: [
      { value: "214K+", label: "IG ENGAGEMENTS" },
      { value: "208K+", label: "LIKES" },
      { value: "2.5K+", label: "REPOSTS" },
      { value: "1K+", label: "COMMENTS" },
    ],
    featured: true,
  },
  {
    slug: "notloveline",
    jobNo: "05",
    client: "TRISHA PAYTAS x TANA MONGEAU",
    title: "THE SET OF NOT LOVELINE - TRISHA PAYTAS AND TANA MONGEAU",
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
    slug: "original-southside",
    jobNo: "06",
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
    jobNo: "07",
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
  {
    slug: "fraim-freestyle",
    jobNo: "08",
    client: "FRAIM",
    title: "FRAIM FREESTYLE SET - TWO GIANT RED SPEAKERS",
    vertical: "podcast",
    scope: "SET DESIGN · CARPENTRY · SCENIC PAINT · STUDIO SET BUILD",
    blurb: `Designed and fabricated two giant red speakers as the signature set piece for FRAIM Freestyle, the Brooklyn shot freestyle rap series from FRAIM, an NYC media brand covering hip-hop and art. Each cabinet is an oversized hip-hop speaker stack: a boxed wood shell with two black woofers set into the face and a faceted red horn crate on top, finished in a flat saturated red so it reads as one graphic block on camera. Built in our NYC shop and delivered as a two piece backdrop that frames every artist at the desk, the set has carried the whole first season, including Lord Sko, LIFEOFTHOM, ANKHLEJOHN, Andre Lawrence, Radamiz, and Nelovesbias. Across Instagram, YouTube, and TikTok, season one has pulled more than 325K views, 12K likes, and 1K comments with the speakers in frame.`,
    render: { src: `${S3}/fraim/render.jpg` },
    images: [
      // Shop photos are portrait; frame the crop on the speakers, not the ceiling.
      { src: `${S3}/fraim/1.jpg`, position: "50% 62%" },
      { src: `${S3}/fraim/2.jpg`, position: "50% 62%" },
      `${S3}/fraim/3.jpg`,
      `${S3}/fraim/4.jpg`,
      `${S3}/fraim/5.jpg`,
    ],
    // Season one tally, scanned Sep 12 2026 across FRAIM's Instagram (15 reels,
    // 6 carousels), YouTube (6 episodes, 3 shorts) and TikTok (15 clips).
    stats: [
      { value: "325K+", label: "VIEWS · IG / YT / TIKTOK" },
      { value: "12K+", label: "LIKES" },
      { value: "1K+", label: "COMMENTS" },
      { value: "6", label: "EPISODES · SEASON 1" },
    ],
    featured: true,
  },
  {
    slug: "crisscut-new-york",
    jobNo: "09",
    client: "CRISSCUT NEW YORK",
    title: "'BUY YOURSELF THE DIAMONDS' CAMPAIGN - CRISSCUT NEW YORK",
    vertical: "activation",
    scope: "SET DESIGN · SET DRESSING · PROP SOURCING",
    blurb: `Set design for Crisscut New York's "Buy yourself the diamonds. You earned them." campaign film, a self purchase spot for the Manhattan diamond house behind the patented Crisscut. We designed and dressed the world of a corner office with the Empire State Building in the window: a heavy executive desk under a green banker's lamp, a cream rotary phone, a period beige computer and keyboard, an abstract canvas on the wall, and a desktop layered with ring sketches and technical drawings so the jewelry sits inside a story about a woman who runs the room. Every prop was sourced and placed to hold up in extreme close up, from the Crisscut New York nameplate to the drawings under the rings, while the palette stays warm and restrained so the stones are the brightest thing in frame.`,
    images: [
      `${S3}/crisscut/1.jpg`,
      `${S3}/crisscut/2.jpg`,
      `${S3}/crisscut/3.jpg`,
      `${S3}/crisscut/4.jpg`,
      `${S3}/crisscut/5.jpg`,
      `${S3}/crisscut/6.jpg`,
      `${S3}/crisscut/7.jpg`,
    ],
    stats: [
      { value: "FULL SET", label: "DESIGN + DRESSING" },
      { value: "SINCE 1981", label: "NYC DIAMOND HOUSE" },
      { value: "PERIOD", label: "PROP SOURCING" },
      { value: "MAY 2026", label: "CAMPAIGN LAUNCH" },
    ],
    featured: true,
  },
];

export const featuredProjects = () => PROJECTS.filter((p) => p.featured);

export const projectsByVertical = (key: VerticalKey) =>
  PROJECTS.filter((p) => p.vertical === key);
