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
  FormLabel,
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
import { BackButton } from "./BackButton";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlOAuthError = searchParams.get('error') === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : ""

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
      header="Welcome back!"
      headerLabel="Get ready for your next gaming session"
      backButtonHref="/signup"
      backButtonLabel="Need an account? Sign up"
      showSocial
      showTerms
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="mario_bros@gmail.com"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="••••••••"
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
                <Link href="/forgot-password">Forgot your password?</Link>
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
          <FormError message={error || urlOAuthError} />
        </form>
      </Form>
    </CardWrapper>
  );
};
