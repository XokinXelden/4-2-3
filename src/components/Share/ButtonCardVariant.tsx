import type { VacType } from "./VacanciesCard";
import { Link, useMatch } from "react-router-dom";

function ButtonCardVariant({ vacancy }: VacType) {
  const match = useMatch("/vacancies/:id");
  return (
    <>
      <Link
        to={match ? vacancy.urlVacant : `/vacancies/${vacancy.id}`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "36px",
          width: "170px",
          backgroundColor: "#0F0F10",
          borderRadius: "4px",
          fontSize: "14px",
          color: "white",
        }}
      >
        {vacancy.employerDescription
          ? "Откликнуться на hh.ru"
          : "Смотреть вакансию"}
      </Link>

      {!!vacancy.employerDescription || (
        <Link
          to={vacancy.urlVacant}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "36px",
            width: "170px",
            backgroundColor: "#0f0f103b",
            borderRadius: "4px",
            fontSize: "14px",
            color: "white",
          }}
        >
          Откликнуться
        </Link>
      )}
    </>
  );
}

export default ButtonCardVariant;
