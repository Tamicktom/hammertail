//* Libraries imports
import { Sidebar } from "@phosphor-icons/react";
import { useAtom } from "jotai";

//* Atom imports
import { setSidebarState, sidebarCollapseAtom } from "../../../atoms/sidebar";

/**
 * Renders a button that toggles the sidebar collapse state and updates the sidebar state.
 * @returns JSX.Element
 */

export default function ToggleSidebarButton() {
  const [sidebarCollapse, setSidebarCollapse] = useAtom(sidebarCollapseAtom);

  function toggleSidebar() {
    setSidebarCollapse(() => !sidebarCollapse);
    setSidebarState(!sidebarCollapse);
  }

  return (
    <button
      className="w-5 h-5 rounded-full"
      name="sidebarCollapse"
      aria-label="sidebarCollapse"
      onClick={toggleSidebar}
      children={<Sidebar className="w-5 h-5 text-neutral-500" />}
    />
  );
}