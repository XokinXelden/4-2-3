import { useAppDispatch, useAppSelector } from "../hooks/redux";
import LoadingVacancies from "../Share/LoadingVacancies";
import VacanciesCard from "../Share/VacanciesCard";
import { useNavigate } from "react-router-dom";
import type { VacanciesType } from "../types";
import { cleanUp } from "../../Reducer/reducerSlicer";
import AlertTime from "../Share/AlertTime";

function Vacancies() {
  const { vacancies, loading, error } = useAppSelector(
    (state) => state.rootReducer.vacanciesReducer
  );
  const dispatch = useAppDispatch();
  const navig = useNavigate();
  const onClick = (vacancy: VacanciesType) => {
    navig(`/vacancies/${vacancy.id}`, {
      state: { employerId: vacancy.employerId, vacancyId: vacancy.id },
    });
    dispatch(cleanUp("CleanSearchVac"));
  };
  if (loading) {
    return <LoadingVacancies count={10} />;
  }
  if (error) {
    return <AlertTime />;
  }
  if (vacancies !== null) {
    return vacancies.map((vacancy) => {
      return (
        <VacanciesCard key={vacancy.id} vacancy={vacancy} onClick={onClick} />
      );
    });
  }
}

export default Vacancies;
