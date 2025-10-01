export const formatFio = (fullName?: string) => {
  if (!fullName) return "Неизвестно";
  const parts = fullName.trim().split(" ");

  const lastName = parts[0];
  const initials = parts
    .slice(1)
    .map((p) => p[0].toUpperCase() + ".")
    .join(" ");

  return `${lastName} ${initials}`;
};
