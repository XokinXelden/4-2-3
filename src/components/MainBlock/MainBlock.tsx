import { Container, Flex, Pagination, Stack } from "@mantine/core";
import SkillsOption from "../Options/Skill/SkillsOption";
import CityOption from "../Options/CityOption";
import Vacancies from "../Vacancies/Vacancies";
import { useEffect } from "react";
import { fetchVacanciesList } from "../../Reducer/reducerThunk";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { activePage } from "../../Reducer/reducerSlicer";

function MainBlock() {
  const dispatch = useAppDispatch();
  const options = useAppSelector(
    (state) => state.rootReducer.vacanciesReducer.options
  );
  useEffect(() => {
    if (options) {
      dispatch(fetchVacanciesList(options));
    }
  }, [dispatch, options]);
  return (
    <Container>
      <Flex justify="center" gap={30}>
        <Stack flex={1}>
          <SkillsOption />
          <CityOption />
        </Stack>
        <Stack flex={2}>
          <Vacancies />
          <Pagination
            w="auto"
            total={options.pages}
            value={options.page}
            onChange={(newPage) => dispatch(activePage(newPage))}
          ></Pagination>
        </Stack>
      </Flex>
    </Container>
  );
}

export default MainBlock;
