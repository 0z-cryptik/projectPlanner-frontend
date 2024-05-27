import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useRef } from "react";

export const ProfileForm = () => {
  const formSchema = z
    .object({
      password: z
        .string()
        .min(5, { message: "password must be at least 5 characters" }),
      confirmPassword: z.string()
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ["confirmPassword"]
        });
      }
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 ml-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-4">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="password"
                  name="password"
                  className="w-1/4 border"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-4">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="password"
                  name="confirmPassword"
                  className="w-1/4 border"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          value="submit"
          type="submit"
          className="p-2 border rounded">
          Submit
        </button>
      </form>
    </Form>
  );
};
