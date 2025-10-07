"use client"

import { SubscriptionCard } from "@/app/components/subscription-card";

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
        <div className="flex flex-col gap-5">
            <span className="text-base text-left font-light text-neutral-500 w-full">Access to our rich analytics data by subscribing to your desired subscription plan.</span>
            <div className="grid grid-cols-1 md:grid-cols-3 pt-10 items-center md:gap-10 gap-5">
                {plans.map((plan, index) => (
                    <SubscriptionCard key={index} planName={plan.planName} price={plan.price} features={plan.features} currentPlan={plan.currentPlan} popular={plan.popular} />
                ))}
            </div>
        </div>
    );
}   