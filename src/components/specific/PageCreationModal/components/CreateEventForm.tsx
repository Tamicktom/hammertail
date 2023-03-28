//* Libraries imports
import { useState } from "react";
import toast from "react-hot-toast";

//* Hooks imports
import { useGetPagesByType } from "../../../../hooks/common/useGetPagesByType";

//* Utis imports
import Sucess from "../../../Toasts/Sucess";
import Danger from "../../../Toasts/Danger";
import type { Event } from "../../../../types/page";

type Props = {
  worldId: string;
}

export default function CreateEventForm(props: Props) {
  const [event, setEvent] = useState<Event>({
    name: "",
    description: "",
    birthYear: 0,
    deathYear: 0,
    other: {},
  });

  const data = useGetPagesByType(props.worldId, "events");

  const handleEventCreation = () => {
    const body = {
      worldId: props.worldId,
      action: "createPage",
      typeOfPage: "events",
      pageData: event,
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
        onChange={(e) => { setEvent({ ...event, name: e.target.value }) }}
      />

      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        onChange={(e) => { setEvent({ ...event, description: e.target.value }) }}
      />

      <label htmlFor="birthYear">Stat year</label>
      <input
        type="number"
        name="birthYear"
        id="birthYear"
        onChange={(e) => { setEvent({ ...event, birthYear: Number(e.target.value) }) }}
      />

      <label htmlFor="deathYear">End year</label>
      <input
        type="number"
        name="deathYear"
        id="deathYear"
        onChange={(e) => { setEvent({ ...event, deathYear: Number(e.target.value) }) }}
      />

      <button
        onClick={handleEventCreation}
      >
        Create character
      </button>
    </div>
  );
}