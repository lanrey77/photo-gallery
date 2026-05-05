import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const username = user?.email?.split("@")[0];

  return (
    <nav className="w-full border-b bg-white px-6 py-3 flex items-center justify-between">
      <Link to="/" className="font-semibold text-lg">
        Photo Gallery
      </Link>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <span className="text-sm text-gray-600">{username}</span>

            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1 border rounded hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
