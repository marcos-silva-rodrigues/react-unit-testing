import { useState } from "react";

type ListProps = {
  initialItems: string[];
}

export function List({ initialItems }: ListProps) {
  const [list, setList] = useState(initialItems);
  const [newItem, setNewItem] = useState("");

  function addToList() {
    setTimeout(() => {
      setList((state) => [...state, newItem]);
      setNewItem("");
    }, 500);
  }

  function removeFormList(name: string) {
    setTimeout(() => {
      setList(state => state.filter(item => item !== name));
    }, 500);
  }

  return (
    <>
      <input
        type="text"
        placeholder="Novo item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addToList}>Adicionar</button>
      <ul>
        {list.map((name) => {
          return <li key={name}>
            {name}
              <button onClick={() => removeFormList(name)}>Remover</button>
            </li>;
        })}
      </ul>
    </>
  );
}
