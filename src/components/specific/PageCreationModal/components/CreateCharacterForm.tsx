//* Libraries imports
import { useState } from "react";
import toast from "react-hot-toast";

//* Utis imports
import Sucess from "../../../Toasts/Sucess";
import Danger from "../../../Toasts/Danger";

type Character = {
  name: string;
  description: string;
  birthYear: number;
  deathYear: number;
}

type Props = {
  worldId: string;
}

export default function CreateCharacterForm(props: Props) {
  const [character, setCharacter] = useState<Character>({
    name: "",
    description: "",
    birthYear: 0,
    deathYear: 0,
  });

  const handleCharacterCreation = () => {
    const body = {
      worldId: props.worldId,
      action: "createPage",
      typeOfPage: "characters",
      character,
    }

    fetch("/api/pages", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response) => {
      if (response.status === 200) {
        toast.custom((t) => (
          <Sucess
            t={t}
            topMsg="Character created successfully"
            bottomMsg="You can now add it to your world"
          />
        ));
      }
    }).catch((error) => {
      toast.custom((t) => (
        <Danger
          t={t}
          topMsg="Error while creating character"
          bottomMsg={error.error || "Please try again later"}
        />
      ));
    });
  }

  return (
    <div className='flex flex-col justify-center items-start gap-2'>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={(e) => { setCharacter({ ...character, name: e.target.value }) }}
      />

      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        onChange={(e) => { setCharacter({ ...character, description: e.target.value }) }}
      />

      <label htmlFor="birthYear">Birth year</label>
      <input
        type="number"
        name="birthYear"
        id="birthYear"
        onChange={(e) => { setCharacter({ ...character, birthYear: Number(e.target.value) }) }}
      />

      <label htmlFor="deathYear">Death year</label>
      <input
        type="number"
        name="deathYear"
        id="deathYear"
        onChange={(e) => { setCharacter({ ...character, deathYear: Number(e.target.value) }) }}
      />

      <button
        onClick={handleCharacterCreation}
      >
        Create character
      </button>
    </div>
  );
}