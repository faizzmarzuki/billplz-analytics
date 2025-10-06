"use client";

import { useState } from "react";
import { CalendarIcon } from "./ui/icons/calendar";

interface CalendarFilterProps {
    filterDate?: (range: { start: string; end: string }) => void;
}

const now = new Date();
const formatDate = (date: Date) => date.toISOString().split("T")[0];

const filterDateEnum = [
    {
        tag: "Today",
        value: { start: formatDate(now), end: formatDate(now) },
    },
    {
        tag: "Last 7 days",
        value: {
            start: formatDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6)),
            end: formatDate(now),
        },
    },
    {
        tag: "This month",
        value: {
            start: formatDate(new Date(now.getFullYear(), now.getMonth(), 1)),
            end: formatDate(now),
        },
    },
    {
        tag: "This year",
        value: {
            start: formatDate(new Date(now.getFullYear(), 0, 1)),
            end: formatDate(now),
        },
    },
];

export const CalendarFilter = ({ filterDate }: CalendarFilterProps) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(filterDateEnum[0]); // default = "This month"

    const handleSelect = (date: typeof filterDateEnum[number]) => {
        setSelected(date);
        filterDate?.(date.value);
        setOpen(false); // close dropdown
    };

    return (
        <div className="relative">
            {/* Trigger button */}
            <div
                className="flex items-center w-32 gap-2 p-2 bg-neutral-50 rounded-lg border border-neutral-200 cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <CalendarIcon />
                {selected.tag}
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute mt-2 w-32 flex flex-col gap-2 p-2 bg-neutral-50 rounded-lg border border-neutral-200 z-30">
                    {filterDateEnum.map((date) => (
                        <span
                            key={date.tag}
                            className={`cursor-pointer hover:text-blue-600 ${selected.tag === date.tag ? "font-semibold text-blue-600" : ""
                                }`}
                            onClick={() => handleSelect(date)}
                        >
                            {date.tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};
