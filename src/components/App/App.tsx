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
import Vacancies from "../Vacancies/Vacancies";
import AlertTime from "../Share/AlertTime";
import NotFoundPage from "../Share/NotFoundPage";
import AboutMe from "../AboutMePage/AboutMe";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HeaderVac />}>
      <Route index element={<Navigate to="vacancies" replace />} />
      <Route path="about" element={<AboutMe />} />
      <Route path="vacancies" element={<SearchVacanciesPage />}>
        <Route
          index
          element={<Vacancies />}
          errorElement={<AlertTime btn={false} />}
        />
        <Route path="city/*">
          <Route index element={<Navigate to="/vacancies" />} />
          <Route path=":cityName" element={<Vacancies />} />
        </Route>
      </Route>
      <Route
        path="vacancies/:id"
        element={<VacanciesPage />}
        errorElement={<AlertTime btn={true} />}
      />
      <Route path="Not-Found" element={<NotFoundPage />} />
      <Route path="/*" element={<Navigate to="/vacancies" />} />
    </Route>
  )
);

function App() {
  return (
    <>
      {/* <HeaderVac /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
