import { Flex, Image, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Logo from "resources/logo.png";

export const Header = () => {
  return (
    <Flex height="60px" padding={2.5}>
      <Link as={RouterLink} to="/" height="100%">
        <Image src={Logo} alt="1000 hour journeys logo" height="100%" />
      </Link>
    </Flex>
  );
};
