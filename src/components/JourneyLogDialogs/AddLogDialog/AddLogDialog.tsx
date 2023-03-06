import {
  Button,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useEffect, FC, useState, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import format from "date-fns/format";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  TextAreaField,
  NumberInputField,
  InputField,
  UploadField,
  CreatableSelectField,
} from "components";
import { JourneyLogFormData, OptionWithColor } from "../types";
import { journeyLogFormValidation } from "../validation";
import {
  createJourneyLogEffect,
  createJourneyActivityEffect,
} from "store/features/journeys/effects";
import { getLastJourneyLog } from "store/features/journeys/selectors";
import { dateFormats } from "utils/constants";
import { getTimerTime } from "store/features/timer/selectors";
import { closeTimer, pauseTimer, resetTimer } from "store/features/timer/slice";
import { Activity } from "store/features/journeys/types";
import {
  getActivityOption,
  getActivityOptionsForDailyGoal,
  getDailyGoalActivityIds,
} from "../utils";
import { fetchDailyGoalEffect } from "store/features/dailyGoal/effects";
import { getDailyGoal } from "store/features/dailyGoal/selectors";

interface AddLogDialogProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  journeyId: number;
  activities: Activity[];
}

export const AddLogDialog: FC<AddLogDialogProps> = ({
  open,
  setOpen,
  journeyId,
  activities,
}) => {
  const dispatch = useAppDispatch();
  const dailyGoal = useAppSelector(getDailyGoal);
  const toast = useToast();
  const lastLog = useAppSelector(getLastJourneyLog);
  const timerTime = useAppSelector(getTimerTime);
  const [shouldResetTimer, setShouldResetTimer] = useState(true);
  const lastLogDate = lastLog
    ? format(new Date(lastLog?.loggedOn), dateFormats.standart)
    : undefined;

  const activityTaskIds = useMemo(
    () => getDailyGoalActivityIds(dailyGoal),
    [dailyGoal]
  );

  const {
    register,
    handleSubmit,
    formState,
    control,
    reset,
    setValue,
    getValues,
  } = useForm<JourneyLogFormData>({
    defaultValues: {
      loggedOn: format(new Date(), dateFormats.standart),
      activities: [],
    },
    resolver: yupResolver(journeyLogFormValidation),
  });
  const { isSubmitting, errors } = formState;
  const onSubmit = async (data: JourneyLogFormData) => {
    try {
      await dispatch(createJourneyLogEffect({ data, journeyId }));
      if (shouldResetTimer) {
        dispatch(resetTimer());
        dispatch(closeTimer());
      }
      setOpen(false);
      toast({
        description: "Log created",
      });

      setTimeout(() => {
        dispatch(fetchDailyGoalEffect());
      }, 1000);
    } catch (e) {
      console.error("Caught error", e);
    }
  };
  useEffect(() => {
    if (open) {
      dispatch(pauseTimer());
      setShouldResetTimer(true);
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reset]);

  useEffect(() => {
    setValue(
      "hoursSpent",
      timerTime.hours + Math.round(timerTime.minutes / 6) / 10
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerTime]);

  const onCreateOption = async (value: string) => {
    try {
      const currentValue = getValues("activities");
      const createdActivity = await dispatch(
        createJourneyActivityEffect({
          data: { name: value },
          journeyId,
        })
      ).unwrap();
      setValue("activities", [
        ...currentValue,
        getActivityOption(createdActivity),
      ]);
    } catch (e) {
      console.error("Error creating activity", e);
    }
  };

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} size="xl">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Create a log</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid
            templateRows="repeat(3, auto)"
            templateColumns="repeat(2, 1fr)"
            gap={4}
          >
            <GridItem colSpan={2}>
              <TextAreaField
                label="Description"
                {...register("description")}
                errorMessage={errors.description?.message}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Controller
                name="hoursSpent"
                control={control}
                render={({
                  field: { onChange, ...rest },
                  fieldState: { error },
                }) => (
                  <NumberInputField
                    label="Hours Spent"
                    errorMessage={error?.message}
                    onChange={(val) => {
                      onChange(val);
                      setShouldResetTimer(false);
                    }}
                    {...rest}
                  />
                )}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <InputField
                type="date"
                label="Date of log"
                min={lastLogDate || undefined}
                {...register("loggedOn")}
                errorMessage={errors.loggedOn?.message}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <CreatableSelectField<OptionWithColor>
                options={getActivityOptionsForDailyGoal(
                  activities,
                  activityTaskIds
                )}
                control={control as any}
                name="activities"
                label="Activities"
                onCreateOption={onCreateOption}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <UploadField
                label="Media"
                {...register("media")}
                onClear={() => setValue("media", {} as FileList)}
              />
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button variant="ghost" type="submit" isDisabled={isSubmitting}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
