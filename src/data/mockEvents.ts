import { EventItem, GalleryItem } from "@/types/event";

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: "evt-1",
    title: "Winter Warmth: Blanket Distribution Drive",
    category: "Donation",
    thumbnail:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80",
    location: "Mohammadpur Town Hall Ground, Dhaka",
    date: "2026-11-20",
    time: "09:00 AM - 02:00 PM",
    description:
      "Collecting and handing over 1,500+ premium thermal blankets and warm clothes directly to underprivileged street families and rickshaw pullers facing severe winter nights.",
    organizer: "Tanvir Hossain",
    organizerEmail: "tanvir@unitypulse.org",
    organizerAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    attendeesCount: 48,
    targetAttendees: 60,
  },
  {
    id: "evt-2",
    title: "Clean Buriganga Riverbank Ecological Drive",
    category: "Cleanup",
    thumbnail:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
    location: "Sadarghat Launch Terminal Embankment, Old Dhaka",
    date: "2026-11-28",
    time: "07:30 AM - 12:00 PM",
    description:
      "Join 100+ youth eco-warriors equipped with gloves and bio-degradable bags to clear solid plastic waste from river banks, followed by a public awareness rally.",
    organizer: "Sabrina Rahman",
    organizerEmail: "sabrina@ecobangladesh.org",
    organizerAvatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    attendeesCount: 76,
    targetAttendees: 100,
  },
  {
    id: "evt-3",
    title: "Free Child Health & Nutrition Screening Camp",
    category: "Healthcare",
    thumbnail:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    location: "Mirpur 10 Community Centre, Dhaka",
    date: "2026-12-05",
    time: "10:00 AM - 04:30 PM",
    description:
      "Volunteering doctors and nursing students will deliver free pediatric consultations, deworming treatments, basic vitamins, and healthy dietary packages to 400+ slum children.",
    organizer: "Dr. Kazi Fahim",
    organizerEmail: "fahim.kazi@pulsehealth.org",
    organizerAvatar:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
    attendeesCount: 32,
    targetAttendees: 40,
  },
  {
    id: "evt-4",
    title: "1,000 Fruit & Shade Tree Plantation Campaign",
    category: "Plantation",
    thumbnail:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    location: "Uttara Sector 18 Canal Promenade, Dhaka",
    date: "2026-12-12",
    time: "08:00 AM - 01:00 PM",
    description:
      "Transforming barren urban canalside pathways into lush green corridors. Every volunteer will be assigned 10 neem, mahogany, and fruit saplings with protective bamboo guards.",
    organizer: "Nahid Chowdhury",
    organizerEmail: "nahid@greenyouth.bd",
    organizerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    attendeesCount: 92,
    targetAttendees: 120,
  },
  {
    id: "evt-5",
    title: "Book Donation & Digital Literacy Camp for Slum Youth",
    category: "Education",
    thumbnail:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    location: "Korail Bastee Community Learning Hub, Banani",
    date: "2026-12-18",
    time: "02:00 PM - 06:00 PM",
    description:
      "Setting up an open lending library with 800+ collected Bengali & English children storybooks and providing introductory computer literacy workshops.",
    organizer: "Farzana Yesmin",
    organizerEmail: "farzana@shikkhafoundation.org",
    organizerAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    attendeesCount: 28,
    targetAttendees: 35,
  },
  {
    id: "evt-6",
    title: "Flood Resilience & Disaster First-Aid Workshop",
    category: "Healthcare",
    thumbnail:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    location: "Shahjalal Science & Tech University Hall, Sylhet",
    date: "2026-12-24",
    time: "10:00 AM - 03:00 PM",
    description:
      "Hands-on practical training on emergency water purification tablets, CPR, flood rescue protocols, and disaster kit distribution across low-lying union councils.",
    organizer: "Tanvir Hossain",
    organizerEmail: "tanvir@unitypulse.org",
    organizerAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    attendeesCount: 65,
    targetAttendees: 80,
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
    title: "Warm Clothes Aid",
    location: "Mirpur, Dhaka",
    caption: "1,200 Coats Distributed",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80",
    title: "Emergency Food Package",
    location: "Kurigram District",
    caption: "4,500 Families Reached",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    title: "Urban Afforestation",
    location: "Uttara Green Sector",
    caption: "3,200 Saplings Planted",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80",
    title: "Slum Medical Outreach",
    location: "Rayerbazar, Dhaka",
    caption: "850 Free Prescriptions",
  },
];
