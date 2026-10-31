export interface EventItem {
  id: string;
  title: string;
  category: "Donation" | "Cleanup" | "Plantation" | "Healthcare" | "Education";
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
  tags?: string[];
}
