import { useEffect, useState } from "react";
import { getUser } from "../api/api";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Lightbox from "../components/Lightbox";
import type { User } from "../interfaces/users";

export default function Profile() {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;

    getUser(id, isLoggedIn).then(setUser);
  }, [id, isLoggedIn]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2>{user.name}</h2>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {user.images.map((img, i) => (
          <img
            key={img.id}
            src={img.url}
            className="cursor-pointer hover:opacity-80"
            onClick={() => setSelectedIndex(i)}
            alt={`Photo ${i + 1}`}
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <Lightbox
          images={user.images}
          startIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </div>
  );
}
