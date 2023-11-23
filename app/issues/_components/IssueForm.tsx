"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import "easymde/dist/easymde.min.css";
import { formSchema } from "@/app/api/issues/schema";
import { z } from "zod";
import Spinner from "@/components/ui/spinner";
import { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";
import { useSession } from "next-auth/react";

type IssueFormData = z.infer<typeof formSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const form = useForm<IssueFormData>({
    resolver: zodResolver(formSchema),
  });
  const { data: session, update } = useSession();
  console.log("🚀 ~ file: IssueForm.tsx:31 ~ IssueForm ~ session:", session);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (params: IssueFormData) => {
    setLoading(true);
    let response;
    if (issue) {
      response = await fetch("/api/issues/" + issue.id, {
        method: "PUT",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(params),
      });
    } else {
      response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(params),
      });
    }

    const { code } = await response.json();
    setLoading(false);
    if (code === 200) {
      router.push("/issues");
      router.refresh();
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-xl"
      >
        <FormField
          defaultValue={issue?.title}
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={issue?.description}
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <SimpleMDE {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          Submit
          {loading && <Spinner className="ml-2" />}
        </Button>
      </form>
    </Form>
  );
};

export default IssueForm;
