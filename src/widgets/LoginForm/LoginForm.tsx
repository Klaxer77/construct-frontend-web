import { useEffect, useState } from "react";
import { LoginInput } from "../../entities";
import { BigButton, CheckBox, Icon } from "../../shared";
import { useNavigate } from "react-router";
import { useRole, useLogin } from "../../shared/hooks/useAuth";

const roleMap = {
  construction_control: { text: "Строительный контроль", icon: "Control" },
  contractor: { text: "Подрядная компания", icon: "Podryad" },
  inspection: { text: "Инспекция", icon: "Inspection" },
} as const;

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [debouncedEmail, setDebouncedEmail] = useState("");
  const navigate = useNavigate();
  const { data: roleData, isFetched } = useRole(debouncedEmail);
  const { mutate: login, isPending } = useLogin();

  const formValidate = email.includes("@") && password && roleData;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedEmail(email.includes("@") ? email : "");
      setEmailError("");
    }, 500);
    return () => clearTimeout(handler);
  }, [email]);

  useEffect(() => {
    if (debouncedEmail && !roleData && isFetched) {
      setEmailError("Аккаунт не найден");
    }
  }, [debouncedEmail, roleData, isFetched]);

  const roleInfo = roleData
    ? roleMap[roleData.role as keyof typeof roleMap]
    : null;

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!formValidate) return;

    login(
      { email, password },
      {
        onSuccess() {
          navigate("/");
        },
        onError() {
          setPasswordError("Неверный пароль");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[25px]">
      <div className="flex flex-col">
        <h1 className="font-[700] text-[40px] leading-[60px] tracking-[-0.4px] text-blackText">
          Добро пожаловать!
        </h1>
        <p className="font-[600] text-[16px] leading-[26px] tracking-[-0.4px] text-darkGray">
          Введите свои данные для входа
        </p>
      </div>

      <div className="flex flex-col gap-[20px]">
        <LoginInput
          icon={<Icon name="Email" />}
          label="Email"
          value={email}
          onChange={(v) => {
            setEmail(v);
            setEmailError("");
          }}
          type="email"
          placeholder="Введите вашу почту"
          verified={!!roleInfo}
          error={emailError}
        />
        <LoginInput
          icon={<Icon name="Password" />}
          label="Пароль"
          value={password}
          onChange={(v) => {
            setPassword(v);
            setPasswordError("");
          }}
          type="password"
          placeholder="Введите пароль"
          error={passwordError}
        />
        {roleInfo && (
          <LoginInput
            type="role"
            icon={<Icon name={roleInfo.icon} />}
            label="Роль"
            roleText={roleInfo.text}
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <CheckBox checked={checked} onClick={() => setChecked(!checked)} />
          <p className="font-[700] text-[16px] leading-[22px] tracking-[-0.4px] text-blackText">
            Запомнить меня{" "}
            <span className="font-[600] text-darkGray">(5 дней)</span>
          </p>
        </div>
        <p className="font-[700] text-[16px] leading-[22px] tracking-[-0.4px] text-blackText underline underline-offset-3">
          Забыли пароль?
        </p>
      </div>

      <BigButton
        text="Войти"
        onClick={handleSubmit}
        type="submit"
        disabled={!formValidate}
        loading={isPending}
      />
    </form>
  );
};
