import { Card } from "@/app/components/ui/card";
import { QuestionMarkCircleIcon } from "@/app/components/ui/icons/bui_question-mark-circle";

export default function UpcomingFPX() {

    const collectionDate = [{ date: "2022-01-01", value: 100 }, { date: "2022-01-02", value: 200 }, { date: "2022-01-03", value: 250 }, { date: "2022-01-04", value: 220 }, { date: "2022-01-05", value: 250 }];

    return (
        <Card className="w-full flex flex-col gap-4 p-4 rounded-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span>Upcoming FPX Payout</span>
                    <QuestionMarkCircleIcon color={`oklch(62.3% 0.214 259.815)`} />
                </div>
                <span>See Details</span>
            </div>
            <div className="flex flex-col gap-2">
                <span>RM 1,200.00</span>
                <span>Expected to reach your bank account on 12 Sept 2021</span>
            </div>
            <div
                className="w-full border-t border-transparent"
                style={{
                    borderImage: "repeating-linear-gradient(to right, #d4d4d4 0, #d4d4d4 10px, transparent 10px, transparent 20px) 1",
                }}
            />
            <div>
                <span>COLLECTION DATE</span>
                <div className="flex flex-col gap-2">
                    {collectionDate.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <span>{item.date}</span>
                            <span>RM{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}