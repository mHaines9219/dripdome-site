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
    name: "Wall Flats",
    category: "Set Pieces",
    image: "https://dripdome-site.s3.us-east-2.amazonaws.com/rentals/flats.webp",
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
    name: "Artificial Flowers",
    category: "Props",
    image: "", // TODO: Add image
  },
];

export const categories = ["All", "Set Pieces", "Props"];
