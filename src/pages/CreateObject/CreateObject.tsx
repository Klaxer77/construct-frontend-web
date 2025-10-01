import { useNavigate } from "react-router";
import { BigInput, Button, Icon } from "../../shared";
import { Header } from "../../widgets";
import { inputs } from "./data";
import { useCreateObject } from "../../shared/hooks/useObjects";
import { useCurrentCompany } from "../../shared/hooks/useCompany";
import { useEffect, useState } from "react";
import { ObjectMap } from "../../widgets/ObjectMap/ObjectMap";

export const CreateObject = () => {
  const navigate = useNavigate();
  const { data: company } = useCurrentCompany();
  const companyId = company?.id ?? "";
  const { mutate: createObject, isPending } = useCreateObject(companyId);
  const [error, setError] = useState(false);
  const [poligonError, setPoligonError] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    start_date: "",
    date_delivery_verification: "",
    general_info: "",
  });

  const [coords, setCoords] = useState<number[][][]>([]);
  const [activePolygonIndex, setActivePolygonIndex] = useState<number | null>(
    null
  );
  const [city, setCity] = useState("");
  const [manualInputsVisible, setManualInputsVisible] = useState(false);
  const [manualPoint, setManualPoint] = useState({ lng: "", lat: "" });

  const handleAddManualPoint = () => {
    if (!manualPoint.lng || !manualPoint.lat || activePolygonIndex === null)
      return;

    setCoords((prev) => {
      const updated = [...prev];
      if (!updated[activePolygonIndex]) updated[activePolygonIndex] = [];

      updated[activePolygonIndex] = [
        ...updated[activePolygonIndex],
        [parseFloat(manualPoint.lng), parseFloat(manualPoint.lat)],
      ];
      return updated;
    });

    setManualPoint({ lng: "", lat: "" });
    setManualInputsVisible(false);
  };

  const removePoint = (polygonIndex: number, pointIndex: number) => {
    if (polygonIndex !== activePolygonIndex) return;

    const updated = [...coords];
    updated[polygonIndex] = updated[polygonIndex].filter(
      (_, idx) => idx !== pointIndex
    );

    if (updated[polygonIndex].length === 0) {
      if (polygonIndex === 0) {
        updated[polygonIndex] = [];
        setActivePolygonIndex(0);
      } else {
        updated.splice(polygonIndex, 1);
        const newIndex = polygonIndex - 1;
        setActivePolygonIndex(newIndex >= 0 ? newIndex : null);
      }
    }

    setCoords(updated);
  };

  const parseDateToISO = (dateStr: string) => {
    const [day, month, year] = dateStr.split(".").map(Number);
    return new Date(Date.UTC(year, month - 1, day)).toISOString();
  };

  useEffect(() => {
    const allPolygonsValid = coords.every((polygon) => polygon.length >= 3);
    if (allPolygonsValid && poligonError) {
      setPoligonError(false);
    }
  }, [coords, poligonError]);

  const handleCreate = () => {
    const emptyFields = Object.entries(formValues).filter(
      ([, value]) => !value.trim()
    );

    if (emptyFields.length > 0) {
      setError(true);
      return;
    }

    const allPolygonsValid = coords.every((polygon) => polygon.length >= 3);
    if (!allPolygonsValid) {
      setPoligonError(true);
      return;
    }

    const startDateISO = parseDateToISO(formValues.start_date);
    const endDateISO = parseDateToISO(formValues.date_delivery_verification);

    createObject(
      {
        general_info: formValues.general_info,
        title: formValues.title,
        city: city,
        date_delivery_verification: endDateISO,
        start_date: startDateISO,
        coords,
      },
      { onSuccess: () => navigate("/objects") }
    );
  };

  return (
    <div className="flex flex-col">
      <Header title="Cоздание объекта" subtitle="Заполните поля для создания">
        <div className="flex items-center gap-[10px]">
          {error && (
            <p className="text-redError font-[600]">
              Пожалуйста заполните все поля
            </p>
          )}
          {poligonError && (
            <p className="text-redError font-[600]">
              Добавьте минимум 3 точки в полигон
            </p>
          )}
          <Button
            text={isPending ? "Создание..." : "Создать"}
            onClick={handleCreate}
            className="rounded-[15px] h-[52px] text-[18px] leading-[28px]"
          />
          <Button
            text="Отменить"
            style="black"
            onClick={() => navigate("/objects")}
            className="rounded-[15px] h-[52px] text-[18px] leading-[28px]"
          />
        </div>
      </Header>
      <ObjectMap
        coords={coords}
        setCoords={setCoords}
        activePolygonIndex={activePolygonIndex}
        onActivePolygonChange={setActivePolygonIndex}
        onCityChange={(v) => setCity(v)}
      />
      <p className=" font-[700] text-[16px] leading-[24px] tracking-[-0.4px] text-[#404040] my-[30px]">
        Введите координаты объекта (Полигоны) - Требуется ввести (
        <span className="font-[800] text-blueSideBarActive">4</span> |{" "}
        <span className="font-[800] text-blueSideBarActive">6</span> |{" "}
        <span className="font-[800] text-blueSideBarActive">8</span> |{" "}
        <span className="font-[800] text-blueSideBarActive">10</span> |{" "}
        <span className="font-[800] text-blueSideBarActive">12</span>) точек
      </p>
      {coords.map((polygon, polygonIndex) => (
        <div key={polygonIndex} className="mb-[30px]">
          {polygon.length > 0 && (
            <div className="flex items-center gap-[10px] flex-wrap">
              {polygon.map(([lng, lat], index) => {
                const isActive = polygonIndex === activePolygonIndex;

                return (
                  <div
                    id="delete-btn"
                    key={index}
                    className="p-[16px] rounded-[20px] bg-white border border-borderGray gap-[10px] flex items-center"
                  >
                    <div className="flex items-center gap-[10px]">
                      <Icon name="Location" />
                      <div className="flex flex-col pl-[10px] border-l border-borderGray">
                        <p className="font-[600] text-[20px] leading-[30px] text-[#7A7A7A] tracking-[-0.4px] border-b border-borderGray">
                          X:{" "}
                          <span className="font-[700] text-blackText">
                            {lng.toFixed(6)}
                          </span>
                        </p>
                        <p className="font-[600] text-[20px] leading-[30px] text-[#7A7A7A] tracking-[-0.4px]">
                          Y:{" "}
                          <span className="font-[700] text-blackText">
                            {lat.toFixed(6)}
                          </span>
                        </p>
                      </div>
                    </div>

                    {isActive && (
                      <button
                        onClick={() => removePoint(polygonIndex, index)}
                        className="text-redError font-[800] cursor-pointer rounded-full border border-borderGray p-[4px]"
                      >
                        <Icon name="Delete" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
      {activePolygonIndex !== null && (
        <div className="flex flex-col gap-[10px]" id="delete-btn">
          <Button
            text={manualInputsVisible ? "Скрыть ввод" : "Добавить точки"}
            className="h-[48px] text-[16px] rounded-[15px]"
            onClick={() => setManualInputsVisible((v) => !v)}
          />

          {manualInputsVisible && (
            <div className="flex items-center gap-[10px]" id="delete-btn">
              <input
                type="number"
                placeholder="X (долгота)"
                value={manualPoint.lng}
                onChange={(e) =>
                  setManualPoint((p) => ({ ...p, lng: e.target.value }))
                }
                className="border-b border-borderGray px-[10px] py-[6px] w-[160px] outline-none font-[600]"
              />
              <input
                type="number"
                placeholder="Y (широта)"
                value={manualPoint.lat}
                onChange={(e) =>
                  setManualPoint((p) => ({ ...p, lat: e.target.value }))
                }
                className="border-b border-borderGray px-[10px] py-[6px] w-[160px] outline-none font-[600]"
              />
              <Button
                text="Добавить"
                className="h-[40px] text-[14px] rounded-[10px]"
                onClick={handleAddManualPoint}
              />
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-[20px] mt-[30px]">
        {inputs.map((item, index) => (
          <BigInput
            key={index}
            label={item.label}
            value={formValues[item.id as keyof typeof formValues]}
            type={
              item.id === "start_date" ||
              item.id === "date_delivery_verification"
                ? "date"
                : "text"
            }
            placeholder={
              item.id === "start_date" ||
              item.id === "date_delivery_verification"
                ? "00.00.0000"
                : "Введите"
            }
            onChange={(value) => {
              setFormValues((prev) => ({
                ...prev,
                [item.id]: value,
              }));
              if (error) setError(false);
            }}
          />
        ))}
      </div>
    </div>
  );
};
