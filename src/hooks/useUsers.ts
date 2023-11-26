import React from "react";
import { User } from "interfaces/user";
import { apiCall } from "utils/axios";

export const useUsers = (
  size = 20
): {
  users: User[];
  loading: boolean;
  error: any;
} => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const getUsers = async () => {
      try {
        const data = (await apiCall("GET", `/?results=${size}`)) as any;
        const results: User[] = data?.results;

        setUsers(results);
        setLoading(false);
      } catch (error: any) {
        console.error(error.message);
        setLoading(false);
        setError(error.message);
      }
    };

    getUsers();
  }, [size]);

  return { users, loading, error };
};
