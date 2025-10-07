import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Divider } from "@/app/components/ui/divider";

interface SubscriptionCardProps {
    planName: string;
    price: number;
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
        <div className="flex flex-col h-[550px]">
            <div className={`items-center gap-2 bg-blue-500 text-white px-2 py-1 w-full rounded-t-lg justify-center ${popular ? "flex" : "hidden"}`}>
                <span>Popular</span>
            </div>
            <Card className={`p-6 flex flex-col justify-between flex-1 items-center w-full ${popular ? " border-blue-500 border-2 rounded-b-lg" : "border-neutral-200 border rounded-lg"}`}>
                <div className="flex flex-col gap-2 w-full">
                    <div className={`flex flex-col gap-2 items-center ${popular ? "" : "pt-6"}`}>
                        <span className="text-xl font-bold ">{planName}</span>
                        <span className="text-2xl font-bold text-blue-500">RM {price}</span>
                        <span className="text-sm text-blue-500 font-light">per month</span>
                    </div>
                    <Divider />
                    <div className="flex flex-col gap-2 w-full">
                        <span className="font-semibold text-neutral-500">ACCESS TO</span>
                        {features.map((feature) => (
                            <span key={feature} className="text-sm font-normal text-neutral-500">{feature}</span>
                        ))}
                    </div>
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