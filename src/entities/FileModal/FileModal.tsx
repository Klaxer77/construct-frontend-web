import { useState } from "react";
import { BigButton, FileInput, Icon } from "../../shared";
import { useSendObjectFile } from "../../shared/hooks/useObjects";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  objectId: string;
}

export const FileModal = ({ open, onClose, objectId }: ModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutate: send, isPending } = useSendObjectFile(objectId);

  const handleUpload = () => {
    if (!selectedFile) return;

    send(selectedFile, {
      onSuccess: () => {
        onClose();
        setSelectedFile(null);
      },
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-[20px] px-[20px] py-[24px] flex flex-col gap-[16px] max-w-[463px] w-full">
        <div className="flex justify-between items-center">
          <h2 className="font-[600] text-[22px] leading-[36px] text-blackText">
            Отправить файл
          </h2>
          <button onClick={onClose} className="cursor-pointer">
            <Icon name="Close" />
          </button>
        </div>
        <div className="flex flex-col gap-[16px]">
          {selectedFile && (
            <FileInput label="Файл" icon={<Icon name="File" />} disabled />
          )}
          <FileInput
            label="Файл"
            file={selectedFile}
            icon={<Icon name="File" />}
            onChange={setSelectedFile}
            onClear={() => setSelectedFile(null)}
          />
        </div>

        <BigButton
          text={isPending ? "Отправка..." : "Отправить"}
          onClick={handleUpload}
        />
      </div>
    </div>
  );
};
