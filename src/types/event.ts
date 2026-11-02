// Shape returned by the API
export interface EventItem {
  _id: string;
  title: string;
  category: string;
  eventDate: string;
  location: string;
  description: string;
  bannerImage: string;
  organizerName: string;
  organizerEmail: string;
  contactEmail?: string;
  organizerPhoto?: string;
  attendeesCount: number;
  hasJoined?: boolean;
  joinedAt?: string;
}

export interface EventsResponse {
  success: boolean;
  count: number;
  data: EventItem[];
}

export interface GalleryItem {
  title: string;
  caption?: string;
  imageUrl: string;
  location?: string;
}
