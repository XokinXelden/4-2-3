import HeaderVac from "../Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import SearchVacanciesPage from "../MainBlock/SearchVacanciesPage";
import VacanciesPage from "../VacanciesPage/VacanciesPage";

function App() {
  return (
    <>
      <HeaderVac />
      <Routes>
        <Route path="/vacancies" element={<SearchVacanciesPage />} />
        <Route path="vacancies/:id" element={<VacanciesPage />} />
        <Route
          path="*"
          element={<Navigate to={"/vacancies"} replace={true} />} // NotFound
        />
      </Routes>
    </>
  );
}

export default App;
