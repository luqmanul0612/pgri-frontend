import classNames from "./required.module.scss";

interface Props {
  children: React.ReactNode;
}

const Required: React.FC<Props> = ({ children }) => {
  return (
    <>
      {children} <span className={classNames.required}>*</span>
    </>
  );
};

export default Required;
