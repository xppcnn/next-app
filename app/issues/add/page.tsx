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
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { formSchema } from "@/app/api/issues/schema";
import { z } from "zod";
import Spinner from "@/components/ui/spinner";

type IssueForm = z.infer<typeof formSchema>;

const AddIssuePage = () => {
  const form = useForm<IssueForm>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (params: IssueForm) => {
    setLoading(true);
    const response = await fetch("/api/issues", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(params),
    });
    const { code } = await response.json();
    setLoading(false);
    if (code === 200) {
      router.push("/issues");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-xl"
      >
        <FormField
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

export default AddIssuePage;
