import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";

interface SubscriptionCardProps {
    planName: string;
    price: string;
    features: string[];
    currentPlan?: boolean;
    onClick?: () => void;
    popular?: boolean;
}

export const SubscriptionCard = ({
    planName,
    price,
    features,
    currentPlan,
    onClick,
    popular,
}: SubscriptionCardProps) => {
    return (
        <div className="flex flex-col h-[600px]">
            <div className={`items-center gap-2 bg-blue-500 text-white px-2 py-1 rounded-t justify-center ${popular ? "flex" : "hidden"}`}>
                <span>Popular</span>
            </div>
            <Card className={`p-6 flex flex-col justify-between flex-1 items-center ${popular ? " border-blue-500 border-2 rounded-b" : "border-neutral-200 border rounded"}`}>
                <span className="text-xl font-semibold">{planName}</span>
                <span className="text-2xl font-semibold">{price}</span>
                <span className="text-sm">per month</span>
                <div className="flex flex-col gap-2 w-full">
                    <span>ACCESS TO</span>
                    {features.map((feature) => (
                        <span key={feature}>{feature}</span>
                    ))}
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full disabled:cursor-not-allowed hover:bg-blue-400" onClick={onClick} disabled={currentPlan}>{currentPlan ? "Current Plan" : "Subscribe"}</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogDescription className="mt-1 text-sm leading-6">Billplz will deduct RM 1,000 (non-refundable) from your credit balance to activate the {planName} plan subscription from {new Date().toLocaleDateString()} to {new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString()}. Do you agree?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-6 flex gap-2 w-full">
                            <DialogClose asChild>
                                <Button className="mt-2 w-full sm:mt-0 sm:w-fit" variant="secondary">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button className="w-full sm:w-fit" variant="secondary">OK</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Card>
        </div>
    );
};