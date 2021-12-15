import { Badge } from "@chakra-ui/react";

interface StatusBadgeProps {
  status: "ativo" | "inativo";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  let color;

  switch (status) {
    case "ativo":
      color = "green";
      break;

    case "inativo":
      color = "red";
      break;

    default:
      throw new Error("Status inválido");
  }

  return <Badge colorScheme={color}>{status.toUpperCase()}</Badge>;
}
