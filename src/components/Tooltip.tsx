"use client";

import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import React from "react";

export const Tip = ({
  content,
  children,
  className,
}: React.PropsWithChildren<{
  content: string | React.ReactNode;
  className?: string;
}>) => {
  const [open, setOpen] = React.useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={open}>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={`cursor-pointer ${className}`}
            onClick={() => setOpen(!open)}
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent className={!content ? "hidden" : ""}>
          <span className="inline-block">{content}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
