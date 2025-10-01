import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BigButton, Icon } from "../../shared";
import { useNavigate } from "react-router";
import { useContractors } from "../../shared/hooks/useAuth";

interface Contractor {
  id: string;
  using_id: number;
  avatar: string;
  is_active: boolean;
  email: string;
  fio: string;
  role: string;
  company: {
    id: string;
    title: string;
  };
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  objectId: string;
}

export const ContractorModal = ({
  open,
  onClose,
  name,
  objectId,
}: ModalProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<{
    fio: string;
    id: string;
    company: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: contractors } = useContractors();

  const navigate = useNavigate();

  if (!open) return null;

  const handleSelect = (contractor: Contractor) => {
    setSelected({
      fio: contractor.fio,
      id: contractor.id,
      company: contractor.company.title,
    });
    setDropdownOpen(false);
    setError(null);
  };

  const handleUpload = () => {
    if (!selected) {
      setError("Выберите подрядчика");
      return;
    }
    navigate(
      `/objects/activation/${name}?contractor_id=${selected.id}&contractor_company=${selected.company}&object_id=${objectId}`
    );
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-[20px] px-[20px] py-[24px] flex flex-col gap-[16px] max-w-[463px] w-full h-auto">
        <div className="flex justify-between items-center">
          <h2 className="font-[600] text-[22px] leading-[36px] text-blackText">
            Выбор подрядчика
          </h2>
          <button onClick={onClose} className="cursor-pointer">
            <Icon name="Close" />
          </button>
        </div>

        <div className="relative">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`p-[16px] border rounded-[20px] flex items-center gap-[10px] transition relative cursor-pointer border-[#E8E8E8]
            `}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13 22H5C3 22 2 21 2 19V11C2 9 3 8 5 8H10V19C10 21 11 22 13 22Z"
                  stroke="#007AFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.11 4C10.03 4.3 10 4.63 10 5V8H5V6C5 4.9 5.9 4 7 4H10.11Z"
                  stroke="#007AFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 8V13M18 8V13M6 13V17"
                  stroke="#007AFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 17H15C14.45 17 14 17.45 14 18V22H18V18C18 17.45 17.55 17 17 17Z"
                  stroke="#007AFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 19V5C10 3 11 2 13 2H19C21 2 22 3 22 5V19C22 21 21 22 19 22H13C11 22 10 21 10 19Z"
                  stroke="#007AFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col pl-[10px] border-l border-borderGray w-full">
                <p className="font-[600] text-[14px] leading-[22px] text-gray">
                  {name}
                </p>
                <p className="font-[600] text-[18px] leading-[28px] text-darkGray">
                  {selected?.fio ?? "Выберите"}
                </p>
              </div>
              <motion.svg
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="6"
                viewBox="0 0 11 6"
                fill="none"
              >
                <path
                  d="M1.125 0.8125C1.125 0.8125 3.715 5.1875 5.5 5.1875C7.28438 5.1875 9.875 0.8125 9.875 0.8125"
                  stroke="#0B0B0B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </div>
          </div>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                key="dropdown-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="mt-2 w-full flex flex-col gap-2 overflow-hidden"
              >
                {contractors?.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSelect(c)}
                    className="p-[16px] border rounded-[20px] flex flex-col  gap-[10px] transition border-borderGray bg-white hover:bg-gray-50 cursor-pointer"
                  >
                    <p className="font-[600] text-[16px] text-blackText">
                      {c.fio}
                    </p>
                    <p className="font-[600] text-[16px] text-darkGray">
                      Строительная компания “{c.company.title}”
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <p className="text-[#E02D3C] text-[14px] mt-1 ml-2 font-[600]">
              {error}
            </p>
          )}
        </div>

        <BigButton text="Отправить" onClick={handleUpload} />
      </div>
    </div>
  );
};
