import { Alert } from "@mantine/core";
import { useAppSelector } from "../hooks/redux";
import VacanciesCard from "./VacanciesCard";
import LoadingVacancies from "./LoadingVacancies";

function Vacancies() {
  const { vacancies, loading, error } = useAppSelector(
    (state) => state.rootReducer.vacanciesReducer
  );
  if (loading) {
    return <LoadingVacancies />;
  }
  if (error) {
    // console.log(error);
    return <Alert title="Ну всё, без работы сидим">{error}</Alert>;
  }
  return <VacanciesCard vacancies={vacancies} />;
}

export default Vacancies;
