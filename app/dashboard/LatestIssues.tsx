import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@/components/ui/table";
import prisma from "@/prisma/client";
import Link from "next/link";
import IssueStatusBadge from "../issues/IssueStatusBadge";
export const dynamic = "force-dynamic";
const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createTime: "desc",
    },
    include: {
      assignedToUser: true,
    },
    take: 5,
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Issues</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>
                  <div className="flex justify-between">
                    <div>
                      <div className="mb-2">
                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                      </div>
                      <IssueStatusBadge status={issue.status} />
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={issue.assignedToUser?.image!}
                        alt="avatar"
                      />
                      <AvatarFallback>
                        {issue.assignedToUser?.name}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LatestIssues;
