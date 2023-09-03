//* Libraries imports
import { useState, useEffect } from "react";
import { Cake, Skull } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import colors from "tailwindcss/colors";

//* Hooks Imports
import useUpdatePageDate from "../../../hooks/mutations/useUpdatePageDate";
import useDebounce from "../../../hooks/common/useDebounce";
import usePage from "../../../hooks/queries/usePage";
import type { PageWorld } from "../../../hooks/queries/usePage";

type StartEndDateProps = {
}

export default function StartEndDate(props: StartEndDateProps) {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  const [isEditingStartDate, setIsEditingStartDate] = useState(false);
  const [isStartDateInvalid, setIsStartDateInvalid] = useState(false);

  const [isEditingEndDate, setIsEditingEndDate] = useState(false);
  const [isEndDateInvalid, setIsEndDateInvalid] = useState(false);
  const [pageDate, setPageDate] = useState({
    start: page.data?.start || 0,
    end: page.data?.end || 0,
  });
  const debouncedStartDate = useDebounce(pageDate, 1200);
  const useUpdatePageDateMutation = useUpdatePageDate();

  useEffect(() => {
    if (!page.isLoading) {
      useUpdatePageDateMutation.mutate({
        pageId: page.data?.id || "",
        start: debouncedStartDate.start,
        end: debouncedStartDate.end,
      })
    }
  }, [debouncedStartDate]);

  return (
    <div className='flex flex-col w-full gap-0'>
      <p className="text-neutral-300 text-sm">
        Birth and Death years
      </p>
      <Input
        isEditing={isEditingStartDate}
        setIsEditing={setIsEditingStartDate}
        isInvalid={isStartDateInvalid}
        defaultValue={page.data?.start || 0}
        onChange={(value) => {
          const worldStartDate = page.data?.world?.start || 0;
          const worldEndDate = page.data?.world?.end || 0;
          if (value < worldStartDate || value > worldEndDate || value > pageDate.end)
            setIsStartDateInvalid(true);
          else
            setIsStartDateInvalid(false);

          setPageDate({ ...pageDate, start: value })
        }}
        icon={<Cake
          size={32}
          color={isEditingStartDate ? colors.white : colors.neutral[300]}
          className="transition-all duration-300"
        />}
      />
      <Input
        isEditing={isEditingEndDate}
        setIsEditing={setIsEditingEndDate}
        isInvalid={isEndDateInvalid}
        defaultValue={page.data?.end || 0}
        onChange={(value) => {
          const worldStartDate = page.data?.world?.start || 0;
          const worldEndDate = page.data?.world?.end || 0;
          if (value < worldStartDate || value > worldEndDate || value < pageDate.start)
            setIsEndDateInvalid(true);
          else
            setIsEndDateInvalid(false);

          setPageDate({ ...pageDate, end: value })
        }}
        icon={<Skull
          size={32}
          color={isEditingEndDate ? colors.white : colors.neutral[300]}
          className="transition-all duration-300"
        />}
      />
    </div>
  );
}

type InputProps = {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  isInvalid: boolean;
  defaultValue: number;
  onChange: (value: number) => void;
  icon: JSX.Element;
}

function Input(props: InputProps) {
  const borderBottomIsEditing = props.isEditing ? `1px solid ${colors.neutral[600]}` : `1px solid transparent`;
  const borderBottom = props.isInvalid ? `1px solid ${colors.yellow[600]}` : borderBottomIsEditing;

  return (
    <div className='flex flex-row w-full gap-2 items-center'>
      {props.icon}
      <input
        className='text-lg bg-transparent outline-none w-full rounded-lg px-2 py-1 transition-all duration-300'
        type="number"
        style={{
          color: props.isEditing ? colors.neutral[50] : colors.neutral[300],
          borderBottom: borderBottom,
        }}
        defaultValue={props.defaultValue}
        onChange={(e) => {
          const value = parseInt(e.target.value.trim().replace("e", ""))
          props.onChange(value)
        }}
        onBlur={() => props.setIsEditing(false)}
        onFocus={() => props.setIsEditing(true)}
      />
    </div>
  );
}