import { Select } from "@mantine/core";
import Base from "../Share/Base";
import { IconMapPin } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { changeCity } from "../../Reducer/reducerSlicer";

function CityOption() {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.vacancies.options.city);
  return (
    <Base>
      <Select
        leftSection={<IconMapPin size={18} />}
        placeholder="Все города"
        value={city.name}
        mr={5}
        size="sm"
        miw={243}
        radius={8}
        data={["Все города", "Москва", "Санкт-Петербург", "Барнаул"]}
        onChange={(value) => {
          dispatch(changeCity(value));
        }}
      ></Select>
    </Base>
  );
}
export default CityOption;
