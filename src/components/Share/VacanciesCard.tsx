import { Flex, Pill, Stack, Text } from "@mantine/core";
import Base from "./Base";
import type { VacanciesType } from "../types";
import ButtonCardVariant from "./ButtonCardVariant";

export type VacType = {
  vacancy: VacanciesType;
  onClick: (vacancy: VacanciesType) => void;
};

function VacanciesCard({ vacancy, onClick }: VacType) {
  const workFormat = () => {
    switch (vacancy.workFormat) {
      case "REMOTE":
        return { format: "Можно удалённо", color: "#4263EB" };
      case "ON_SITE":
        return { format: "Офис", color: "#0f0f103b" };
      case "HYBRID":
        return { format: "Гибридно", color: "#0f0f108c" };
      default:
        return null;
    }
  };
  return (
    <Base data-testid={`Card-${vacancy.id}`}>
      <Stack gap={5}>
        <Text size="lg" color="#4263EB" fw="bold">
          {vacancy.name}
        </Text>
        <Flex gap={20} align="flex-end" mb={8}>
          <Text>
            {vacancy.salary === null
              ? "Не указано"
              : `${vacancy.salary?.from}-${vacancy.salary.to} ${
                  vacancy.salary.currency === "RUR" ? "₽" : null
                }`}
          </Text>
          <Text size="sm" color="#0f0f105d">
            {vacancy.experience}
          </Text>
        </Flex>
        <Text>{vacancy.employerName}</Text>
        <Flex>
          {workFormat() !== null ? (
            <Pill
              size="xs"
              radius="sm"
              c={workFormat()?.format === "Офис" ? "#0f0f1096" : "white"}
              bg={workFormat()?.color}
            >
              {workFormat()?.format}
            </Pill>
          ) : null}
        </Flex>
        {vacancy.city ? <Text>{vacancy.city}</Text> : null}
        <Flex gap={10} mt={5}>
          <ButtonCardVariant onClick={onClick} vacancy={vacancy} />
        </Flex>
      </Stack>
    </Base>
  );
}

export default VacanciesCard;
