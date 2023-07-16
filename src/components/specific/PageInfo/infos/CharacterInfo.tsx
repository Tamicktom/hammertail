//* Libraries imports
import { useState, useEffect } from "react";
import Image from "next/image";
import { Cake, Skull } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import colors from "tailwindcss/colors";

//* Hooks Imports
import usePage, { type PageWorld } from "../../../../hooks/queries/usePage";
import useUpdatePageDate from "../../../../hooks/mutations/useUpdatePageDate";
import useDebounce from "../../../../hooks/common/useDebounce";

export default function CharacterInfo() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  return (
    <div className="">
      <div className='flex items-center justify-center w-full'>
        <Image
          src="https://th.bing.com/th/id/OIP.t3SF3TpmOxVWm-e-QnojAQHaLH?pid=ImgDet&rs=1"
          alt="Imagem do personagem"
          className="w-80 rounded-lg border border-neutral-700"
          width={320}
          height={320}
          priority
          placeholder="blur"
          blurDataURL="https://i.pinimg.com/564x/bb/14/18/bb1418129cfc0b35f874d249bb5ff9e6.jpg"
        />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div className='w-full'>
          <span className='text-lg font-bold text-white'>Mage of Cats</span>
        </div>
        <StartEndDate
          pageId={page.data?.id || ""}
          startDate={page.data?.start || 0}
          endDate={page.data?.end || 0}
          page={page.data}
        />
      </div>
    </div>
  );
}

type StartEndDateProps = {
  pageId: string;
  startDate: number;
  endDate: number;
  page?: PageWorld;
}

function StartEndDate(props: StartEndDateProps) {
  const [isEditingStartDate, setIsEditingStartDate] = useState(false);
  const [isStartDateInvalid, setIsStartDateInvalid] = useState(false);

  const [isEditingEndDate, setIsEditingEndDate] = useState(false);
  const [isEndDateInvalid, setIsEndDateInvalid] = useState(false);
  const [pageDate, setPageDate] = useState({
    start: props.startDate,
    end: props.endDate
  });
  const debouncedStartDate = useDebounce(pageDate, 1200);
  const useUpdatePageDateMutation = useUpdatePageDate();

  useEffect(() => {
    useUpdatePageDateMutation.mutate({
      pageId: props.pageId,
      start: debouncedStartDate.start,
      end: debouncedStartDate.end,
    })
  }, [debouncedStartDate]);

  return (
    <div className='flex flex-col w-full gap-2'>
      <Input
        isEditing={isEditingStartDate}
        setIsEditing={setIsEditingStartDate}
        isInvalid={isStartDateInvalid}
        defaultValue={props.startDate}
        onChange={(value) => {
          const worldStartDate = props.page?.world?.start || 0;
          const worldEndDate = props.page?.world?.end || 0;
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
        defaultValue={props.endDate}
        onChange={(value) => {
          const worldStartDate = props.page?.world?.start || 0;
          const worldEndDate = props.page?.world?.end || 0;
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