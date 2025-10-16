import { Card } from "@mantine/core";

function Base({ children }: { children: React.ReactNode }) {
  return (
    <Card p={20} radius="lg" shadow="sm" withBorder>
      {children}
    </Card>
  );
}

export default Base;
