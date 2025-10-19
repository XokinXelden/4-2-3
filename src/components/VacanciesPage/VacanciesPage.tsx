import { Container, Divider, Stack, Text, Title } from "@mantine/core";
import { useLocation } from "react-router-dom";
import VacanciesCard from "../Share/VacanciesCard";
import Base from "../Share/Base";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchTargetVacancy } from "../../Reducer/reducerThunkVacant";
import LoadingVacancies from "../Share/LoadingVacancies";

function VacanciesPage() {
  const id = useLocation().state;
  const dispatch = useAppDispatch();
  const { loading, targetVacancy } = useAppSelector(
    (state) => state.rootReducer.vacanciesReducer
  );
  useEffect(() => {
    dispatch(fetchTargetVacancy(id));
  }, []);
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
  return (
    <Container maw={700} mb={50}>
      <Stack gap={20} align="space-between">
        <VacanciesCard
          vacancy={targetVacancy}
          onClick={(f) => console.log("заглуша" + f)}
        />
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
