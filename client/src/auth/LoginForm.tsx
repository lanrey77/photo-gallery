import { useForm } from "react-hook-form";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    login(data.email);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-5"
      >
        <h2 className="text-xl font-semibold text-center">
          Login
        </h2>

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}