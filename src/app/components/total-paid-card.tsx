import { Card } from "@/app/components/ui/card";

export default function TotalPaidCard() {
    return (
        <Card className="rounded-md">
            <div className="flex flex-col gap-2 p-4">
                <span>Total Paid</span>
                <span>RM 1,200.00</span>
            </div>
        </Card>
    );
}