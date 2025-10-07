"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { CopyIcon } from "@/app/components/ui/icons/bui_copy";
import { Button } from "./ui/button";
import { DropdownMenuSimpleExample } from "./actions-dropdown";

interface TableBillingProps {
    data: Array<{
        id: number;
        name: string;
        collectionId: string;
        totalCollected: string;
        volume: string;
        status: string;
        deltaType: string;
        hours: number;
    }>;
}

export function TableBilling({ data }: TableBillingProps) {
    const [page, setPage] = useState(1);
    const [copiedRow, setCopiedRow] = useState<number | null>(null);

    const handleCopy = (id: number, value: string) => {
        navigator.clipboard.writeText(value);
        setCopiedRow(id);
        setTimeout(() => setCopiedRow(null), 1500); // reset after 1.5s
    };
    const rowsPerPage = 10;

    // Calculate pagination
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    return (
        <>
            <TableRoot className="hidden md:block">
                <Table>
                    <TableHead className="border-b border-neutral-200">
                        <TableRow>
                            <TableHeaderCell>COLLECTION NAME</TableHeaderCell>
                            <TableHeaderCell className="text-right">
                                COLLECTION ID
                            </TableHeaderCell>
                            <TableHeaderCell className="text-right">
                                TOTAL COLLECTED
                            </TableHeaderCell>
                            <TableHeaderCell className="text-right">VOLUME</TableHeaderCell>
                            <TableHeaderCell className="text-right">ACTIONS</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {item.collectionId}
                                        <div onClick={() => handleCopy(item.id, item.collectionId)}>
                                            <CopyIcon
                                                className="cursor-pointer hover:opacity-70"
                                                color={copiedRow === item.id ? "green" : "black"}
                                                width={14}
                                                height={14}
                                                strokeWidth={1.5}
                                            />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-2"><div className="bg-green-500 w-2 h-2 rounded-full" />
                                        {item.totalCollected}</div>

                                </TableCell>
                                <TableCell className="text-right">{item.volume}</TableCell>
                                <TableCell className="flex justify-end">
                                    <DropdownMenuSimpleExample collectionId={item.collectionId} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableRoot>
            <div className="space-y-4 md:hidden">
                {paginatedData.map((item) => (
                    <div
                        key={item.id}
                        className="p-4 bg-white border-b border-neutral-200"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold">{item.name}</h3>
                            <DropdownMenuSimpleExample collectionId={item.collectionId} />
                        </div>
                        <p className="text-sm text-neutral-500 flex items-center gap-2">{item.collectionId}
                            <div onClick={() => handleCopy(item.id, item.collectionId)}>
                                <CopyIcon
                                    className="cursor-pointer hover:opacity-70"
                                    color={copiedRow === item.id ? "green" : "black"}
                                    width={14}
                                    height={14}
                                    strokeWidth={1.5}
                                />
                            </div></p>
                        <p className="text-sm flex items-center gap-2">
                            COLLECTED
                            <div className="bg-green-500 w-2 h-2 rounded-full" />
                            {item.totalCollected}
                        </p>
                        <p className="text-sm text-neutral-700">VOLUME {item.volume}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-4 p-4">
                <Button
                    className="w-24 text-neutral-500 bg-white border border-neutral-200 hover:bg-neutral-200 disabled:opacity-50 disabled:bg-neutral-300 disabled:cursor-not-allowed disabled:text-neutral-500"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    Previous
                </Button>
                <Button
                    className="w-24 text-neutral-500 bg-white border border-neutral-200 hover:bg-neutral-200 disabled:opacity-50 disabled:bg-neutral-300 disabled:cursor-not-allowed"
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next
                </Button>
            </div>
        </>
    );
}
