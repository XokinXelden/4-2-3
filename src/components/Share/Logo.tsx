import { Box, Image } from "@mantine/core";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Box style={{ justifyItems: "flex-start" }}>
      <Link to="/">
        <Image src="/Logo.png" h={30} w={116} />
      </Link>
    </Box>
  );
}
export default Logo;
