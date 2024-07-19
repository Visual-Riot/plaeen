"use client";

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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TfiEmail } from "react-icons/tfi";
import { Button } from "../ui/button";

export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <CardWrapper
      header="Login or Sign up"
      headerLabel="Get started for free"
      backButtonHref="/forgot-password"
      backButtonLabel="Forgot password?"
      showSocial
      showTerms
    >
      <Form {...form}>
        <form onSubmit={() => {}} className="space-y-6">
          <div className="space-y-4">
          <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      // disabled={isPending}
                      {...field}
                      placeholder="Email Address"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
              
                  <FormControl>
                    <Input
                      // disabled={isPending}
                      {...field}
                      placeholder="Password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button size="full" className="font-bold text-md" type="submit" 
          // disabled={isPending}
          >
            Continue with email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
