import { Container, Divider, Stack, Text, Title } from "@mantine/core";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import VacanciesCard from "../Share/VacanciesCard";
import Base from "../Share/Base";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchTargetVacancy } from "../../Reducer/reducerThunkVacant";
import LoadingVacancies from "../Share/LoadingVacancies";
import AlertTime from "../Share/AlertTime";
import type { VacanciesType } from "../types";

function VacanciesPage() {
  const [searchParam, setSearchParam] = useSearchParams();
  const locate = useLocation();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, targetVacancy, error } = useAppSelector(
    (state) => state.rootReducer.vacanciesReducer
  );

  const employerId =
    searchParam.get("employer") || locate.state?.employerId || null;

  useEffect(() => {
    if (!id || isNaN(Number(id)) || employerId === null) {
      navigate(`/Not-Found`, {
        replace: true,
        state: {
          status: "404",
          text: "К сожалению не вышло получить информацию о пользователе или работодателе",
        },
      });
    } else {
      setSearchParam({ employer: employerId });

      dispatch(fetchTargetVacancy({ employerId: employerId, vacancyId: id }));
    }
  }, []);

  const onClick = (targetVacancy: VacanciesType) => {
    window.open(targetVacancy.urlVacant);
  };

  if (loading) {
    return (
      <Container maw={700} mb={50}>
        <Stack align="space-between" gap={20}>
          <LoadingVacancies count={2} />
        </Stack>
      </Container>
    );
  }
  if (targetVacancy === null) {
    throw new Error("не пришли данные о вакансии");
  }
  if (error) {
    return <AlertTime />;
  }
  return (
    <Container maw={700} mb={50}>
      <Stack gap={20} align="space-between">
        <VacanciesCard vacancy={targetVacancy} onClick={onClick} />
        <Base>
          <Stack gap={10}>
            <Title order={2}>Компания</Title>
            <Text
              component="div"
              dangerouslySetInnerHTML={{
                __html: targetVacancy.employerDescription ?? "",
              }}
            ></Text>
            <Divider />
            <Title order={2}>О проекте:</Title>
            <Text
              component="div"
              dangerouslySetInnerHTML={{
                __html: targetVacancy.vacancyDescription ?? "",
              }}
            ></Text>
          </Stack>
        </Base>
      </Stack>
    </Container>
  );
}

export default VacanciesPage;
