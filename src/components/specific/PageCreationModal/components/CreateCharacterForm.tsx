//* Libraries imports
import { useState } from "react";
import toast from "react-hot-toast";

//* Hooks imports
import { useGetPagesByType } from "../../../../hooks/common/useGetPagesByType";

//* Utis imports
import Sucess from "../../../Toasts/Sucess";
import Danger from "../../../Toasts/Danger";
import type { Character } from "../../../../types/page";

type Props = {
  worldId: string;
}

export default function CreateCharacterForm(props: Props) {
  const [character, setCharacter] = useState<Character>({
    name: "",
    description: "",
    birthYear: 0,
    deathYear: 0,
    other: {},
  });

  const data = useGetPagesByType(props.worldId, "characters");

  const handleCharacterCreation = () => {
    const body = {
      worldId: props.worldId,
      action: "createSpecificPage",
      typeOfPage: "characters",
      pageData: character,
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
        data.refetch();
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