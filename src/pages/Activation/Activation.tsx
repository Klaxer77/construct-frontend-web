import { useLocation, useNavigate } from "react-router";
import { Header, TabsControl } from "../../widgets";
import { Button } from "../../shared";
import { useState } from "react";
import { MainBlock } from "./MainBlock";
import { ParamsBlock, type ParamsValues } from "./ParamsBlock";
import {
  useChangeObjectAct,
  useCheckList,
  useCreateCheckList,
  useObjectById,
} from "../../shared/hooks/useObjects";
import { tableData } from "./data";
import { useCurrentUser } from "../../shared/hooks/useAuth";
import type { Docs } from "../../shared/api/objectsApi";

const TABS = [
  { label: "Главная", value: "main" },
  { label: "Параметры", value: "params" },
];

export const Activation: React.FC = () => {
  const [activeTab, setActiveTab] = useState("main");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const object_id = searchParams.get("object_id") ?? "";
  const contractor_id = searchParams.get("contractor_id") ?? "";

  const { data: object } = useObjectById(object_id);
  const { data: user } = useCurrentUser();
  const { data: checkList } = useCheckList(
    object?.object_type === "agreement" ? object_id : ""
  );
  const navigate = useNavigate();

  const companyName =
    object?.object_type === "agreement"
      ? checkList?.contractor_title
      : searchParams.get("contractor_company") ?? "";

  const { mutate: send, isPending } = useCreateCheckList(object_id);
  const { mutate: agree } = useChangeObjectAct();

  const [params, setParams] = useState<ParamsValues>(
    tableData.reduce((acc, row) => {
      acc[row.id] = { status: "yes", description: "" };
      return acc;
    }, {} as ParamsValues)
  );

  const mapDocsToParams = (docs: Docs[]): ParamsValues => {
    return docs.reduce((acc, doc) => {
      acc[doc.code] = { status: doc.status, description: doc.description };
      return acc;
    }, {} as ParamsValues);
  };

  const handleSend = () => {
    const act_docx = Object.entries(params).map(
      ([rowId, { status, description }]) => {
        const row = tableData.find((r) => r.id === Number(rowId));
        return {
          code: String(row?.id ?? ""),
          title: String(row?.title ?? ""),
          description,
          status: status,
        };
      }
    );

    send(
      { contractor_id, date_verification: new Date().toISOString(), act_docx },
      { onSuccess: () => navigate("/objects") }
    );
  };

  const handleAgree = (action: "accept" | "deny") => {
    agree(
      { objectId: object?.id ?? "", action },
      { onSuccess: () => navigate("/objects") }
    );
  };

  const renderButtons = () => {
    if (
      object?.object_type === "agreement" &&
      user?.role === "construction_control"
    ) {
      return null;
    }

    if (object?.object_type === "agreement") {
      return (
        <div className="flex gap-[10px]">
          <Button
            style="blue"
            text={isPending ? "Отправка..." : "Принять"}
            onClick={() => handleAgree("accept")}
          />
          <Button
            style="black"
            text="Отменить"
            onClick={() => handleAgree("deny")}
          />
        </div>
      );
    }

    return (
      <div className="flex gap-[10px]">
        <Button
          style="blue"
          text={isPending ? "Отправка..." : "Отправить"}
          onClick={handleSend}
        />
        <Button
          style="black"
          text="Отменить"
          onClick={() => navigate("/objects")}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <Header title={object?.title} subtitle={`ID: ${object?.using_id}`} />
        {renderButtons()}
      </div>

      <p className="mb-[8px] text-[18px] leading-[30px] font-[700] text-[#3A3A3A]">
        Активация объекта
      </p>
      <p className="max-w-[720px] text-[14px] font-[600] leading-[22px] text-[#3A3A3A]">
        ЧЕК-ЛИСТ (ФОРМА №1) проверки качества выполнения комплекса
        строительно-монтажных работ ФОРМА №1 «Организация строительства»
      </p>

      <div className="py-[30px] max-w-[250px]">
        <TabsControl tabs={TABS} active={activeTab} onChange={setActiveTab} />
      </div>

      {activeTab === "main" ? (
        object?.object_type === "agreement" && !checkList ? null : (
          <MainBlock company={companyName ?? ""} />
        )
      ) : (
        <ParamsBlock
          values={
            object?.object_type === "agreement"
              ? mapDocsToParams(checkList?.documents ?? [])
              : params
          }
          onChange={(rowId, newValue) =>
            setParams((prev) => ({ ...prev, [rowId]: newValue }))
          }
          disabled={object?.object_type === "agreement"}
        />
      )}
    </div>
  );
};
