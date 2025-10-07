export interface Collection {
  id: number;
  name: string;
  collectionId: string;
  totalCollected: string;
  volume: string;
  status: "Active" | "Inactive";
  deltaType: string;
  hours: number;
}
