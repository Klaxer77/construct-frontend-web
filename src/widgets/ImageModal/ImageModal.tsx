interface ModalProps {
  imageSrc: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ModalProps> = ({ imageSrc, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose} 
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh] p-4 bg-white rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="cursor-pointer absolute top-2 right-2 text-white bg-blue rounded-full w-8 h-8 flex justify-center items-center"
          onClick={onClose}
        >
          ✕
        </button>
        <img
          src={imageSrc}
          alt="photo"
          className="max-w-full max-h-[80vh] object-contain rounded"
        />
      </div>
    </div>
  );
};
