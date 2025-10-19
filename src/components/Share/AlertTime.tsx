import { Alert } from "@mantine/core";

function AlertTime({ error }: { error: string }) {
  return <Alert title="Ошибочка вышла">{error}</Alert>;
}

export default AlertTime;
