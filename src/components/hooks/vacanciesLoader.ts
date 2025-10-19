import { useAppDispatch } from "./redux";
import { useEffect } from "react";
import {
  activePage,
  changeCity,
  firstSkillsEntering,
  installFilter,
} from "../../Reducer/reducerSlicer";
import { fetchVacanciesList } from "../../Reducer/reducerThunk";
import type { OptionsType } from "../types";
import { useParams } from "react-router-dom";

type ParamType = { get: (text: string) => string | null };
type setParamType = (obj: { text: string; page: string }) => void;

function useVacanciesLoader(
  options: OptionsType,
  Param: ParamType,
  setParam: setParamType
) {
  const dispatch = useAppDispatch();
  const { cityName } = useParams();
  useEffect(() => {
    const textQuery = Param.get("text") || options.textFilter;
    const areaQuery = cityName || options.city.id;
    const pageQuery = Param.get("page") || options.page;
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
      setParam({
        text: options.textFilter,
        page: `${options.page}`,
      });
      dispatch(fetchVacanciesList(options));
    }
  }, [dispatch, options]);
}
export default useVacanciesLoader;
