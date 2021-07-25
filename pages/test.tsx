import { useState } from "react";

export default function Test() {
  const [users, setUsers] = useState([
    {
      name: "hoge",
      age: 12,
    },
    ,
    {
      name: "piyo",
      age: 23,
    },
  ]);

  const addUser = () => {
    const newUser = {
      name: "jellyfish",
      age: 34,
    };
  };
  return (
    <div>
      {users.map((user, i) => (
        <div key={i}>
          {user.name} : {user.age}
        </div>
      ))}
      <button className="bg-blue-300" onClick={addUser}>
        click me
      </button>
    </div>
  );
}
