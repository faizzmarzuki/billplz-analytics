"use client";

import { useEffect, useState } from "react";
import { CalendarIcon } from "./ui/icons/bui_calendar";

interface CalendarFilterProps {
  filterDate?: (range: {start: string;end: string;}) => void;
}

const toISO = (date: Date) => date.toISOString();

const buildFilterDateEnum = () => {
  const now = new Date();
  const minusMs = (ms: number) => new Date(now.getTime() - ms);
  const startOfSameWeekdayLastWeek = () => {
    const start = new Date(now);
    start.setDate(start.getDate() - 7);
    start.setHours(0, 0, 0, 0);
    return start;
  };
  return [
  {
    tag: "Today",
    value: { start: toISO(minusMs(24 * 60 * 60 * 1000)), end: toISO(now) },
    compared: "previous 24 hours."
  },
  {
    tag: "This Week",
    value: {
      start: toISO(startOfSameWeekdayLastWeek()),
      end: toISO(now)
    },
    compared: "this week."
  },
  {
    tag: "This Month",
    value: {
      start: (() => {
        const s = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
        return toISO(s);
      })(),
      end: (() => {
        const e = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        return toISO(e);
      })()
    },
    compared: "this month."
  },
  {
    tag: "This Year",
    value: {
      start: (() => {
        const now = new Date();
        const start = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          now.getSeconds(),
          now.getMilliseconds()
        );
        return toISO(start);
      })(),
      end: toISO(new Date())
    },
    compared: "previous 12 months."
  }];

};

export const CalendarFilter = ({ filterDate }: CalendarFilterProps) => {
  const [open, setOpen] = useState(false);
  const options = buildFilterDateEnum();
  const [selected, setSelected] = useState(options[0]);


  useEffect(() => {
    filterDate?.(selected.value);

  }, [filterDate, selected.value]);

  const handleSelect = (date: ReturnType<typeof buildFilterDateEnum>[number]) => {
    setSelected(date);
    setOpen(false);
  };

  return (
    <div className="relative">
            
            <div className="flex items-center gap-2">
                <div
          className="flex items-center w-32 gap-2 p-2 bg-neutral-50 rounded-lg border border-neutral-200 cursor-pointer"
          onClick={() => setOpen(!open)}>

                    <CalendarIcon />
                    {selected.tag}
                </div>
                <span className="text-neutral-500">Compared to previous {selected.compared}</span>
            </div>

            
            {open &&
      <div className="absolute mt-2 w-32 flex flex-col gap-2 p-2 bg-neutral-50 rounded-lg border border-neutral-200 z-30">
                    {options.map((date) =>
        <span
          key={date.tag}
          className={`cursor-pointer hover:text-blue-600 ${selected.tag === date.tag ? "font-semibold text-blue-600" : ""}`
          }
          onClick={() => handleSelect(date)}>

                            {date.tag}
                        </span>
        )}
                </div>
      }
        </div>);

};