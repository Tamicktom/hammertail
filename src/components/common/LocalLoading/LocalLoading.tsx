//* Libraies imports
import { CircleNotch } from "phosphor-react"

type Props = {}

export default function LocalLoading({ }: Props) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <CircleNotch size={64} className="text-white animate-spin" />
    </div>
  )
}