import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder: "name" | "email";
}

const UserTable = async ({ sortOrder }: Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: {
      revalidate: 10,
    },
  });
  const users: User[] = await res.json();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Link href="/users?sortOrder=name">Name</Link>
          </TableHead>
          <TableHead>
            <Link href="/users?sortOrder=email">Email</Link>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users
          .sort((a, b) => a?.[sortOrder].length - b[sortOrder].length)
          .map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
