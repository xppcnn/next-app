"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function RegisterButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full" disabled={pending} type="submit">
      注册
    </Button>
  );
}
