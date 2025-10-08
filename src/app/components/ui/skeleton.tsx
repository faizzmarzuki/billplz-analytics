"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={`animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800 ${className ?? ""}`} />);

};