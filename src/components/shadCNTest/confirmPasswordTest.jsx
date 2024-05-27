import { useRef } from "react";
import { useForm } from "react-hook-form";

export const PasswordForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm({});
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit(onSubmit)}>
      <label>Password</label>
      <input className="border"
        type="password"
        {...register("password", {
          required: "You must specify a password",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters"
          }
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <label>Confirm Password</label>
      <input className="border"
        type="password"
        {...register("password_repeat", {
          validate: (value) =>
            value === password.current || "The passwords do not match"
        })}
      />
      {errors.password_repeat && <p>{errors.password_repeat.message}</p>}

      <button
        type="submit"
        value="submit"
        className="py-1 px-2 rounded border">
        Submit
      </button>
    </form>
  );
};
