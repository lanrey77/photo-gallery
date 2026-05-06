import { useEffect, useState } from "react";
import { getUsers } from "../api/api";
import { Link } from "react-router-dom";
import type { User } from "../interfaces/users";
import { useAuth } from "../auth/AuthContext";

export default function Home() {
  const { isLoggedIn } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetchUsers = async () => {
      setLoading(true);

      try {
        const data = await getUsers(location);
        if (!ignore) setUsers(data);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      ignore = true;
    };
  }, [location]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Photographers</h1>

        {!isLoggedIn && (
          <select
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All Locations</option>
            <option value="Suffolk">Suffolk</option>
            <option value="Norfolk">Norfolk</option>
            <option value="Epping">Epping</option>
          </select>
        )}
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse border rounded-lg p-4 space-y-3"
            >
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {!loading && users.length === 0 && (
        <p className="mt-6 text-gray-500">No users found.</p>
      )}

      {!loading && users.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-6">
          {users.map((u) => (
            <Link to={`/user/${u.id}`} key={u.id}>
              <div className="border rounded-lg p-5 hover:shadow-lg transition cursor-pointer bg-white">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-3">
                  {u.name.charAt(0)}
                </div>

                <h3 className="font-semibold text-lg">{u.name}</h3>

                <p className="text-sm text-gray-500">{u.location}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
