import { Button } from "@mantine/core";
import type { VacType } from "./VacanciesCard";

function ButtonCardVariant({ onClick, vacancy }: VacType) {
  return (
    <>
      <Button
        size="sm"
        color="#0F0F10"
        radius="sm"
        onClick={() => onClick(vacancy)} ///Заглушка
      >
        {vacancy.employerDescription
          ? "Откликнуться на hh.ru"
          : "Смотреть вакансию"}
      </Button>

      {!!vacancy.employerDescription || (
        <Button
          size="sm"
          color="#0f0f103b"
          radius="sm"
          component="a"
          href={vacancy.urlVacant}
          target="_blank"
          rel="noopener noreferrer"
        >
          Откликнуться
        </Button>
      )}
    </>
  );
}

export default ButtonCardVariant;
