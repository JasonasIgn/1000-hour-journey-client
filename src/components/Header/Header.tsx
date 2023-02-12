import { FC } from "react";
import { Flex, Image, Link } from "@chakra-ui/react";
import { JourneyTitle } from "components";
import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import Logo from "resources/logo.png";
import { getJourney } from "store/features/journeys/selectors";

export const HEADER_HEIGHT_PX = 60;

export const Header: FC = () => {
  const currentJourney = useAppSelector(getJourney);

  return (
    <Flex
      width="100%"
      height={`${HEADER_HEIGHT_PX}px`}
      padding={2.5}
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex height="full">
        <Link as={RouterLink} to="/" height="100%">
          <Image src={Logo} alt="1000 hour journeys logo" height="100%" />
        </Link>
      </Flex>
      <JourneyTitle title={currentJourney?.title || ""} />
    </Flex>
  );
};
