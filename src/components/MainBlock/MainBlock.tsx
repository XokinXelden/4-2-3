import { Container, Flex, Pagination, Stack } from "@mantine/core";
import SkillsOption from "../Options/Skill/SkillsOption";
import CityOption from "../Options/CityOption";
import { useEffect } from "react";
import { fetchVacanciesList } from "../../Reducer/reducerThunk";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  activePage,
  changeCity,
  firstSkillsEntering,
  installFilter,
} from "../../Reducer/reducerSlicer";
import { useSearchParams } from "react-router-dom";
import Vacancies from "../Vacancies/Vacancies";

function MainBlock() {
  const dispatch = useAppDispatch();
  const options = useAppSelector(
    (state) => state.rootReducer.vacanciesReducer.options
  );
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    const textQuery = searchParam.get("text") || options.textFilter;
    const areaQuery = searchParam.get("area") || options.city.id;
    const pageQuery = searchParam.get("page") || options.page;
    dispatch(changeCity(areaQuery));
    dispatch(activePage(pageQuery));
    dispatch(firstSkillsEntering(textQuery));
  }, []);

  useEffect(() => {
    if (options) {
      const filter = options.filter !== "" ? `${options.filter}` : "";
      const skill =
        options.skills.length !== 0 ? `%20${options.skills.join(`%20`)}` : "";

      dispatch(installFilter({ type: "TextFilter", filter: filter + skill }));
      setSearchParam({
        text: options.textFilter,
        area: options.city.id,
        page: `${options.page}`,
      });
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
            mb={15}
            total={options.pages}
            value={options.page}
            onChange={(newPage) => dispatch(activePage(newPage))}
            style={{ alignSelf: "center" }}
          ></Pagination>
        </Stack>
      </Flex>
    </Container>
  );
}

export default MainBlock;
