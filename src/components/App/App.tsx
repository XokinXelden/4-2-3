import HeaderVac from "../Header/Header";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import SearchVacanciesPage from "../MainBlock/SearchVacanciesPage";
import VacanciesPage from "../VacanciesPage/VacanciesPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/vacancies" element={<SearchVacanciesPage />} />
      <Route path="vacancies/:id" element={<VacanciesPage />} />
      <Route
        path="*"
        element={<Navigate to={"/vacancies"} replace={true} />} // NotFound
      />
    </>
  )
);

function App() {
  return (
    <>
      <HeaderVac />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
