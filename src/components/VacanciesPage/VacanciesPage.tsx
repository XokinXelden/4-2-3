import { Container, Divider, Stack, Text, Title } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import VacanciesCard from "../Share/VacanciesCard";
import Base from "../Share/Base";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchTargetVacancy } from "../../Reducer/reducerThunkVacant";
import LoadingVacancies from "../Share/LoadingVacancies";
import AlertTime from "../Share/AlertTime";
import type { VacanciesType } from "../types";
import { cleanUp } from "../../Reducer/reducerSlicer";

function VacanciesPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, targetVacancy, error } = useAppSelector(
    (state) => state.vacancies
  );

  useEffect(() => {
    dispatch(cleanUp("CleanSearchVac"));
    if (!id || isNaN(Number(id)) || error) {
      navigate(`/Not-Found`, {
        replace: true,
        state: {
          status: "404",
          text: "К сожалению не вышло получить информацию о пользователе или работодателе",
        },
      });
    } else {
      dispatch(fetchTargetVacancy({ vacancyId: id }));
    }
  }, [error]);

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
    return (
      <Container maw={500}>
        <Stack align="space-between" gap={20}>
          <AlertTime btn={true} />
        </Stack>
      </Container>
    );
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
