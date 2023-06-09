import { useEffect, useState } from "react";

export default function ColorPage() {
  const [favoriteColor, setFavoriteColor] = useState(null);

  useEffect(() => {
    const fetchFavoriteColor = async () => {
      try {
        const response = await fetch("/api/users/checkcolor");
        if (response.ok) {
          const data = await response.json();
          const { favoriteColor } = data;
          setFavoriteColor(favoriteColor);
        } else {
          throw new Error("Failed to retrieve user color");
        }
      } catch (error) {
        console.error("Error retrieving user color:", error);
      }
    };

    fetchFavoriteColor();
  }, []);

  return (
    <div>
      <h1>Your Favorite Color is: {favoriteColor}</h1>
    </div>
  );
}
