//* Libraries imports
import { useState } from "react";
import toast from "react-hot-toast";

//* Hooks imports
import { useGetPagesByType } from "../../../../hooks/common/useGetPagesByType";

//* Utis imports
import Sucess from "../../../Toasts/Sucess";
import Danger from "../../../Toasts/Danger";
import type { Item } from "../../../../types/page";

type Props = {
  worldId: string;
}

export default function CreateItemForm(props: Props) {
  const [item, setItems] = useState<Item>({
    name: "",
    description: "",
    birthYear: 0,
    deathYear: 0,
    other: {},
  });

  const data = useGetPagesByType("items", props.worldId);

  const handleItemCreation = () => {
    const body = {
      worldId: props.worldId,
      action: "createPage",
      typeOfPage: "items",
      pageData: item,
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
        onChange={(e) => { setItems({ ...item, name: e.target.value }) }}
      />

      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        onChange={(e) => { setItems({ ...item, description: e.target.value }) }}
      />

      <label htmlFor="birthYear">Birth year</label>
      <input
        type="number"
        name="birthYear"
        id="birthYear"
        onChange={(e) => { setItems({ ...item, birthYear: Number(e.target.value) }) }}
      />

      <label htmlFor="deathYear">Death year</label>
      <input
        type="number"
        name="deathYear"
        id="deathYear"
        onChange={(e) => { setItems({ ...item, deathYear: Number(e.target.value) }) }}
      />

      <button
        onClick={handleItemCreation}
      >
        Create character
      </button>
    </div>
  );
}