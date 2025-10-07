"use client"

import { SubscriptionCard } from "@/app/components/subscription-card";
import { Card } from "@/app/components/ui/card";

const handleSubscribe = (planName: string) => {

}

const plans = [
    {
        planName: "BASIC",
        price: 100,
        features: ["Latest 100 customers data", "Process", "Features 3"],
        currentPlan: true,
    },
    {
        planName: "PRO",
        price: 500,
        features: ["Latest 100 customers data", "Process", "Features 3", "Features Hidden 4"],
        popular: true,
    },
    {
        planName: "SUPER",
        price: 1000,
        features: ["Latest 100 customers data", "Process", "Features 3", "Features Hidden 4", "Features Hidden 5"],
    }
];

export default function SubscriptionPage() {
    return (
        <div>
            <span className="text-base text-justify font-light text-neutral-500">Access to our rich analytics data by subscribing to your desired subscription plan.</span>
            <div className="flex flex-col pt-10 items-center gap-10 md:flex-row md:items-stretch">
                {plans.map((plan, index) => (
                    <div className="w-[300px]">
                        <SubscriptionCard key={index} planName={plan.planName} price={plan.price} features={plan.features} currentPlan={plan.currentPlan} popular={plan.popular} onClick={() => handleSubscribe(plan.planName)} />
                    </div>
                ))}
            </div>
        </div>
    );
}   