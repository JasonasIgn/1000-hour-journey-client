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
  ConfirmationDialog,
} from "components";
import { JourneyLogFormData } from "../types";
import { journeyLogFormValidation } from "../validation";
import {
  createJourneyActivityEffect,
  deleteJourneyLogEffect,
  updateJourneyLogEffect,
} from "store/features/journeys/effects";
import { useEffect, FC, useState } from "react";
import { dateFormats } from "utils/constants";
import { LogExtended, Activity } from "store/features/journeys/types";
import { setEditLogDialogOpen } from "store/features/journey/slice";
import { getEditLogDialogOpen } from "store/features/journey/selectors";
import { getActivityOption, getActivityOptionsFromIds } from "../utils";
import { Option } from "types";
import { getActivitiesDictionary } from "store/features/journeys/utils";
import { fetchDailyGoalEffect } from "store/features/dailyGoal/effects";

interface EditLogDialogProps {
  journeyId: number;
  log: LogExtended;
  activities: Activity[];
}

export const EditLogDialog: FC<EditLogDialogProps> = ({
  journeyId,
  log,
  activities,
}) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const activitiesDictionary = getActivitiesDictionary(activities);
  const open = useAppSelector(getEditLogDialogOpen);

  const handleClose = () => {
    dispatch(setEditLogDialogOpen(false));
  };

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
      loggedOn: format(new Date(log.loggedOn), dateFormats.standart),
      hoursSpent: log.hoursSpent,
      description: log.description,
      activities: getActivityOptionsFromIds(
        log.activities,
        activitiesDictionary
      ),
    },
    resolver: yupResolver(journeyLogFormValidation),
  });
  const { isSubmitting, errors } = formState;
  const onSubmit = async (data: JourneyLogFormData) => {
    try {
      await dispatch(
        updateJourneyLogEffect({ data, journeyId, logId: log.id })
      ).unwrap();
      handleClose();
      toast({
        description: "Changes saved",
      });
      setTimeout(() => {
        dispatch(fetchDailyGoalEffect());
      }, 1000);
    } catch (e) {
      toast({
        description: "Failed to update the log",
      });
    }
  };
  useEffect(() => {
    if (open) {
      reset({
        loggedOn: format(new Date(log.loggedOn), dateFormats.standart),
        hoursSpent: log.hoursSpent,
        description: log.description,
        activities: getActivityOptionsFromIds(
          log.activities,
          activitiesDictionary
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reset]);

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

  const handleDelete = async () => {
    try {
      await dispatch(
        deleteJourneyLogEffect({
          journeyId,
          logId: log.id,
        })
      ).unwrap();
      handleClose();
      toast({
        description: "Log deleted",
      });
      setTimeout(() => {
        dispatch(fetchDailyGoalEffect());
      }, 1000);
    } catch (e) {
      toast({
        description: "Failed to delete the log",
      });
    }
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit log</ModalHeader>
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
                  render={({ field, fieldState: { error } }) => (
                    <NumberInputField
                      label="Hours Spent"
                      {...field}
                      errorMessage={error?.message}
                    />
                  )}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <InputField
                  type="date"
                  label="Date of log"
                  disabled
                  {...register("loggedOn")}
                  errorMessage={errors.loggedOn?.message}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <CreatableSelectField<Option>
                  options={getActivityOptionsFromIds(
                    activities,
                    activitiesDictionary
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
                  initialPreviewSrc={
                    log?.mediaUrl
                      ? `${log.mediaUrl}?${log.updatedAt.toString()}` // prevents caching
                      : undefined
                  }
                />
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button
              mr="auto"
              onClick={() => {
                setConfirmationDialogOpen(true);
              }}
              variant="warning"
            >
              Delete
            </Button>
            <Button mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button variant="ghost" type="submit" isDisabled={isSubmitting}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ConfirmationDialog
        actionText="Delete"
        bodyText="This will delete the log permanently"
        isOpen={confirmationDialogOpen}
        onAction={handleDelete}
        onClose={() => {
          setConfirmationDialogOpen(false);
        }}
      />
    </>
  );
};
