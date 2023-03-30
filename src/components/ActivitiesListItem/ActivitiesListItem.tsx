import { FC, useState } from "react";
import { Image, Switch, Td, Tr, Icon, Flex } from "@chakra-ui/react";
import Logo from "resources/logo.png";
import { Activity } from "store/features/journeys/types";
import { getImageSrc } from "utils/helpers";
import { ActivityHoursMap } from "views/JourneyView/utils";
import { ReactComponent as CompletedIcon } from "resources/checkmark.svg";
import { ReactComponent as CloseIcon } from "resources/close.svg";
import { AppDispatch } from "store";
import { updateJourneyActivityEffect } from "store/features/journeys/effects";

interface ActivitiesListItemProps {
  dispatch: AppDispatch;
  activity: Activity;
  setActivityToEdit: (activity: Activity) => void;
  activitiesSpentTimeMap: ActivityHoursMap;
  isJourneyFinished: boolean;
}

export const ActivitiesListItem: FC<ActivitiesListItemProps> = ({
  dispatch,
  activity,
  setActivityToEdit,
  activitiesSpentTimeMap,
  isJourneyFinished,
}) => {
  const [loading, setLoading] = useState(false);

  const handleOnSwitchChange = async (includeInGoal: boolean) => {
    setLoading(true);
    await dispatch(
      updateJourneyActivityEffect({
        data: { includeInDailyGoal: includeInGoal },
        journeyId: activity.journeyId,
        activityId: activity?.id as number,
      })
    );
    setLoading(false);
  };

  return (
    <Tr
      key={activity.id}
      _hover={{ bg: "brand.700" }}
      cursor="pointer"
      onClick={(e) => {
        setActivityToEdit(activity);
      }}
    >
      <Td width="50px" p={0}>
        <Image
          width="50px"
          maxH="69px"
          filter="brightness(0.8)"
          src={
            activity?.mediaUrl
              ? `${getImageSrc(
                  activity.mediaUrl
                )}?${activity.updatedAt.toString()}` // Prevent caching
              : Logo
          }
        />
      </Td>
      <Td pl={5}>{activity.name}</Td>
      <Td>
        <Flex justifyContent="center">
          <Icon
            width="24px"
            height="24px"
            as={activity.completed ? CompletedIcon : CloseIcon}
            color={activity.completed ? "green" : "red.600"}
          />
        </Flex>
      </Td>
      <Td>
        <Switch
          isDisabled={loading || isJourneyFinished}
          size="lg"
          onClickCapture={async (e) => {
            e.stopPropagation();
            if (isJourneyFinished) {
              return;
            }
            await handleOnSwitchChange(!activity.includeInDailyGoal);
          }}
          isChecked={activity.includeInDailyGoal}
        />
      </Td>
      <Td isNumeric>
        {`${activitiesSpentTimeMap[activity.id.toString()] || 0}`}
      </Td>
    </Tr>
  );
};
