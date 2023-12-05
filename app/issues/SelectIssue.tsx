"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

const selectArr: { label: string; value: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Close", value: "CLOSE" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
];
const SelectIssue = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleChange = (e: string) => {
    const query = e === "ALL" ? "" : `?status=${e}`;
    router.push("/issues" + query);
  };
  return (
    <Select
      onValueChange={handleChange}
      defaultValue={searchParams.get("status") || ""}
    >
      <SelectTrigger className="w-[180px] my-2">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectArr.map((item) => (
            <SelectItem value={item.value} key={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectIssue;
