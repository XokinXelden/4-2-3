import { Button, Flex, Pill, Stack, Text } from "@mantine/core";
import Base from "../Share/Base";
import type { Vacancies } from "../types";

type VacType = {
  vacancies: Vacancies[] | null;
};

function VacanciesCard({ vacancies }: VacType) {
  if (vacancies !== null) {
    return vacancies.map((vac, i) => {
      const workFormat = () => {
        switch (vac.workFormat) {
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
        <Base key={i} data-testid={`Card-${i}`}>
          <Stack gap={7}>
            <Text color="#4263EB" fw="bold">
              {vac.name}
            </Text>
            <Flex gap={20} align="flex-end">
              <Text>
                {vac.salary === null
                  ? "Не указано"
                  : `${vac.salary?.from}-${vac.salary.to} ${
                      vac.salary.currency === "RUR" ? "₽" : null
                    }`}
              </Text>
              <Text size="sm" color="#0f0f105d">
                {vac.experience}
              </Text>
            </Flex>
            <Text>{vac.employerName}</Text>
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
            {vac.city ? <Text>{vac.city}</Text> : null}
            <Flex gap={10} mt={5}>
              <Button size="sm" color="#0F0F10" radius="sm">
                Смотреть вакансию
              </Button>
              <Button
                size="sm"
                color="#0f0f103b"
                radius="sm"
                component="a"
                href={vac.urlVacant}
                target="_blank"
                rel="noopener noreferrer"
              >
                Откликнуться
              </Button>
            </Flex>
          </Stack>
        </Base>
      );
    });
  }
}

export default VacanciesCard;
