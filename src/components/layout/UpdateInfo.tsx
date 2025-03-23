import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  gender: z.enum(["male", "female", "other"]),
  isSeller: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

export default function UpdateInfo() {
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
    console.log("Form Data:", data);

    // Giả lập gửi API & báo lỗi
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (data.phone === "123456") {
        setError("phone", { message: "Số điện thoại đã tồn tại" });
      }
    } catch (error) {
      setError("root", { message: "Lỗi hệ thống. Vui lòng thử lại!" });
    }
  };

  return (
    <div className="max-w-md bg-background p-6 rounded-2xl shadow-lg">
      <p className="text-2xl font-semibold text-center mb-4">Sign up</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <label className="text-white">Name:</label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-3 py-2 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary"
            onInput={() => clearErrors("name")}
          />
          {errors.name && <p className="my-2 text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-white">Phone number:</label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full px-3 py-2 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary"
            onInput={() => clearErrors("phone")}
          />
          {errors.phone && <p className="my-2 text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-white">Sex:</label>
          <select
            {...register("gender")}
            className="w-full px-3 py-2 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary"
            onInput={() => clearErrors("gender")}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("isSeller")}
            className="mr-2 w-5 h-5 accent-primary"
          />
          <label className="text-white">Seller</label>
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
};

