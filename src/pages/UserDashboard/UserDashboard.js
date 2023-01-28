import { useState, useEffect } from "react";

export default function UserDashboard({ user }) {
  const [currentUserLinks, setCurrentUserLinks] = useState(null);

  const getUserData = async () => {
    try {
      const response = await fetch(`api/users/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCurrentUserLinks(data.links);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return <>Hey, {user.name}! Your cat sucks.</>;
}
