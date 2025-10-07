"use client"

import { ChartCard } from "@/app/components/chart-card";
import CollectionCard from "@/app/components/collection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import TotalPaidCard from "@/app/components/total-paid-card";
import { TableBilling } from "@/app/components/table-billing";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, DrawerBody, DrawerFooter } from "@/app/components/ui/drawer";
import { Button } from "@/app/components/ui/button";
import { FilterIcon } from "@/app/components/ui/icons/bui_filter";
import CloseButton from "@/app/components/close-icon";
import React from "react";
import { DateRangePicker } from "@/app/components/date-picker";
import { Checkbox } from "@/app/components/ui/checkbox";

const TableDataActive = [{
    id: 1,
    name: "Collection 1",
    collectionId: "113456789",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Active",
    deltaType: "Up",
    hours: 24,
}, {
    id: 2,
    name: "Collection 2",
    collectionId: "223456789",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Active",
    deltaType: "Up",
    hours: 24,
}, {
    id: 3,
    name: "Collection 3",
    collectionId: "333456789",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Active",
    deltaType: "Up",
    hours: 24,
}, {
    id: 4,
    name: "Collection 4",
    collectionId: "123456789",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Active",
    deltaType: "Up",
    hours: 24,
}, {
    id: 5,
    name: "Collection 5",
    collectionId: "123456789",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Active",
    deltaType: "Up",
    hours: 24,
}, {
    id: 6,
    name: "Collection 6",
    collectionId: "123456789",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Active",
    deltaType: "Up",
    hours: 24,
}, {
    id: 7,
    name: "Collection 7",
    collectionId: "123456789",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Active",
    deltaType: "Up",
    hours: 24,
}, {
    id: 8,
    name: "Collection 8",
    collectionId: "123456789",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Active",
    deltaType: "Up",
    hours: 24,
}, {
    id: 9,
    name: "Collection 9",
    collectionId: "123456789",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Active",
    deltaType: "Up",
    hours: 24,
}, {
    id: 10,
    name: "Collection 10",
    collectionId: "123456789",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Active",
    deltaType: "Up",
    hours: 24,
}]

const TableDataInactive = [{
    id: 11,
    name: "Collection 11",
    collectionId: "123456711",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Inactive",
    deltaType: "Up",
    hours: 24,
}, {
    id: 12,
    name: "Collection 12",
    collectionId: "123456722",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Active",
    deltaType: "Up",
    hours: 24,
}, {
    id: 13,
    name: "Collection 13",
    collectionId: "123456733",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Active",
    deltaType: "Up",
    hours: 24,
}, {
    id: 14,
    name: "Collection 14",
    collectionId: "123456789",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Active",
    deltaType: "Up",
    hours: 24,
}, {
    id: 15,
    name: "Collection 15",
    collectionId: "123456789",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Active",
    deltaType: "Up",
    hours: 24,
}, {
    id: 16,
    name: "Collection 16",
    collectionId: "123456789",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Active",
    deltaType: "Up",
    hours: 24,
}, {
    id: 17,
    name: "Collection 17",
    collectionId: "123456789",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Active",
    deltaType: "Up",
    hours: 24,
}, {
    id: 18,
    name: "Collection 18",
    collectionId: "123456789",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Active",
    deltaType: "Up",
    hours: 24,
}, {
    id: 19,
    name: "Collection 19",
    collectionId: "123456789",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Inactive",
    deltaType: "Up",
    hours: 24,
}, {
    id: 20,
    name: "Collection 20",
    collectionId: "123456789",
    totalCollected: "RM100.00",
    volume: "100",
    status: "Inactive",
    deltaType: "Up",
    hours: 24,
}]

const TableDataAll = [...TableDataActive, ...TableDataInactive]

const books: Book[] = [{ title: "Twenty Thousand Leagues Under the Sea", author: "Jules Verne", year: 1870, genre: "Science Fiction", summary: "The novel chronicles the adventures of Captain Nemo and his submarine, the Nautilus, as seen by Professor Pierre Aronnax. After being captured by the mysterious captain, Aronnax, his servant Conseil, and a Canadian whaler named Ned Land, experience the wonders of the underwater world. Throughout their journey, they encounter various marine life, explore underwater forests, and discover the lost city of Atlantis. They also face dangers, such as giant squids and treacherous underwater tunnels. Ultimately, they must decide whether to remain with Captain Nemo or attempt to escape his obsessive quest for revenge against the surface world.", }, { title: "Journey to the Center of the Earth", author: "Jules Verne", year: 1864, genre: "Science Fiction", summary: "Professor Otto Lidenbrock discovers an ancient manuscript that points to a passage to the center of the Earth. Accompanied by his nephew Axel and their guide, Hans Belker, they embark on an expedition to Iceland to find the entrance to the subterranean world. They descend through volcanic tubes and encounter a series of remarkable underground environments, including vast caverns, subterranean seas, and prehistoric creatures. Along the way, they face numerous challenges and near-death experiences. Their journey is not only a physical adventure but also a scientific quest to understand the Earth's inner layers, ultimately returning to the surface with a wealth of knowledge and a new perspective on the natural world.", }, { title: "Around the World in Eighty Days", author: "Jules Verne", year: 1873, genre: "Adventure", summary: "Phileas Fogg, an English gentleman, wagers that he can circumnavigate the globe in just eighty days. Accompanied by his loyal French valet, Passepartout, Fogg sets off on a whirlwind adventure across various countries and continents. Their journey is filled with obstacles, including delays, natural disasters, and relentless pursuit by a detective named Fix, who mistakenly believes Fogg is a bank robber. Despite these challenges, Fogg remains calm and determined to win the bet. In the end, Fogg's meticulous planning and resourcefulness, along with some unexpected help, allow him to complete the journey just in time, proving that with determination and ingenuity, anything is possible.", }, { title: "The Mysterious Island", author: "Jules Verne", year: 1874, genre: "Adventure", summary: "During the American Civil War, five prisoners escape in a hot air balloon, only to crash on an uncharted island in the Pacific. They must use their ingenuity and knowledge to survive and explore their new home, which they name Lincoln Island. The castaways discover that the island is rich in natural resources, enabling them to build a new society from scratch. They face various challenges, including wild animals, pirates, and mysterious occurrences that suggest they are not alone. Throughout their adventures, they uncover the island's secrets, including the presence of Captain Nemo, who has been living in seclusion. The story highlights themes of survival, cooperation, and the triumph of human spirit and intelligence.", },]

type StateType = [boolean, () => void, () => void, () => void] &
{
    state: boolean
    open: () => void
    close: () => void
    toggle: () => void
}

const useToggleState = (initial = false) => {
    const [state, setState] = React.useState<boolean>(initial)
    const close = () => { setState(false) }
    const open = () => { setState(true) }
    const toggle = () => { setState((state) => !state) }
    const hookData = [state, open, close, toggle] as StateType
    hookData.state = state
    hookData.open = open
    hookData.close = close
    hookData.toggle = toggle
    return hookData
}

interface Book {
    title: string
    author: string
    year: number
    genre: string
    summary: string
}

export default function BillingPage() {
    const [filterDate, setFilterDate] = useState<string | null>(null);
    const [editOpen, showEdit, closeEdit] = useToggleState()
    const [bookToEdit, setBookToEdit] = React.useState<Book | null>(null)
    const editBook = (book: Book) => {
        setBookToEdit(book)
        showEdit()
    }
    const onSave = () => {    // update    
        closeEdit()
    }
    return (
        <div className="flex flex-col gap-5">
            <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <ChartCard
                    title="Total Paid"
                    amount="RM900.00"
                    chartType="line"
                    data={[
                        { date: "2022-09-01", value: 380 },
                        { date: "2022-09-06", value: 400 },
                        { date: "2022-09-12", value: 470 },
                        { date: "2022-09-18", value: 390 },
                        { date: "2022-09-24", value: 350 },
                        { date: "2022-09-30", value: 500 },
                    ]}
                    index="date"
                    categories={["value"]}
                />
                <CollectionCard title="Top 5 Performing Collections" />
                <div className="flex flex-col gap-5">
                    <TotalPaidCard />
                    <TotalPaidCard />
                </div>
            </div>
            <div>
                <span className="text-2xl font-bold">Collections</span>
                <Card className="rounded-md">
                    <Tabs defaultValue="all">
                        <div>
                            <TabsList className="flex flex-col-reverse items-end gap-2 md:flex-row md:justify-between w-full">
                                <div className="flex w-full gap-2">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="inactive">Inactive</TabsTrigger>
                                    <TabsTrigger value="active">Active</TabsTrigger>
                                </div>
                                <div className="flex items-center gap-2 p-2">
                                    <Input placeholder="Search" className="w-full p-2" />
                                    <Button variant="secondary" onClick={() => editBook(books[0])} className="flex items-center gap-2"> <FilterIcon color="black" size={20} strokeWidth={1} /> Filter</Button>
                                </div>
                            </TabsList>
                        </div>
                        <TabsContent value="all">
                            <TableBilling data={TableDataAll} />
                        </TabsContent>
                        <TabsContent value="inactive">
                            <TableBilling data={TableDataInactive} />
                        </TabsContent>
                        <TabsContent value="active">
                            <TableBilling data={TableDataActive} />
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
            <Drawer open={editOpen} onOpenChange={(modalOpened) => { if (!modalOpened) { closeEdit() } }}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle><span>Filter</span></DrawerTitle>
                        <DrawerClose><CloseButton onClick={closeEdit} /></DrawerClose>
                    </DrawerHeader>
                    <DrawerBody className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <span>Collection Name</span>
                            <Input placeholder="Type to search" />
                        </div>
                        <div>
                            <span>Date Range</span>
                            <DateRangePicker />
                        </div>
                        <div>
                            <span>Status</span>
                            <div className="flex items-center gap-2">
                                <Checkbox defaultChecked id="r1" />
                                <span>Paid</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="r2" />
                                <span>Unpaid</span>
                            </div>
                        </div>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button onClick={onSave}>ApplyFilter</Button>
                        <Button variant="secondary" onClick={closeEdit}>Reset</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}