import { Flex } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useAppDispatch } from "store/hooks";
import { setHeaderTitle } from "store/features/journey/slice";
import { ShopViewContent } from "./ShopViewContent";

export const ShopView: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle("Shop"));
  }, [dispatch]);

  return (
    <Flex overflow="auto" flexGrow={1} flexDirection="column" bg="brand.900">
      <ShopViewContent />
    </Flex>
  );
};
