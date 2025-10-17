import { useState } from "react";
import { BigInput, Button, Icon } from "../../shared";

interface Task {
  id: number;
  name: string;
  volume: string;
  unit: string;
  kpgz: string;
  start: string;
  end: string;
}

interface ProjectData {
  projectName: string;
  startDate: string;
  endDate: string;
  tasks: Task[];
}

interface CreateProgressProps {
  onCancel: () => void;
  onComplete: (data: ProjectData) => void;
}

export const CreateProgress: React.FC<CreateProgressProps> = ({
  onCancel,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        volume: "",
        unit: "",
        kpgz: "",
        start: "",
        end: "",
      },
    ]);
  };

  const handleRemoveTask = (id: number): void => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleTaskChange = (
    id: number,
    field: keyof Task,
    value: string
  ): void => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const isStep1Complete =
    projectName.trim() !== "" &&
    startDate.trim() !== "" &&
    endDate.trim() !== "";

  const isAllTasksComplete = tasks.every(
    (t) =>
      t.name.trim() !== "" &&
      t.volume.trim() !== "" &&
      t.unit.trim() !== "" &&
      t.kpgz.trim() !== "" &&
      t.start.trim() !== "" &&
      t.end.trim() !== ""
  );

  const handleNext = (): void => {
    if (step === 1) {
      if (!isStep1Complete) return;
      setStep(2);
      if (tasks.length === 0) handleAddTask();
    } else {
      if (!isAllTasksComplete) return;
      onComplete({ projectName, startDate, endDate, tasks });
    }
  };

  return (
    <div className="flex flex-col">
      {step === 1 ? (
        <>
          <div className="flex items-center justify-between mb-[29px]">
            <div className="flex flex-col gap-[3px]">
              <h2 className="text-[20px] text-[#1C1C1C] font-[700]">
                Создание этапа
              </h2>
              <p>Ход работ</p>
            </div>
            <div className="flex gap-[10px]">
              <Button
                text="Далее"
                onClick={handleNext}
                className={`h-[45px] text-[16px] ${
                  !isStep1Complete && "opacity-50 !cursor-default"
                }`}
              />
              <Button
                text="Отмена"
                style="red"
                onClick={onCancel}
                className="bg-[#EEEEEE] !text-[#E02D3C] h-[45px] text-[16px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[12px]">
            <BigInput
              label="Название этапа"
              type="text"
              placeholder="Введите"
              style="second"
              value={projectName}
              onChange={(value) => setProjectName(value)}
            />
            <BigInput
              label="Начало работ"
              type="date"
              placeholder="00.00.0000"
              style="second"
              value={startDate}
              onChange={(value) => setStartDate(value)}
              icon={false}
            />
            <BigInput
              label="Конец работ"
              type="date"
              placeholder="00.00.0000"
              style="second"
              value={endDate}
              onChange={(value) => setEndDate(value)}
              icon={false}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-[29px]">
            <div className="flex flex-col gap-[3px]">
              <h2 className="text-[20px] text-[#1C1C1C] font-[700] flex items-center gap-[28px]">
                {projectName} <Icon name="Pen" color="#007AFF" />
              </h2>
              <p className="flex font-[600] text-[18px] leading-[24px] tracking-[-0.4px] text-[#A0A0A5]">
                {startDate}
                <Icon name="ArrowTop" color="#A0A0A5" className="rotate-90" />
                {endDate}
              </p>
            </div>
            <div className="flex gap-[10px]">
              <Button
                text="Далее"
                onClick={handleNext}
                className={`h-[45px] text-[16px] ${
                  !isAllTasksComplete && "opacity-50 !cursor-default"
                }`}
              />
              <Button
                text="Отмена"
                style="red"
                onClick={onCancel}
                className="bg-[#EEEEEE] !text-[#E02D3C] h-[45px] text-[16px]"
              />
            </div>
          </div>

          {tasks.map((task) => (
            <div key={task.id} className=" flex flex-col gap-[12px] mb-[26px]">
              <div className="flex items-center justify-between">
                <h2 className="font-[800] text-[16px] leading-[24px] tracking-[-0.1px] text-blueSideBarActive">
                  ВЛОЖЕННЫЙ ЭТАП
                </h2>
                <button
                  onClick={() => handleRemoveTask(task.id)}
                  className="cursor-pointer"
                >
                  <Icon name="Delete" />
                </button>
              </div>
              <BigInput
                label="Название этапа"
                type="text"
                placeholder="Введите"
                style="second"
                value={task.name}
                onChange={(value) => handleTaskChange(task.id, "name", value)}
              />
              <BigInput
                label="Начало работ"
                type="date"
                placeholder="00.00.0000"
                style="second"
                value={task.start}
                onChange={(value) => handleTaskChange(task.id, "start", value)}
                icon={false}
              />
              <BigInput
                label="Конец работ"
                type="date"
                placeholder="00.00.0000"
                style="second"
                value={task.end}
                onChange={(value) => handleTaskChange(task.id, "end", value)}
                icon={false}
              />
              <BigInput
                label="КПГЗ"
                type="number"
                placeholder="Введите"
                style="second"
                value={task.kpgz}
                onChange={(value) => handleTaskChange(task.id, "kpgz", value)}
              />
              <BigInput
                label="Объем работ"
                type="number"
                placeholder="Введите"
                style="second"
                value={task.volume}
                onChange={(value) => handleTaskChange(task.id, "volume", value)}
              />
              <BigInput
                label="Единица измерения"
                type="text"
                placeholder="Введите"
                style="second"
                value={task.unit}
                onChange={(value) => handleTaskChange(task.id, "unit", value)}
              />
            </div>
          ))}

          <Button
            text="Добавить еще"
            onClick={handleAddTask}
            className="rounded-[15px] h-[49px] !bg-[#F6F6F6] !text-blueSideBarActive px-[124px] !font-[700] !text-[15px]"
          />
        </>
      )}
    </div>
  );
};
