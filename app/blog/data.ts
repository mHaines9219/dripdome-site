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
    slug: "how-to-start-set-design-essential-tools-under-500",
    title: "How to Start in Set Design: The Essential Tool Kit Under $500",
    excerpt:
      "DripDome shares the essential tools every beginner set designer needs to get started for under $500, from jigsaws to 3D rendering software like SketchUp.",
    content: `<p>DripDome has built sets for Google, Paris Hilton, Sunny D, and dozens of other clients across NYC and LA. Here's what we've learned: you don't need a warehouse full of equipment to start in set design. You need a handful of reliable tools, one free piece of software, and the willingness to build. The entire starter kit in this guide costs $484.16, and every tool on this list is something our team still uses on professional sets today.</p>

<p>If you're curious about set design but have no clue where to start, this is the guide. Not theory. Not a film school syllabus. This is what we'd hand someone on their first day.</p>

<h2>Why Every Tool on This List Is from Harbor Freight</h2>

<p>This is not a sponsored post, and we're not claiming Harbor Freight is the best vendor in every situation. This list is built strictly on price. When you're starting out, the goal is to get working with real tools as fast as possible without overthinking brand loyalty. Harbor Freight's BAUER line has proven itself to be reliable enough for beginners, and you can always upgrade individual tools as your career demands it. The point is to start.</p>

<h2>Power Tools ($249.96)</h2>

<p><strong><a href="https://www.harborfreight.com/20v-2-tool-drill-impact-driver-kit-73238.html" target="_blank" rel="noopener noreferrer">BAUER 20V 2-Tool Drill & Impact Driver Kit</a> — $99.99</strong></p>

<p>This kit comes with both a drill and an impact driver, but here's a pro tip: on set, you'll mostly reach for the drill. Impact drivers are great for high-torque applications, but they're very loud. When you're setting up while talent is on set, the last thing you want is a tool disrupting the environment. The drill gives you more precision since you can adjust the speed, which is particularly useful when assembling things like furniture on set. An impact driver's force will likely strip a cheap furniture screw or crack the material entirely. The kit includes 2Ah batteries, which are enough for the drill.</p>

<p><strong><a href="https://www.harborfreight.com/20v-cordless-18-gauge-narrow-crown-stapler-tool-only-59098.html" target="_blank" rel="noopener noreferrer">BAUER 20V Cordless 18-Gauge Narrow Crown Stapler (Tool Only)</a> — $99.99</strong></p>

<p>Before cordless narrow crown staplers existed, set designers had to lug around bulky, loud air compressors. Hoses running across a set floor are a safety hazard. The noise makes communication difficult during time-sensitive installs. The cordless narrow crown stapler eliminated all of that. It's quieter, safer with no hoses on the ground, and fast enough to keep pace with any install timeline. This tool is typically used for building flats and works well for framing applications on smaller props like plinths. Note: this is sold as "tool only" and requires a 5Ah battery (listed below) since the 2Ah batteries from the drill kit don't provide enough power.</p>

<p>A related lesson: stop using your drill for everything. Screws are harder to sink than people think, and they do significantly more damage to surfaces than narrow crown staples. When you're working with finished materials or surfaces that need to stay clean, the stapler is the right call. Save the drill for structural connections and pilot holes.</p>

<p><strong><a href="https://www.harborfreight.com/65-amp-orbital-variable-speed-jig-saw-with-laser-64290.html" target="_blank" rel="noopener noreferrer">6.5 Amp Orbital Variable-Speed Jig Saw with Laser</a> — $29.99</strong></p>

<p>If money is tight and you can only buy one cutting tool, make it a jigsaw. This is the tool people sleep on the most, and it's the one DripDome recommends to every beginner for one simple reason: it's the safest power cutting tool you can use. The blade is flexible. If it gets strained too hard, it breaks off. Compare that to a circular saw, which can kick back out of control if it binds. For someone still building confidence with power tools, that safety margin matters.</p>

<p>A jigsaw handles curves that no other saw can, and paired with a speed square or straight-edge track, it cuts reasonably straight lines too. It cuts wood, plastic, metal, and foam depending on the blade. One important note: make sure you're buying blades matched to the material you're cutting. Wood blades for wood, metal blades for metal. The wrong blade won't just cut poorly, it can be dangerous.</p>

<p><strong><a href="https://www.harborfreight.com/28-amp-5-in-random-orbit-palm-sander-63999.html" target="_blank" rel="noopener noreferrer">BAUER 2.8 Amp 5 in. Random Orbit Palm Sander</a> — $19.99</strong></p>

<p>Sanding is a necessity on set design jobs. You'll use it to smooth out cut edges for safety, sand down plaster or wood filler before painting, or distress a surface to achieve a specific look. It's one of those tools that doesn't feel essential until you need it, and then you need it constantly.</p>

<h2>Hand Tools ($7.26)</h2>

<p><strong><a href="https://www.harborfreight.com/25-ft-x-1-in-quikfind-tape-measure-with-abs-casing-69030.html" target="_blank" rel="noopener noreferrer">25 ft. QuikFind Tape Measure</a> — $1.78</strong></p>

<p>You will measure something on every single job. A thicker blade width is generally more durable and easier to work with, though it's not strictly necessary when you're starting out. The important thing is to always have one on you.</p>

<p><strong><a href="https://www.harborfreight.com/utility-knife-3359.html" target="_blank" rel="noopener noreferrer">GORDON Utility Knife</a> — $2.49</strong></p>

<p>A utility knife does more than you'd expect. Score lines, trim material, cut foam board, scrape glass clean. It can also help you get a very clean masking layer for paint by scoring along the tape edge before peeling. One of the most versatile tools in your kit for under three dollars.</p>

<p><strong><a href="https://www.harborfreight.com/2-in-putty-knife-57185.html" target="_blank" rel="noopener noreferrer">QUINN 2 in. Putty Knife</a> — $2.99</strong></p>

<p>This one surprises people on a set design tool list. As a set designer, you're constantly covering seams, nail holes, staple holes, and screw holes. You need a putty knife to spread wood filler or spackle, then the palm sander to smooth it down for painting. The putty knife, sander, and paint kit work together as a finishing pipeline you'll use on nearly every build.</p>

<h2>Supplies ($18.97)</h2>

<p><strong><a href="https://www.harborfreight.com/paint-kit-9-piece-59782.html" target="_blank" rel="noopener noreferrer">Paint Kit, 9-Piece</a> — $12.99</strong></p>

<p>Painting comes up more often in fabrication, but set design regularly requires it too. Painting a wall flat, touching up a prop, color-matching a surface to the creative direction. Having a basic paint kit ready means you're not scrambling to source rollers and trays on the day of a build.</p>

<p><strong><a href="https://www.harborfreight.com/60-yd-x-188-in-general-purpose-masking-tape-63245.html" target="_blank" rel="noopener noreferrer">General-Purpose Masking Tape</a> — $3.99</strong></p>

<p>Obviously essential for masking off paint lines, but masking tape also works for labeling pieces, marking positions on set, and holding things temporarily during assembly. It's a consumable you'll burn through, so keep extra rolls in your kit.</p>

<p><strong><a href="https://www.harborfreight.com/clog-resistant-jobsite-permanent-markers-2-pack-70060.html" target="_blank" rel="noopener noreferrer">Clog-Resistant Jobsite Permanent Markers, 2-Pack</a> — $1.99</strong></p>

<p>You need a writing tool on set. Marking cut lines on lumber, labeling pieces for assembly, noting measurements on materials. A clog-resistant marker designed for job sites will outlast a regular Sharpie and write on more surfaces.</p>

<h2>Organization ($139.98)</h2>

<p><strong><a href="https://www.harborfreight.com/modular-rolling-toolbox-with-8-in-wheels-and-removable-handle-71046.html" target="_blank" rel="noopener noreferrer">BAUER Modular Rolling Toolbox with 8 in. Wheels</a> — $69.99</strong></p>
<p><strong><a href="https://www.harborfreight.com/modular-2-drawer-toolbox-71125.html" target="_blank" rel="noopener noreferrer">BAUER Modular 2-Drawer Toolbox</a> — $69.99</strong></p>

<p>These two pieces stack together as a modular system. Being organized on set makes you faster and more effective, but it also sends a signal to clients. When you show up with a modular, professional storage system, it communicates that you're reliable, prepared, and take the work seriously. Showing up with tools in duffel bags communicates the opposite. First impressions on a job site matter, especially when the client is watching the install happen in real time.</p>

<h2>Battery ($67.99)</h2>

<p><strong><a href="https://www.harborfreight.com/20v-5-ah-high-capacity-lithium-ion-battery-57007.html" target="_blank" rel="noopener noreferrer">BAUER 20V 5 Ah High-Capacity Lithium-Ion Battery</a> — $67.99</strong></p>

<p>The drill kit comes with its own 2Ah batteries, but the cordless narrow crown stapler requires more power and needs a 5Ah battery to run properly. This is the one additional battery purchase you'll need to complete the kit.</p>

<h2>The Complete Kit: $484.16</h2>

<p>Thirteen items. Four power tools, three hand tools, three supplies, a modular storage system, and a battery. Everything you need to show up to a set design job prepared, professional, and capable of handling real work. That leaves room in a $500 budget for extra jigsaw blades or a pack of sandpaper.</p>

<h2>Why 3D Rendering Software Separates Amateurs from Professionals</h2>

<p>Every DripDome project gets 3D rendered before a single material is sourced. It is simply impossible to know how a set will look and feel without seeing a comprehensive visual first. You cannot show a client a napkin sketch and expect to land $50,000 jobs.</p>

<p>Learning SketchUp directly impacted our business in a measurable way. Clients respond to renders. It lets you iterate on concepts without wasting materials. It catches scale problems before they become expensive mistakes on set. Our team prefers SketchUp for its speed and simplicity, though Blender is a powerful free alternative if you want more rendering capabilities.</p>

<p>Tech has been DripDome's competitive edge. Many clients who reach out to us do so specifically because they know we can deliver photorealistic renders during the consultation phase. At the higher levels of set design, a 3D render before you even collect a deposit is simply expected. We include it as a free service during consultation, and it consistently closes deals.</p>

<p>For vinyl work, we also use a Cricut cutter. It's not the most "professional" tool on paper, but any project that requires a vinyl decal under 16 inches wide can probably be handled by one. We <a href="/blog/lesgc-alice-in-wonderland-gala-set-design-nyc">cut the vinyl decals for our LESGC charity event cards with a Cricut</a>, and they looked exactly as intended.</p>

<h2>The Beginner-to-Pro Upgrade Path</h2>

<p>Once you've built confidence with the starter kit and started taking on real projects, the first serious upgrade is a portable table saw. Being able to cut totally straight lines through sheet goods is crucially important in set design and fabrication. A jigsaw with a guide gets you close, but a table saw gets you there every time.</p>

<p>Beyond that, the real secret is this: there are tools out there designed to solve the exact problem you're dealing with, but you don't know they exist yet. So you end up doing multi-step, hacky workarounds when the right tool could have saved you hours. That's normal. Every professional went through it. The fix is simple: stay curious, watch how other builders work, and when you find yourself fighting a process, search for whether a tool exists to make it easier. It almost always does.</p>

<h2>Where to Start Today</h2>

<p>Set design is one of those fields where the barrier to entry is lower than it looks. The tools are accessible. The software is free. The skills build on each other. What separates the people who break in from the people who just think about it is building something.</p>

<p>Pick up a jigsaw. Download SketchUp. Build a small set piece for a friend's project, a local event, a portfolio shoot. DripDome started with the same tools on this list, and they're still in rotation on every build we do. The work scales. The fundamentals don't change.</p>`,
    date: "2026-04-12",
    author: {
      name: "DripDome Team",
      role: "Production Design Studio",
    },
    category: "Industry Insights",
    tags: [
      "set design",
      "beginner guide",
      "production design",
      "fabrication tools",
      "jigsaw",
      "narrow crown stapler",
      "SketchUp",
      "3D rendering",
      "set design tools",
      "Harbor Freight",
      "BAUER",
    ],
    image: {
      url: "https://dripdome-site.s3.us-east-2.amazonaws.com/website-assets/fab.png",
      alt: "DripDome team member working with fabrication tools on a professional set build",
      width: 1200,
      height: 630,
    },
    readingTime: "8 min read",
  },
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
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllCategories(): string[] {
  return [...new Set(blogPosts.map((post) => post.category))];
}
