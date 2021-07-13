import React, { useState } from "react";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// import Users from "./users";

export default function query() {
  useEffect(() => {
    // fetchUsers().then((data) => {
    //   setUsers(data);
    // });
  }, []);

  const [isShow, setIsShow] = useState(true);

  const queryClient = new QueryClient();

  const fetchUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    return await res.json();
  };

  const Users = () => {
    const { data, isLoading, isError, error, status } = useQuery(
      "users",
      fetchUsers,
      {
        cacheTime: 1000 * 60,
      }
    );
    console.log(status);

    if (isLoading) {
      return <h1>loading...</h1>;
    }
    if (isError) {
      return <h1> Error:{error.message} </h1>;
    }

    return (
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <button onClick={() => setIsShow(!isShow)}>hoge</button>

        {isShow && <Users />}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
