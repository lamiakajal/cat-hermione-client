export interface EventItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  thumbnail: string;
  attendeesCount: number;
  targetAttendees: number;
  organizer: string;
  organizerEmail: string;
  organizerAvatar?: string;
}

export interface GalleryItem {
  id?: string;
  title: string;
  caption?: string;
  description?: string;
  imageUrl: string;
  location?: string;
  date?: string;
}
