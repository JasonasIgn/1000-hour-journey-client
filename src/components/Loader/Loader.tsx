import { Center } from "@chakra-ui/react";
import { FC } from "react";
import { ThreeDots } from "react-loader-spinner";

export const Loader: FC = () => {
  return (
    <Center height="100%">
      <ThreeDots
        height="120"
        width="120"
        radius="9"
        color="var(--chakra-colors-brand-500)"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </Center>
  );
};
