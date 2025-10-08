"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger } from
"@/components/ui/dropdown";
import { KebabIcon } from "@/app/components/ui/icons/bui_kebab";

interface ActionsDropdownProps {
  collectionId: string;
}

export const DropdownMenuSimpleExample = ({ collectionId }: ActionsDropdownProps) => {
  const viewCollection = (collectionId: string) => {
    return () => console.log(collectionId);
  };

  const actionSecond = () => {
    alert("Action 2");
  };

  return (
    <div className="flex justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary"><KebabIcon color="black" size={20} strokeWidth={1} /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={viewCollection(collectionId)}>View Collection</DropdownMenuItem>
                    <DropdownMenuItem onClick={actionSecond}>Action 2</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>);

};