import { FC } from "react";
import WA from "../../../public/assets/wa";

interface WAButtonProps {}

export const WAButton: FC<WAButtonProps> = ({}) => {
  return (
    <div className="absolute bottom-[15vh] right-0 flex h-12 items-center justify-center rounded-bl-[50px] rounded-tl-[50px] bg-[#17a3b8] px-4 shadow">
      <div className="flex items-center justify-start">
        <WA />
      </div>
    </div>
  );
};
