import { Stack, Tabs } from "@mantine/core";
import { cities } from "../Share/cityBase";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { changeCity } from "../../Reducer/reducerSlicer";
import { useEffect } from "react";

function allCity() {
  const allCity: { name: string; translated: string }[] = [];
  for (const key in cities) {
    if (key !== "113") {
      allCity.push(cities[key]);
    }
  }
  return allCity;
}

function TabsVacancies() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const city = useAppSelector(
    (state) => state.rootReducer.vacanciesReducer.options.city
  );
  const { cityName } = useParams();
  function cityChecker(city: string) {
    let checker: boolean = true;
    for (const key in cities) {
      if (cities[key].translated === city) {
        checker = false;
      }
    }
    return checker;
  }
  useEffect(() => {
    if (typeof cityName === "string" && cityChecker(cityName)) {
      navigate("/Not-Found", {
        state: {
          status: "404",
          text: "Такого города в нашей базе данных нет :(",
        },
        replace: true,
      });
    }
  }, [location.pathname, cityName]);

  return (
    <Tabs
      defaultValue={cityName ?? city.name}
      onChange={(city) => {
        dispatch(changeCity(city));
        navigate(`city/${city}`);
      }}
    >
      <Tabs.List mb={15}>
        {allCity().map((city, i) => {
          return (
            <Tabs.Tab key={`Tab${i}`} value={city.translated}>
              {city.name}
            </Tabs.Tab>
          );
        })}
      </Tabs.List>
      <Stack gap={10}>
        <Outlet />
      </Stack>
    </Tabs>
  );
}

export default TabsVacancies;
