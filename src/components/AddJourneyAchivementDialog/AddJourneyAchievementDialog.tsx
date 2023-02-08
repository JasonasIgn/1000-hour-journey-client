import { useEffect, FC } from "react";
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
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import format from "date-fns/format";
import { useAppDispatch } from "store/hooks";
import {
  TextAreaField,
  NumberInputField,
  InputField,
  UploadField,
} from "components";
import { AddJourneyAchievementFormData } from "./types";
import { addJourneyAchievementFormValidation } from "./validation";
import { LogExtended } from "store/features/journeys/types";
import { logJourneyAchievementEffect } from "store/features/journeys/effects";
import { dateFormats } from "utils/constants";

interface AddJourneyAchievementDialogProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  journeyId: number;
  activeLog: LogExtended;
  currentHour: number;
}

export const AddJourneyAchievementDialog: FC<
  AddJourneyAchievementDialogProps
> = ({ open, setOpen, journeyId, activeLog, currentHour }) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, control, reset, setValue } =
    useForm<AddJourneyAchievementFormData>({
      defaultValues: {
        loggedOnDate: format(
          new Date(activeLog.loggedOn),
          dateFormats.standart
        ),
        loggedAtHour: currentHour,
      },
      resolver: yupResolver(addJourneyAchievementFormValidation),
    });
  const { isSubmitting, errors } = formState;
  const onSubmit = async (data: AddJourneyAchievementFormData) => {
    try {
      await dispatch(logJourneyAchievementEffect({ data, journeyId }));
      setOpen(false);
    } catch (e) {
      console.error("Caught error", e);
    }
  };

  useEffect(() => {
    if (open) {
      reset({
        loggedAtHour: currentHour,
        loggedOnDate: format(
          new Date(activeLog.loggedOn),
          dateFormats.standart
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reset]);

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} size="xl">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Create an achievement</ModalHeader>
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
                name="loggedAtHour"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <NumberInputField
                    label="Journey hour snapshot"
                    {...field}
                    errorMessage={error?.message}
                    isDisabled
                  />
                )}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <InputField
                type="date"
                label="Date of achievement"
                {...register("loggedOnDate")}
                errorMessage={errors.loggedOnDate?.message}
                isDisabled
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
