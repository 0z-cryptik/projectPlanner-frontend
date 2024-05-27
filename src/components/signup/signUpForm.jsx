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
import { PasswordField } from "./passwordField";
import { SignUpButton } from "./signUpButton";
import { Footer } from "./footer";

export const SignUpForm = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser, setProcessingUser } = useList();

  const formSchema = z
    .object({
      name: z
        .string()
        .regex(
          /^[a-zA-Z0-9]*$/,
          "Password can only contain letters and numbers"
        )
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
      const signupResponse = await fetchData("/api/user/signup", data2submit);
      if (signupResponse.success) {
        const loginResponse = await fetchData("/api/user/login", {
          email: values.email,
          password: values.password
        });
  
        if (loginResponse.user) {
          setUser(signupResponse.data);
          navigate("/workspace");
        }
      } else {
        setError(true);
        setErrorMsg(signupResponse.reason);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setProcessingUser(false);
    }
  };
  
  const fetchData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });
    return res.json();
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
                    className="border rounded h-[2.8rem] px-2 text-sm outline-[#afafef] lg:border-[#cdd6fe] lg:outline-none lg:border-2"
                    type="text"
                    placeholder="Enter your name or nickname"
                    required
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
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
                    className="border rounded h-[2.8rem] px-2 text-sm outline-[#afafef] lg:border-[#cdd6fe] lg:outline-none lg:border-2"
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
                  <PasswordField field={field} />
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
                    className="border rounded h-[2.8rem] px-2 text-sm outline-[#afafef] lg:border-[#cdd6fe] lg:border-2 lg:outline-none"
                    type="password"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SignUpButton />
        </form>
      </Form>

      <Footer
        error={error}
        errorMsg={errorMsg}
      />
    </section>
  );
};
