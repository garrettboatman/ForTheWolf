"use client";

import { InfoIcon } from "lucide-react";
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from "./tooltip";

interface InfoTooltipProps {
  text: string | React.ReactElement;
  className?: string;
}

export function InfoTooltip({ text, className = "" }: InfoTooltipProps) {
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger asChild>
          <button
            className={`p-4 block width items-center focus:outline-none ${className}`}
          >
            <InfoIcon
              size={40}
              fill="white"
              className="text-orange-500 hover:text-orange-600"
            />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px] p-4">
          <p>{text}</p>
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
}
