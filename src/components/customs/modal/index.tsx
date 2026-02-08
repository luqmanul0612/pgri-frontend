import * as Dialog from "@radix-ui/react-dialog";
import "./modal.scss";
import { FC } from "react";
import { ModalProps } from "./modal.type";
import { X } from "lucide-react";

const Modal: FC<ModalProps> = (props) => {
  const { open, onClose, children, title, width = "300px" } = props;
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content" style={{ maxWidth: width }}>
          <div className="modal-header">
            <Dialog.Title className="dialog-title">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button className="modal-close-button" aria-label="Close">
                <X className="modal-close-icon" />
              </button>
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
