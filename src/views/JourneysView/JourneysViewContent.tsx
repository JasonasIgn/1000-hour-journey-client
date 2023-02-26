import { useEffect, useState, FC } from "react";
import { fetchJourneysListEffect } from "store/features/journeys/effects";
import {
  Button,
  Container,
  Flex,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import {
  getJourneysList,
  getJourneysListLoadingState,
} from "store/features/journeys/selectors";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  JourneysList,
  AddJourneyDialog,
  EditJourneyDialog,
  Select,
} from "components";
import { JourneyListItem } from "store/features/journeys/types";
import { Paper } from "components/Paper";
import { Option } from "types";
import { OrderOption, SortOption, sortOptions } from "./constants";
import { useListSorting } from "./hooks";

export const JourneysViewContent: FC = () => {
  const dispatch = useAppDispatch();
  const listLoadingState = useAppSelector(getJourneysListLoadingState);
  const journeysList = useAppSelector(getJourneysList);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJourney, setEditingJourney] = useState<JourneyListItem | null>(
    null
  );
  const [sortedList, params, setParams] = useListSorting(journeysList);

  useEffect(() => {
    if (listLoadingState === "pristine") {
      dispatch(fetchJourneysListEffect());
    }
  }, [dispatch, listLoadingState]);

  return (
    <Container maxW="6xl" py={5}>
      <Paper flexDirection="column" height="100%" sx={{ borderRadius: 0 }}>
        <Flex borderBottom="1px solid" borderColor="brand.600" py={5} px={5}>
          <Flex direction="column" width="200px" justifyContent="space-between">
            <Text>Sort by</Text>
            <Select<Option>
              options={sortOptions}
              placeholder="sort by"
              defaultValue={sortOptions.find(
                (option) => option.value === params.sortBy
              )}
              onChange={(val) => {
                if (val) {
                  setParams({ ...params, sortBy: val.value as SortOption });
                }
              }}
            />
          </Flex>
          <Flex
            direction="column"
            width="160px"
            ml={6}
            justifyContent="space-between"
          >
            <Text>Order</Text>
            <RadioGroup
              defaultValue="desc"
              onChange={(value: OrderOption) =>
                setParams({ ...params, orderBy: value })
              }
            >
              <Radio value="desc">Descending</Radio>
              <Radio value="asc">Ascending</Radio>
            </RadioGroup>
          </Flex>
          <Button
            onClick={() => setModalOpen(true)}
            ml="auto"
            leftIcon={<AddIcon />}
          >
            Add journey
          </Button>
        </Flex>
        <Flex direction="column" px={5} overflow="auto">
          <JourneysList
            journeys={sortedList}
            openEditJourneyDialog={setEditingJourney}
          />
        </Flex>
      </Paper>
      <AddJourneyDialog open={modalOpen} setOpen={setModalOpen} />
      <EditJourneyDialog
        journey={editingJourney}
        handleClose={() => setEditingJourney(null)}
      />
    </Container>
  );
};
