//* Libraries imports
import { useState } from "react";
import toast from "react-hot-toast";

//* Hooks imports
import useGetPagesByType from "../../../../hooks/common/useGetPagesByType";

//* Utis imports
import Sucess from "../../../Toasts/Sucess";
import Danger from "../../../Toasts/Danger";
import type { Place } from "../../../../types/page";

type Props = {
  worldId: string;
}

export default function CreatePlaceForm(props: Props) {
  const [place, setPlace] = useState<Place>({
    name: "",
    description: "",
    birthYear: 0,
    deathYear: 0,
    other: {},
  });

  const data = useGetPagesByType("places", props.worldId);

  const handlePlaceCreation = () => {
    const body = {
      worldId: props.worldId,
      action: "createPage",
      typeOfPage: "places",
      pageData: place,
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
            topMsg="Place created successfully"
            bottomMsg="You can now add it to your world"
          />
        ));
        data.refetch();
      }
    }).catch((error) => {
      toast.custom((t) => (
        <Danger
          t={t}
          topMsg="Error while creating place"
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
        onChange={(e) => { setPlace({ ...place, name: e.target.value }) }}
      />

      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        onChange={(e) => { setPlace({ ...place, description: e.target.value }) }}
      />

      <label htmlFor="birthYear">Fundation year</label>
      <input
        type="number"
        name="birthYear"
        id="birthYear"
        onChange={(e) => { setPlace({ ...place, birthYear: Number(e.target.value) }) }}
      />

      <label htmlFor="deathYear">Death year</label>
      <input
        type="number"
        name="deathYear"
        id="deathYear"
        onChange={(e) => { setPlace({ ...place, deathYear: Number(e.target.value) }) }}
      />

      <button
        onClick={handlePlaceCreation}
      >
        Create Place
      </button>
    </div>
  );
}