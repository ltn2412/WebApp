import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
  email: z.string().email("Invalid email")
});

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (data.password != data.confirmPassword)
      setError("confirmPassword", { message: "Confirm password not match" })
  };

  return (
    <div className="max-w-md bg-background p-6 rounded-2xl shadow-lg">
      <p className="text-2xl font-semibold text-center mb-4">Sign up</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <label className="text-white">Username:</label>
          <input
            type="text"
            {...register("username")}
            className="w-full px-3 py-2 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary"
            onInput={() => clearErrors()}
          />
          {errors.username && <p className="my-2 text-red-500 text-sm">{errors.username.message}</p>}
        </div>
        <div>
          <label className="block text-white">Password:</label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary"
            onInput={() => clearErrors()}
          />
          {errors.password && <p className="my-2 text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <div>
          <label className="block text-white">Confirm Password:</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full px-3 py-2 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary"
            onInput={() => clearErrors()}
          />
          {errors.confirmPassword && <p className="my-2 text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>
        <div>
          <label className="block text-white">Email:</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary"
            onInput={() => clearErrors()}
          />
          {errors.email && <p className="my-2 text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        {errors.root && <p className="my-2 text-red-500 text-sm">{errors.root.message}</p>}
        <div className="flex justify-center items-center">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

