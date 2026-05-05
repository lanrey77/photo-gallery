import { useForm } from "react-hook-form";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    login(data.email);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 space-y-4"
    >
      <input
        {...register("email")}
        placeholder="Email"
        className="w-full border p-2"
      />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="w-full border p-2"
      />
      <button className="bg-black text-white w-full p-2">
        Login
      </button>
    </form>
  );
}