import { useAppDispatch, useAppSelector } from "../hooks/redux";
import LoadingVacancies from "../Share/LoadingVacancies";
import VacanciesCard from "../Share/VacanciesCard";
import { useNavigate } from "react-router-dom";
import type { VacanciesType } from "../types";
import { cleanUp } from "../../Reducer/reducerSlicer";
import AlertTime from "../Share/AlertTime";

function Vacancies() {
  const { vacancies, loading, error } = useAppSelector(
    (state) => state.vacancies
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClick = (vacancy: VacanciesType) => {
    navigate(`/vacancies/${vacancy.id}`, {
      state: { vacancyId: vacancy.id },
    });
    dispatch(cleanUp("CleanSearchVac"));
  };
  if (loading) {
    return <LoadingVacancies count={10} />;
  }
  if (error) {
    return <AlertTime btn={false} />;
  }
  if (vacancies !== null) {
    if (vacancies.length === 0) {
      return (
        <AlertTime
          btn={false}
          alertText={{
            title: "Поиск не дал результатов",
            message: "Возможно стоит уменьшить кол-во фильтров",
          }}
        />
      );
    }
    return vacancies.map((vacancy) => {
      return (
        <VacanciesCard key={vacancy.id} vacancy={vacancy} onClick={onClick} />
      );
    });
  }
}

export default Vacancies;
