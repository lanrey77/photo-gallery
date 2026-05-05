import { useEffect, useState } from "react";
import { getUser } from "../api/api";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUser(id!, isLoggedIn).then(setUser);
  }, [id, isLoggedIn]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2>{user.name}</h2>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {user.images.map((img: any) => (
          <img key={img.id} src={img.url} />
        ))}
      </div>
    </div>
  );
}