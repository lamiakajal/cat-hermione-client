export type EventCategory =
  | "Donation"
  | "Cleanup"
  | "Plantation"
  | "Healthcare"
  | "Education";

// Interface for civic event data structures
export interface EventItem {
  id: string;
  _id?: string; // Optional MongoDB ObjectId support
  title: string;
  category: EventCategory;
  thumbnail: string;
  location: string;
  date: string;
  time?: string;
  description: string;
  organizer: string;
  organizerEmail: string;
  organizerAvatar: string;
  attendeesCount: number;
  targetAttendees: number;
  attendees?: string[]; // Array of volunteer user emails or IDs
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Interface for gallery photo items
export interface GalleryItem {
  url: string;
  title: string;
  location: string;
  stat: string;
}
