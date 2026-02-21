import useModalUnderDevelopment from "@/store/use-modal-underdevelopment";
import { MdAdd } from "react-icons/md";

const HeaderRole: React.FC<any> = (props: any) => {
  return (
    <div>
      <div className={"flex items-center gap-4 py-5"}>
        <p className={"font-semibold text-primary"}>Role Admin</p>
        <button
          className={
            "flex flex-row items-center justify-center gap-1 rounded-lg border border-primary px-4 py-2 text-sm text-primary"
          }
        >
          <MdAdd size={18} />
          <span
            onClick={() =>
              useModalUnderDevelopment
                .getState()
                .setOpenModalUnderDevelopment(true)
            }
          >
            Tambah Role
          </span>
        </button>
      </div>
    </div>
  );
};
export default HeaderRole;
