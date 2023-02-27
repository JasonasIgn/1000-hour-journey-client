import { FC } from "react";
import {
  Flex,
  FlexProps,
  Heading,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

interface LogStatCardLoaderProps extends FlexProps {
  heading: string;
}

export const LogStatCardLoader: FC<LogStatCardLoaderProps> = ({
  heading,
  ...props
}) => {
  return (
    <Flex direction="column" flex="1 1 auto" mr={6} {...props}>
      <Heading size="md" mb={2}>
        {heading}
      </Heading>
      <Stat>
        <StatLabel>Logged Logs</StatLabel>
        <StatNumber>
          <Skeleton height="24px" my="6px" width={20} />
        </StatNumber>
        <StatLabel>Hours Spent</StatLabel>
        <StatNumber>
          <Skeleton height="24px" my="6px" width={20} />
        </StatNumber>
        <StatLabel>Average Hours Per Log</StatLabel>
        <StatNumber>
          <Skeleton height="24px" my="6px" width={20} />
        </StatNumber>
      </Stat>
    </Flex>
  );
};
