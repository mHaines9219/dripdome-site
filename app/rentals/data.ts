// Rental equipment data - shared between RentalGrid and RentalForm dropdown
export interface RentalItem {
  id: number;
  name: string;
  category: string;
  image: string;
}

export const rentalEquipment: RentalItem[] = [
  {
    id: 1,
    name: "Wall Flats (Various Configurations)",
    category: "Set Pieces",
    image:
      "https://dripdome-site.s3.us-east-2.amazonaws.com/rentals/flats.webp",
  },
  {
    id: 2,
    name: "6ft Ruler",
    category: "Props",
    image: "", // TODO: Add image
  },
  {
    id: 3,
    name: "6ft Pencil",
    category: "Props",
    image: "", // TODO: Add image
  },
  {
    id: 4,
    name: "Hedge Wall Panels (120 sqft)",
    category: "Props",
    image:
      "https://dripdome-site.s3.us-east-2.amazonaws.com/rentals/hedge_panels.png",
  },
  {
    id: 5,
    name: "Checkerboard Flooring (10' x 8')",
    category: "Set Pieces",
    image:
      "https://dripdome-site.s3.us-east-2.amazonaws.com/rentals/checker_floor.jpeg",
  },
  {
    id: 6,
    name: 'Oversized Playing Cards (11"x17")',
    category: "Props",
    image:
      "https://dripdome-site.s3.us-east-2.amazonaws.com/rentals/oversized cards.png",
  },
  {
    id: 6,
    name: 'White Plynth/Pedestal (42"H, 15"W, 15"D) ',
    category: "Props",
    image:
      "https://dripdome-site.s3.us-east-2.amazonaws.com/rentals/plyth_1.png",
  },
];

export const categories = ["All", "Set Pieces", "Props"];
