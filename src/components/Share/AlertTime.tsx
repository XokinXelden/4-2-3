import { Alert, Button } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useNavigate } from "react-router-dom";
import { errorClean } from "../../Reducer/reducerSlicer";

function AlertTime({
  alertText,
  btn,
}: {
  alertText?: { title: string; message: string };
  btn: boolean;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.vacancies);
  function goBack() {
    navigate("/vacancies", { replace: true });
    dispatch(errorClean());
  }

  if (error) {
    return (
      <>
        <Alert title="Ошибочка вышла">{error}</Alert>
        {btn ?? (
          <Button
            onClick={() => {
              goBack();
            }}
          >
            Вернуться на главную
          </Button>
        )}
      </>
    );
  } else {
    return (
      <>
        <Alert title={alertText?.title}>{alertText?.message}</Alert>
        {btn ?? <Button onClick={() => goBack()}>Вернуться на главную</Button>}
      </>
    );
  }
}

export default AlertTime;
