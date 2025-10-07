import { Card } from "@/app/components/ui/card";
import { QuestionMarkCircleIcon } from "@/app/components/ui/icons/bui_question-mark-circle";

interface CollectionDate {
    data: any[];
}

export default function UpcomingFPX({ data }: CollectionDate) {

    return (
        <Card className="w-full flex flex-col p-4 rounded-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="font-bold">Upcoming FPX Payout</span>
                    <QuestionMarkCircleIcon color={`oklch(62.3% 0.214 259.815)`} />
                </div>
                <span className="font-semibold text-blue-500 text-sm hover:underline cursor-pointer">See Details</span>
            </div>
            <div className="flex flex-col gap-2 pb-4">
                <span className="font-bold text-3xl">RM 1,200.00</span>
                <span className="text-sm text-neutral-500">Expected to reach your bank account on 12 Sept 2021</span>
            </div>
            <div
                className="w-full border-t border-transparent pb-4"
                style={{
                    borderImage: "repeating-linear-gradient(to right, #d4d4d4 0, #d4d4d4 10px, transparent 10px, transparent 20px) 1",
                }}
            />
            <div>
                <span className="font-semibold text-neutral-500">COLLECTION DATE</span>
                <div className="flex flex-col gap-2 pt-2">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <span>{item.date}</span>
                            <span className="font-semibold">RM{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}