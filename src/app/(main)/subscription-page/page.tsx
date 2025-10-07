"use client"

import { SubscriptionCard } from "@/app/components/subscription-card";
import { Card } from "@/app/components/ui/card";

const handleSubscribe = (planName: string) => {

}

const plans = [
    {
        planName: "Basic",
        price: "RM100",
        features: ["Unlimited Analytics", "Unlimited Analytics", "Unlimited Analytics"],
        currentPlan: true,
    },
    {
        planName: "Pro",
        price: "RM150",
        features: ["Unlimited Analytics", "Unlimited Analytics", "Unlimited Analytics"],
        popular: true,
    },
    {
        planName: "Ultimate",
        price: "RM250",
        features: ["Unlimited Analytics", "Unlimited Analytics", "Unlimited Analytics"],
    }
];

export default function SubscriptionPage() {
    return (
        <div>
            <span>Access to our rich analytics data by subscribing to your desired subscription plan.</span>
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