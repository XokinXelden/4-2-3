import { Container, Flex, Pagination, Stack } from "@mantine/core";
import SkillsOption from "../Options/Skill/SkillsOption";
// import CityOption from "../Options/CityOption";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { activePage } from "../../Reducer/reducerSlicer";
import { useSearchParams } from "react-router-dom";
import TabsVacancies from "./TabsVacancies";
import useVacanciesLoader from "../hooks/vacanciesLoader";

function MainBlock() {
  const dispatch = useAppDispatch();
  const options = useAppSelector(
    (state) => state.rootReducer.vacanciesReducer.options
  );
  const [searchParam, setSearchParam] = useSearchParams();

  useVacanciesLoader(options, searchParam, setSearchParam);

  return (
    <Container>
      <Flex justify="center" gap={30}>
        <Stack flex={1}>
          <SkillsOption />
          {/* <CityOption /> */}
        </Stack>
        <Stack flex={2}>
          <TabsVacancies />
          <Pagination
            w="auto"
            mb={50}
            total={options.pages}
            defaultValue={+(searchParam.get("page") ?? "1")}
            onChange={(newPage) => dispatch(activePage(newPage))}
            style={{ alignSelf: "center" }}
          ></Pagination>
        </Stack>
      </Flex>
    </Container>
  );
}

export default MainBlock;
