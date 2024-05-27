import { useState } from "react";
import { useNavigate } from "react-router";
import { useList } from "../../hooks/stateProvider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

export const SignUpForm = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser, setProcessingUser } = useList();

  const formSchema = z
    .object({
      name: z
        .string()
        .min(2, { message: "must have at least 2 characters" }),
      email: z.string().email(),
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
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const navigate = useNavigate();

  const submitHandler = async (values) => {
    setProcessingUser(true);

    const data2submit = {
      email: values.email,
      password: values.password,
      name: values.name,
      avatar: `https://api.dicebear.com/8.x/initials/svg?seed=${values.name}`
    };

    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        body: JSON.stringify(data2submit),
        headers: { "Content-Type": "application/json" }
      });

      const response = await res.json();
      console.log(response);
      if (response.success) {
        setUser(response.data);
        setProcessingUser(false);
        navigate("/workspace");
      } else if (!response.success) {
        setProcessingUser(false);
        setError(true);
        setErrorMsg(response.reason);
      }
    } catch (err) {
      console.error(err);
      setError(true);
      setProcessingUser(false);
    }
  };

  return (
    <section className="lg:h-screen lg:w-1/2 flex flex-col items-center justify-center py-2 my-auto">
      <h1 className="text-4xl max-lg:w-[60%] lg:text-xl font-semibold lg:font-bold">
        Create your account
      </h1>
      <Form {...form}>
        <form
          className="flex flex-col gap-y-3 w-[65%] max-lg:mt-[2.5rem]"
          onSubmit={form.handleSubmit(submitHandler)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2 font-extralight">
                  Your name
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="border rounded h-[2.8rem] px-2 text-sm outline-[#afafef] lg:outline-[#cdd6fe]"
                    type="text"
                    placeholder="Enter your name or nickname"
                    required
                    autoFocus
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2 font-extralight">
                  Email Address
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="border rounded h-[2.8rem] px-2 text-sm outline-[#afafef] lg:outline-[#cdd6fe]"
                    type="email"
                    required
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
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2 font-extralight">
                  Password
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="border rounded h-[2.8rem] px-2 text-sm outline-[#afafef] lg:outline-[#cdd6fe]"
                    type="password"
                    required
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
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2 font-extralight">
                  Confirm password
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="border rounded h-[2.8rem] px-2 text-sm outline-[#afafef] lg:outline-[#cdd6fe]"
                    type="password"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            className="bg-[#3c2048] lg:bg-[#7a82e0] lg:hover:bg-[#cdd6fe] text-white hover:text-black h-[2.8rem] mt-3 rounded"
            type="submit"
            value="submit">
            Sign Up
          </button>
        </form>
      </Form>

      <p className="text-sm mt-5">
        Already have an account?{" "}
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="text-[#483ec3] lg:text-[#7a82e0]">
          Login
        </button>
      </p>
      {error && errorMsg && <p>{errorMsg}</p>}
      {error && (
        <p>unexpected error, please refresh the page and try again</p>
      )}
    </section>
  );
};
