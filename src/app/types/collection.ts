
export interface Transaction {
  amount: number;
  payment_method: string;
  volume: number;
  payment_date: string;
  settlement_date: string;
  created_at: string;
  id: string;
  collectionId: string;
}

export interface Collection {
  createdAt: number;
  name: string;
  status: "active" | "inactive";
  id: string;
}


export interface TableBillingData {
  id: number;
  name: string;
  collectionId: string;
  totalCollected: string;
  volume: string;
  status: string;
  deltaType: string;
  hours: number;
}