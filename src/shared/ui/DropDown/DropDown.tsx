import { AnimatePresence } from 'framer-motion';
import { Icon } from '../../assets/icons/icons';
import type { DropDownProps } from './type';
import { motion } from 'framer-motion';

export const DropDown: React.FC<DropDownProps> = ({
  children,
  title,
  isOpen,
  setOpen,
  className,
  iconName,
  isOpenSideBar,
}) => {
  return (
    <div
      className={`bg-transparent w-full flex flex-col items-center justify-center min-h-[44px] rounded-[14px] ${className}`}>
      <div onClick={() => setOpen(!isOpen)} className="flex items-center justify-between w-full cursor-pointer h-[44px]">
        <div className={`pl-[12px] flex items-center gap-[10px] ${isOpenSideBar ? '' : ''}`}>
          <Icon
            className="transition-colors duration-300"
            color={`${!isOpen ? '#858585' : '#0B0B0B'}`}
            name={iconName}
          />
          <p
            className={`transition-colors duration-300 font-[600] leading-[24px] whitespace-nowrap ${
              isOpen ? 'text-blackText' : 'text-gray60'
            } ${isOpenSideBar ? 'opacity-100' : 'opacity-0'}`}>
            {title}
          </p>
        </div>
        <Icon
          color={`${!isOpen ? '#858585' : '#0B0B0B'}`}
          className={`transition-transform duration-300 ${!isOpen ? 'rotate-180 ' : ''}`}
          name="TickTop"
        />
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="dropdown-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden w-full">
            <div className="w-full pt-[15px]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
