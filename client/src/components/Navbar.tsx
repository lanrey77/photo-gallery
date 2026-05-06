import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const username = user?.email?.split("@")[0];

  const isLoginPage = location.pathname === "/login";

  return (
    <nav
      className=" sticky top-0 z-50  w-full border-b bg-gradient-to-r from-white via-gray-50 to-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm px-6 py-3 flex items-center justify-between"
    >
      <Link to="/" className="font-semibold text-lg">
        Photo Gallery
      </Link>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <span className="text-sm text-gray-600">{username}</span>

            <button
              onClick={handleLogout}
              aria-label="Logout user"
              className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {!isLoginPage && (
              <Link
                to="/login"
                aria-label="Login user"
                className="px-3 py-1 border rounded hover:bg-gray-100 transition"
              >
                Login
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
