import { useState } from 'react';
import { CheckBoxSmall } from '../../shared';
import { columns, tableData } from './data';

export const VedomostiTable: React.FC = () => {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleRow = (index: number) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const toggleAll = () => {
    if (selected.length === tableData.length) {
      setSelected([]);
    } else {
      setSelected(tableData.map((_, i) => i));
    }
  };

  const isAllChecked = selected.length === tableData.length && tableData.length > 0;

  return (
    <div className="w-full flex flex-col gap-[8px]">
      <div
        className="grid  items-center bg-[#F9F8F8] border border-borderGray rounded-t-[10px] h-[52px]"
        style={{
          gridTemplateColumns: '56px 52px 2fr 1fr 1fr 1fr 1fr',
        }}>
        <div className="px-[16px] border-r border-borderGray h-full flex items-center">
          <CheckBoxSmall checked={isAllChecked} onClick={toggleAll} />
        </div>
        {columns.map((col, index) => (
          <div
            key={String(col.key) + index}
            className=" px-[16px] font-[700] text-[16px] leading-[24px] tracking-[-0.2px] text-gray border-r border-borderGray last:border-0 h-full flex items-center">
            {col.title || ''}
          </div>
        ))}
      </div>
      {tableData.map((row, index) => {
        const isChecked = selected.includes(index);

        return (
          <div
            key={index}
            className="grid  items-center border-b border-borderGray h-[64px]"
            style={{
              gridTemplateColumns: '56px 52px 2fr 1fr 1fr 1fr 1fr',
            }}>
            <div className="px-[16px]">
              <CheckBoxSmall checked={isChecked} onClick={() => toggleRow(index)} />
            </div>
            <div className="px-[16px] font-[800] text-[16px] leading-[24px] tracking-[-0.2px] text-darkGray text-center ">
              {index + 1}
            </div>
            <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757]">
              {row.name}
            </div>
            <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757]">
              {row.unit}
            </div>
            <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757]">
              {row.quantity}
            </div>
            <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757]">
              {row.price}
            </div>
            <div className=" px-[16px] font-[600] text-[16px] leading-[24px] tracking-[-0.2px] text-[#585757]">
              {row.allPrice}
            </div>
          </div>
        );
      })}
    </div>
  );
};
