//* Libraries imports
import { Person, Shapes, Calendar, MapPin, Question } from "@phosphor-icons/react";

//* Local imports
import { PageTypes } from "../../../types/page";

export default function PageTypeIcon(type: PageTypes) {
  switch (type) {
    case "characters":
      return <Person className="h-8 w-8 text-tertiary-100" size={32} />;
    case "places":
      return <MapPin className="h-8 w-8 text-tertiary-100" size={32} />;
    case "items":
      return <Shapes className="h-8 w-8 text-tertiary-100" size={32} />;
    case "events":
      return <Calendar className="h-8 w-8 text-tertiary-100" size={32} />;
    default:
      return <Question className="h-8 w-8 text-tertiary-100" size={32} />;
  }
}
