import { useEffect, useState } from "react";
import { getUsers } from "../api/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    getUsers(location).then(setUsers);
  }, [location]);

  return (
    <div className="p-4">
      <select onChange={e => setLocation(e.target.value)}>
        <option value="">All</option>
        <option value="Suffolk">Suffolk</option>
        <option value="Norfolk">Norfolk</option>
        <option value="Epping">Epping</option>
      </select>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {users.map(u => (
          <Link to={`/user/${u.id}`} key={u.id}>
            <div className="border p-4">
              <h3>{u.name}</h3>
              <p>{u.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}