"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      setLoading(false);
      return;
    }
    async function fetchUser() {
      try {
        const res = await fetch("/api/user/me");

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();

        setUser(data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [status]);

  return {
    user,
    loading,
  };
}
