import { useAppDispatch } from "./redux";
import { useEffect } from "react";
import {
  activePage,
  changeCity,
  firstSkillsEntering,
  // installFilter,
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
    const textQuery = Param.get("text") || "";
    const areaQuery = cityName || options.city.name;
    const pageQuery = Param.get("page") || options.page;
    dispatch(changeCity(areaQuery));
    dispatch(activePage(pageQuery));
    dispatch(firstSkillsEntering(textQuery));
  }, []);

  useEffect(() => {
    if (options) {
      const filter = options.filter !== "" ? `${options.filter}` : "";
      const skill =
        options.skills.length !== 0 ? `${options.skills.join(` `)}` : "";
      const newFilter =
        filter !== ""
          ? `${filter}` + (skill.length !== 0 ? `%` + skill : "")
          : skill.length !== 0
          ? "%" + skill
          : "";

      // dispatch(installFilter({ type: "TextFilter", filter: newFilter }));
      setParam({
        text: newFilter,
        page: `${options.page}`,
      });
      dispatch(
        fetchVacanciesList({
          page: "" + options.page,
          area: options.city.id,
          text: newFilter,
        })
      );
    }
  }, [dispatch, options]);
}
export default useVacanciesLoader;
