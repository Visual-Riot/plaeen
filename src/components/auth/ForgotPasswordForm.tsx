"use client";

import Link from "next/link";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { login } from "@/actions/login";
import { FormError } from "@/components/forms/FormError";
import { FormSuccess } from "@/components/forms/FormSuccess";

export const ForgotPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        if (data) {
          setError(data.error);
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <CardWrapper
      header="Forgot your password?"
      headerLabel="asdd"
      backButtonHref="/login"
      backButtonLabel="Back to login"
      showSocial
      showTerms
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Email Address"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="link"
                className="font-light pl-0"
                size="sm"
                asChild
              >
                <Link href="/forgot-password">change text here</Link>
              </Button>
            </div>
          </div>
          <Button
            size="full"
            className="font-bold text-md"
            type="submit"
            disabled={isPending}
          >
            Login
          </Button>
          <FormSuccess message={success} />
          <FormError message={error} />
        </form>
      </Form>
    </CardWrapper>
  );
};
