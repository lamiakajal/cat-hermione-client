import { GalleryItem } from "@/types/event";

// Static gallery content for the home page
const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    imageUrl: photo("1488521787991-ed7bbaae773c"),
    title: "Warm Clothes Aid",
    location: "Mirpur, Dhaka",
    caption: "1,200 coats distributed",
  },
  {
    imageUrl: photo("1593113598332-cd288d649433"),
    title: "Emergency Food Package",
    location: "Kurigram",
    caption: "4,500 families reached",
  },
  {
    imageUrl: photo("1542601906990-b4d3fb778b09"),
    title: "Urban Afforestation",
    location: "Uttara, Dhaka",
    caption: "3,200 saplings planted",
  },
  {
    imageUrl: photo("1576765608535-5f04d1e3f289"),
    title: "Slum Medical Outreach",
    location: "Rayerbazar, Dhaka",
    caption: "850 free prescriptions",
  },
  {
    imageUrl: photo("1618477461853-cf6ed80faba5"),
    title: "Riverbank Cleanup",
    location: "Sadarghat, Dhaka",
    caption: "2.4 tonnes of plastic cleared",
  },
  {
    imageUrl: photo("1542810634-71277d95dcbb"),
    title: "Blanket Distribution",
    location: "Mohammadpur, Dhaka",
    caption: "1,500 blankets handed over",
  },
  {
    imageUrl: photo("1584515979956-d9f6e5d09982"),
    title: "Child Nutrition Camp",
    location: "Narayanganj",
    caption: "600 children screened",
  },
  {
    imageUrl: photo("1497633762265-9d179a990aa6"),
    title: "Digital Literacy Camp",
    location: "Korail, Dhaka",
    caption: "300 learners enrolled",
  },
];
