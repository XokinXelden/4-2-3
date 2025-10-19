import { Alert } from "@mantine/core";
import { useAppSelector } from "../hooks/redux";

function AlertTime({ alertError }: { alertError?: string }) {
  const { error } = useAppSelector(
    (state) => state.rootReducer.vacanciesReducer
  );

  if (error) {
    return <Alert title="Ошибочка вышла">{error}</Alert>;
  } else {
    return <Alert title="Неизвестная ошибка">{alertError}</Alert>;
  }
}

export default AlertTime;
