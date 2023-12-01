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
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Issue, User } from "@prisma/client";
import { ResponseData } from "@http";

const AssignUserSelect = ({ issue }: { issue: Issue }) => {
  const { data, isLoading } = useQuery<ResponseData<User[]>>({
    queryKey: ["user"],
    queryFn: async () =>
      (
        await fetch("/api/user", {
          method: "GET",
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
        })
      ).json(),
  });
  const handleChange = (e: string) => {
    fetch(`/api/issues/${issue.id}/assignedUser`, {
      method: "PUT",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ assignedToUserId: e === " " ? null : e }),
    });
  };
  if (isLoading) return <Skeleton className="w-[180px] my-2 h-8" />;
  return (
    <Select
      onValueChange={handleChange}
      defaultValue={issue.assignedToUserId || " "}
    >
      <SelectTrigger className="w-[180px] my-2">
        <SelectValue placeholder="Select a person" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value=" ">UnAssigned User</SelectItem>
          {data?.data.map((item) => (
            <SelectItem value={item.id} key={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AssignUserSelect;
