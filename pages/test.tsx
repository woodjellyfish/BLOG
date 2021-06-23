import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

const Edit = ({ onSubmit, value }) => {
  const text = useRef("");
  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(text.current);
      onSubmit({ ...value, name: text.current });
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(`onchange:`, e.target.value);
    text.current = e.target.value;
  };

  return <input type="text" onKeyPress={onKeyPress} onChange={onChange} />;
};

const test = () => {
  const [template, setTemplate] = useState({
    id: 0,
    name: "",
  });

  const save = () => {
    const json = JSON.stringify(template);

    localStorage.setItem("obj", json);
  };

  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem("obj"));
    setTemplate(obj);
  }, []);

  return (
    <>
      <h1>
        {template.name}:{template.id}
      </h1>
      <Edit onSubmit={setTemplate} value={template} />
      <button onClick={save}>save</button>
    </>
  );
};

export default test;
