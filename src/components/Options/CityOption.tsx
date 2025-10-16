import { Select } from "@mantine/core";
import Base from "../Share/Base";
import { IconMapPin } from "@tabler/icons-react";
import { useAppDispatch } from "../hooks/redux";
import { changeCity } from "../../Reducer/reducerSlicer";

function CityOption() {
  const dispatch = useAppDispatch();
  return (
    <Base>
      <Select
        leftSection={<IconMapPin size={18} />}
        placeholder="Все города"
        mr={5}
        size="sm"
        miw={243}
        radius={8}
        data={["Все города", "Москва", "Санкт-Петербург"]}
        onChange={(value) => {
          dispatch(changeCity(value));
        }}
      ></Select>
    </Base>
  );
}
export default CityOption;
