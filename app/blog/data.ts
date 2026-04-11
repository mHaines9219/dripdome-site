export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  updatedDate?: string;
  author: {
    name: string;
    role?: string;
  };
  category: string;
  tags: string[];
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  readingTime: string;
  gallery?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "lesgc-alice-in-wonderland-gala-set-design-nyc",
    title:
      "From Render to Reality: Building an Alice in Wonderland Photo Activation at a NYC Charity Gala",
    excerpt:
      "DripDome built an Alice in Wonderland-inspired 10x8 hedge wall set for the Lower East Side Girls Club gala, complete with oversized props, and installed it in just two hours.",
    content: `<p>When the Lower East Side Girls Club needed a set piece for their annual fundraiser, DripDome built an Alice in Wonderland-inspired installation that stole the show and proved that one bold visual moment can anchor an entire event.</p>

<p>DripDome specializes in scenic fabrication for events, and this NYC gala build was a masterclass in working fast and designing smart. The team had just two hours to install a 10-foot by 8-foot hedge wall flat with oversized flowers, hanging frames, and custom-cut vinyl-wrapped playing cards spelling L-E-S-G-C, a direct callback to the Queen's soldiers in Alice in Wonderland. By the time the first of roughly 200 guests walked in, the set wasn't just a backdrop. It was the centerpiece.</p>

<h2>Why Alice in Wonderland at a Nonprofit Gala?</h2>

<p>The venue came loaded with lush greenery, with plants and natural elements already built into the space. Rather than fight that aesthetic, DripDome leaned into it. The creative insight was simple: merge the existing environment with something surreal. Alice in Wonderland was the perfect thread. Whimsical enough to feel magical, grounded enough to work alongside real foliage.</p>

<p>Before anything was built, DripDome created a full 3D render of the installation to iterate on the concept with the client. This let both teams align on scale, prop placement, and how the set would interact with the venue's existing greenery before a single material was sourced.</p>

<figure style="margin: 2rem 0;">
<img src="https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/render.jpg" alt="3D render of DripDome's Alice in Wonderland hedge wall set design for the Lower East Side Girls Club gala" style="width: 100%; border-radius: 12px;" />
<figcaption style="text-align: center; color: rgba(255,255,255,0.5); font-size: 14px; margin-top: 8px;">The 3D render used during pre-production to finalize the concept with the client.</figcaption>
</figure>

<figure style="margin: 2rem 0;">
<img src="https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/view.jpg" alt="The finished Alice in Wonderland hedge wall set at the Lower East Side Girls Club gala, a near 1:1 match of the 3D render" style="width: 100%; border-radius: 12px;" />
<figcaption style="text-align: center; color: rgba(255,255,255,0.5); font-size: 14px; margin-top: 8px;">The finished set on the night of the event. Nearly a 1:1 match from render to reality.</figcaption>
</figure>

<p>The result was a set that felt like it grew out of the room rather than being dropped into it. The hedge wall flat served as the foundation, covered in faux hedging that blended seamlessly with the venue's natural greenery. Oversized flowers and hanging frames pushed the scene into Wonderland territory without losing the elegance a gala demands.</p>

<p>The custom-cut LESGC cards were the detail that tied everything to the organization. Each letter on its own card, styled after the Queen's playing card soldiers, gave the Lower East Side Girls Club a visual identity moment that guests immediately recognized and photographed.</p>

<p>Getting the cards right took more precision than it might look. Each one was cut using a routing template to guarantee they were perfectly identical in size and shape. For mounting, the team used french cleats paired with laser levels to make sure every card sat flush, evenly spaced, and locked in place on the hedge wall. It's the kind of carpentry detail that nobody notices when it's done right, but everyone notices when it's off.</p>

<h2>How DripDome Installed a Full Set in Two Hours</h2>

<p>Two hours. That was the window to go from an empty space to a finished installation. When the timeline is that compressed, every material choice is a production decision.</p>

<p>The key move: using faux hedge material as a surface covering for the flats instead of traditional scenic finishing. Plaster and paint need drying time, and that doesn't exist in a two-hour install. The hedge covering hid every seam between flats instantly, created the lush green surface the Wonderland concept needed, and looked polished from the moment it went up.</p>

<p>The oversized props were pre-built and required no assembly or mounting. The hanging frames were rigged for fast placement. Everything was engineered to go up clean and fast. In event fabrication, the install plan is as important as the design.</p>

<p>Then came the curveball. Same day, DripDome was told the set needed to display QR codes and logos for event sponsors. No advance notice. The team sourced a gold frame on the spot that ended up being the perfect size and aesthetic match. A last-minute addition that looked like it was always part of the plan.</p>

<h2>Why One Bold Set Piece Outperforms Full-Room Decor</h2>

<p>Here's the takeaway for any nonprofit, brand, or event planner considering custom fabrication for a gala: a single centerpiece set pays for itself.</p>

<p>DripDome's LESGC installation became the focal point of the entire evening. Speakers delivered remarks in front of it. Guests lined up to take photos with the interactive props. Conversations across the room circled back to it. One 10x8 set piece generated more engagement, more photos, and more buzz than wall-to-wall decorations ever could.</p>

<p>This tracks with a bigger shift in event design. Even in the nonprofit space, events are being built around shareable visual moments. A well-designed photo opportunity doesn't just look good in the room. It extends the event's reach through every guest's social feed, every tagged post, every story shared the next morning. For organizations like the Lower East Side Girls Club, that visibility translates directly into awareness and support.</p>

<p>If you're planning a fundraiser or charity gala, invest in one statement piece that photographs beautifully, tells your story, and gives guests a reason to share. That's where the ROI lives.</p>

<h2>What's Next</h2>

<p>DripDome's Wonderland work didn't start or end with LESGC. The team also designed sets for pop artist Emei's Into the Rabbit Hole EP, creating the environments for the full series of <a href="http://youtube.com/playlist?list=PLhBeWmAWC98WAZJ2tgc7hTVRT2T50ZL_2" target="_blank" rel="noopener noreferrer" style="color: #FF00AA;">visualizers on YouTube</a>. Another project where the Alice in Wonderland thread drove the creative direction. When a concept keeps finding new contexts, it's not a coincidence. It's a creative language worth building on.</p>`,
    date: "2026-04-11",
    author: {
      name: "DripDome Team",
      role: "Production Design Studio",
    },
    category: "Behind the Scenes",
    tags: [
      "gala set design",
      "scenic fabrication",
      "nonprofit event",
      "Alice in Wonderland",
      "event fabrication NYC",
      "charity gala",
      "photo backdrop",
      "Lower East Side Girls Club",
    ],
    image: {
      url: "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/twogirls.jpg",
      alt: "Guests posing with DripDome's Alice in Wonderland-inspired hedge wall set at the Lower East Side Girls Club gala in NYC",
      width: 1200,
      height: 630,
    },
    readingTime: "5 min read",
    gallery: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/view.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/render.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/frame.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/mattdiana.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/twogirls.jpg",
    ],
  },
  {
    slug: "notloveline-podcast-studio-build-trisha-paytas",
    title: "How DripDome Built the NotLoveLine Podcast Studio in 4 Days",
    excerpt:
      "DripDome built the NotLoveLine podcast studio for Trisha Paytas and Tana Mongeau. A Y2K vaporwave set with a custom neon heart wall, completed in 4 days.",
    content: `<p>DripDome designed and built a custom podcast studio for Trisha Paytas and Tana Mongeau's NotLoveLine show, turning a home space into a vaporwave-inspired set in just four days. A three-person crew handled everything: wallpaper sourcing, neon heart wall fabrication, wire splicing, and laser-precise installation. The show has since crossed 20 million views and 230,000 subscribers across 65 episodes, and the set is a permanent build that performs on camera every single one. Custom podcast studio construction requires scenic design thinking, not just carpentry. Every material, color, and prop has to hold up across hundreds of hours of content and millions of impressions.</p>

<h2>What Did Trisha Paytas and Tana Mongeau Want?</h2>

<p>Trisha and Tana loved the original NotLoveLine show on MTV and wanted to create their own version with a distinct Y2K aesthetic. The brief called for a space that felt nostalgic and bold, mixing retro references with the kind of visual punch that reads on camera and stops a scroll on social media.</p>

<p>The challenge was translating that energy into a permanent studio build inside a home space. This wasn't a one-night set. It had to look sharp on day one and on episode sixty-five.</p>

<h2>How One Wallpaper Sample Drove the Entire Design</h2>

<p>Design direction clicked when DripDome found a vaporwave-style wallpaper that captured the Y2K mood perfectly. That single sample became the anchor. The color palette, the prop selection, the lighting direction all expanded outward from that wallpaper.</p>

<p>This is a common approach in scenic design: find one element that defines the visual language, then let everything else respond to it. It keeps a set cohesive instead of feeling like a collection of unrelated choices. The team iterated many times on concepts, but once the palette was locked through that wallpaper, the rest of the studio design moved fast.</p>

<h2>How DripDome Solved the Neon Heart Wall Wiring Problem</h2>

<p>The signature piece of the NotLoveLine set is a wall of LED neon hearts arranged in a repeating pattern of alternating colors. Building it was the hardest part of the project.</p>

<p>The LED neon hearts DripDome sourced came with bulky battery packs that wouldn't fit through the small holes needed to mount them flush on the wall. Two options emerged: cut larger holes and patch them with plaster afterward, or cut every heart's wires, feed them through small holes, and splice them back together on the other side.</p>

<p>The team chose the harder, cleaner path. Every single heart had its wires cut, threaded through a small hole, and reconnected on the back of the wall. This kept the front surface completely clean with no visible wiring or bulky packs.</p>

<p>Then came alignment. Because the hearts followed a repeating pattern, every single one had to be equidistant and perfectly lined up. A laser level was essential. The team spent significant time ensuring each heart sat precisely in its grid position. One heart off by half an inch would throw the entire pattern out of alignment. The result is a wall that looks effortless, which is usually the sign that serious precision work went into it.</p>

<p>When co-host Tana Mongeau saw the finished studio for the first time, she started screaming and chanting "DRIP DOME." That's the kind of reveal moment you work for.</p>

<h2>Why Brands Should Invest in Custom Podcast Studios</h2>

<p>Here's the business case for spending real money on a podcast studio: the set receives millions of eyes. NotLoveLine pulls nearly a million views per month and has crossed 20 million total. The show holds a 4.8-star rating across almost 3,000 reviews and ranks in the top 15 US relationship podcasts. Every single frame of every episode features DripDome's work. Sponsors want their products placed in beautiful, distinctive studios. A well-designed set isn't a cost. It's a revenue-generating asset.</p>

<p>If you're planning a podcast studio build, the set is the single most visible element of your show. It communicates professionalism, taste, and identity before anyone says a word. Cheap backgrounds and bare walls tell your audience and your sponsors exactly how seriously you take the project.</p>

<h2>Lessons from the Build: Expect the Unknown Unknowns</h2>

<p>The neon heart wall taught DripDome a lesson that applies to every custom fabrication project: expect the unexpected. The battery pack issue was something nobody anticipated during planning. There was no way to know until the hearts arrived and the team realized the hardware wouldn't cooperate with the mounting plan.</p>

<p>This is what the team calls "unknown unknowns." You can plan for tight timelines, tricky materials, and difficult installs. But certain props or installations will create problems you never even considered. The difference between a smooth project and a disaster often comes down to the crew's ability to problem-solve on the spot.</p>

<p>Two practical skills made the difference on this build. First, knowing how to use a laser level, which is non-negotiable for any repeating pattern or grid installation. Second, basic wire splicing. Hiding power supplies and wiring behind surfaces makes any installation look dramatically more professional, and it's a skill every scenic fabricator should have in their toolkit.</p>

<h2>What's Next</h2>

<p>The NotLoveLine studio build sits right in the middle of a bigger cultural moment. The Y2K revival is driving aesthetic choices across fashion, design, and content production. This project proved that a small crew with the right skills can deliver a permanent, broadcast-quality podcast set on an aggressive timeline.</p>

<p>DripDome has done extensive work with Trisha Paytas across multiple photo shoots and projects. If you're building a podcast studio or planning a content space that needs to perform on camera, that's where the team lives.</p>`,
    date: "2025-01-31",
    author: {
      name: "DripDome Team",
      role: "Production Design Studio",
    },
    category: "Behind the Scenes",
    tags: [
      "podcast studio build",
      "custom podcast studio",
      "Y2K set design",
      "neon wall installation",
      "NotLoveLine",
      "Trisha Paytas",
      "Tana Mongeau",
      "scenic fabrication",
      "vaporwave design",
    ],
    image: {
      url: "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_3.JPG",
      alt: "DripDome custom NotLoveLine podcast studio set featuring a neon heart wall and vaporwave Y2K design for Trisha Paytas and Tana Mongeau",
      width: 1200,
      height: 630,
    },
    readingTime: "5 min read",
    gallery: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_1.JPG",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_2.JPG",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_3.JPG",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_4.jpeg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_5.jpeg",
    ],
  },
  {
    slug: "pop-up-activation-design-tips-for-brands",
    title:
      "5 Things Every Brand Should Know Before Building a Pop-Up Activation",
    excerpt:
      "Planning a pop-up activation? Here are the design and fabrication lessons we've learned from building immersive brand experiences in NYC and LA.",
    content: `<p>Pop-up activations are one of the most powerful tools in experiential marketing, but they come with unique challenges that traditional event planning doesn't prepare you for.</p>

<p>From permitting and load-in logistics to material choices that photograph well under mixed lighting, there are details that can make or break an activation. We've distilled our experience into five key considerations every brand team should discuss before breaking ground.</p>

<ol>
<li>Design for the camera first. Your activation will live longer on social media than it will in person.</li>
<li>Material selection matters more than you think. What looks premium in a rendering doesn't always translate.</li>
<li>Build in flexibility. Activations evolve during install, and rigid plans create expensive problems.</li>
<li>Plan your load-in before your design. Access constraints shape what's possible.</li>
<li>Budget for the details. Finishing touches are what separate a set from an experience.</li>
</ol>`,
    date: "2026-04-05",
    author: {
      name: "DripDome Team",
      role: "Production Design Studio",
    },
    category: "Industry Insights",
    tags: [
      "pop-up activation",
      "brand activation",
      "experiential marketing",
      "event design",
    ],
    image: {
      url: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
      alt: "DripDome pop-up activation design and fabrication for brand experiences",
      width: 1200,
      height: 630,
    },
    readingTime: "5 min read",
  },
  {
    slug: "cnc-routing-creative-fabrication-possibilities",
    title: "How CNC Routing Is Changing Creative Fabrication",
    excerpt:
      "CNC routing opens up design possibilities that traditional fabrication can't touch. Here's how we use precision cutting to push creative boundaries.",
    content: `<p>CNC routing has transformed what's possible in set design and custom fabrication. Where hand-cutting once limited complexity and consistency, computer-controlled precision lets us execute intricate patterns, custom typography, and detailed scenic elements at scale.</p>

<p>At DripDome, we use CNC routing across a range of materials including wood, foam, acrylic, and composites to create everything from branded signage to detailed set pieces. The technology lets us iterate quickly, prototype affordably, and deliver production-quality results.</p>

<p>The real power isn't just precision. It's the creative freedom. Designers can push boundaries knowing that the fabrication process can keep up with their vision.</p>`,
    date: "2026-03-28",
    author: {
      name: "DripDome Team",
      role: "Production Design Studio",
    },
    category: "Fabrication",
    tags: [
      "CNC routing",
      "custom fabrication",
      "set design",
      "scenic fabrication",
    ],
    image: {
      url: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
      alt: "CNC routing precision fabrication for custom set design and signage",
      width: 1200,
      height: 630,
    },
    readingTime: "3 min read",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllCategories(): string[] {
  return [...new Set(blogPosts.map((post) => post.category))];
}
