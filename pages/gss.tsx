import { ChangeEvent, useEffect, useState } from "react";
import styles from "./gss.module.css";

const Gss = () => {
  const url =
    "https://script.google.com/macros/s/AKfycbyQYrbGnmP03kKpRrjTD7Hk16iIhGMI1pwQLhzmg3IcR66A4x2ZqI7PdDuBlozFgEY/exec";
  const [users, setUsers] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const obj = await res.json();

        setUsers(obj);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(users);

    setId(getMaxId() + 1);
  }, [users]);

  const inputIdChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setId(Number(e.target.value));
  };

  const inputNameChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const postDataEvent = async () => {
    const postData = JSON.stringify({ id: id, name: name });
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: postData,
      mode: "no-cors",
    });

    const newUsers = [...users];
    newUsers.push({ id: id, name: name });
    setUsers(newUsers);
  };

  const getDataEvent = async () => {
    const query = `?id=${id}`;
    const json = await fetch(url + query).then((res) => res.json());
    setUsers(json);
  };

  const getMaxId = () => {
    const ids = users.map((user) => user.id);
    return Math.max(...ids);
  };

  const Loading = () => {
    return (
      <>
        <p id={styles.loading}></p>
        <p>loading...</p>
      </>
    );
  };

  return (
    <>
      {users[0] ? "" : <Loading />}
      {users.map((user) => (
        <h1 key={user.id}>
          {user.id}:{user.name}
        </h1>
      ))}

      <h2>PostMethod</h2>
      <input
        value={id}
        onChange={inputIdChangeEvent}
        type="number"
        placeholder="id"
      />
      <input
        value={name}
        onChange={inputNameChangeEvent}
        type="text"
        placeholder="name"
      />
      <button onClick={postDataEvent}>add</button>
      <button onClick={getDataEvent}>search</button>
    </>
  );
};

export default Gss;
