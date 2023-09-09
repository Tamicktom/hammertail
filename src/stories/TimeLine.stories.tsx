//* Import component
import React from "react";
import TimeLine from "../components/common/TimeLine";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

//* Import css
import "../styles/globals.css";

const queryClient = new QueryClient();

const meta = {
  title: "Example/TimeLine",
  component: () => {
    return (
      <QueryClientProvider client={queryClient}>
        <TimeLine />
      </QueryClientProvider>
    );
  },
  tags: ["autodocs"],
  argTypes: {

  }
}

export default meta;

export const Primary = {
  args: {
  },
};
