import { FC } from "react";
import { Heading } from "@chakra-ui/react";

interface JourneyTitleProps {
  title: string;
}

export const JourneyTitle: FC<JourneyTitleProps> = ({ title }) => {
  return (
    <Heading
      whiteSpace="nowrap"
      width="full"
      textAlign="center"
      flex={0}
      position="absolute"
      zIndex={-1}
    >
      {title}
    </Heading>
  );
};
