interface CollectionProgressProps {
    title: string;
    amount: number;
    percentage: number;
}

export default function CollectionProgress({ title, amount, percentage }: CollectionProgressProps) {
    return (

        <div>
            {/* Title */}
            <span className="block mb-1 text-sm font-medium">{title}</span>

            <div className="flex items-center gap-2">
                {/* Progress bar wrapper */}
                <div className="relative flex-1 h-6 bg-neutral-300 dark:bg-gray-700 overflow-hidden">
                    {/* Blue progress (width = percentage) */}
                    <div
                        className="h-6 bg-blue-500 border-r-4 border-sky-400 relative"
                        style={{ width: `${percentage}%` }}
                    >
                        {/* Amount text always inside blue */}
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-white whitespace-nowrap">
                            RM {amount}
                        </span>
                    </div>
                </div>

                {/* Percentage on the right */}
                <span className="text-sm font-medium">{percentage}%</span>
            </div>
        </div>
    );
}