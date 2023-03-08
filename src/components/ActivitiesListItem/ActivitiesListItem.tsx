import { FC, useState } from "react";
import { Image, Switch, Td, Tr } from "@chakra-ui/react";
import Logo from "resources/logo.png";
import { Activity } from "store/features/journeys/types";
import { getImageSrc } from "utils/helpers";
import { ActivityHoursMap } from "views/JourneyView/utils";
import { AppDispatch } from "store";
import { updateJourneyActivityEffect } from "store/features/journeys/effects";

interface ActivitiesListItemProps {
  dispatch: AppDispatch;
  activity: Activity;
  setActivityToEdit: (activity: Activity) => void;
  activitiesSpentTimeMap: ActivityHoursMap;
}

export const ActivitiesListItem: FC<ActivitiesListItemProps> = ({
  dispatch,
  activity,
  setActivityToEdit,
  activitiesSpentTimeMap,
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
      <Td whiteSpace="normal">{activity.description || ""}</Td>
      <Td>{activity.completed ? "Yes" : "No"}</Td>
      <Td>
        <Switch
          isDisabled={loading}
          size="lg"
          onClickCapture={async (e) => {
            e.stopPropagation();
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
