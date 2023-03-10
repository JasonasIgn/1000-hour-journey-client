import { useEffect, FC, useState } from "react";
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
import { useAppDispatch } from "store/hooks";
import {
  TextAreaField,
  NumberInputField,
  InputField,
  UploadField,
  ConfirmationDialog,
} from "components";
import { JourneyAchievementFormData } from "../types";
import { addJourneyAchievementFormValidation } from "../validation";
import { Achievement } from "store/features/journeys/types";
import {
  deleteJourneyAchievementEffect,
  editJourneyAchievementEffect,
} from "store/features/journeys/effects";
import { dateFormats } from "utils/constants";

interface EditJourneyAchievementDialogProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  journeyId: number;
  achievement: Achievement;
}

export const EditJourneyAchievementDialog: FC<
  EditJourneyAchievementDialogProps
> = ({ open, setOpen, journeyId, achievement }) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const { register, handleSubmit, formState, control, reset, setValue } =
    useForm<JourneyAchievementFormData>({
      defaultValues: {
        loggedOnDate: format(
          new Date(achievement.loggedOnDate),
          dateFormats.standart
        ),
        description: achievement?.description,
        loggedAtHour: achievement.loggedAtHour,
      },
      resolver: yupResolver(addJourneyAchievementFormValidation),
    });
  const { isSubmitting, errors } = formState;
  const onSubmit = async (data: JourneyAchievementFormData) => {
    try {
      await dispatch(
        editJourneyAchievementEffect({
          data,
          journeyId,
          achievementId: achievement.id,
        })
      ).unwrap();
      setOpen(false);
      toast({
        description: "Changes saved",
      });
    } catch (e) {
      toast({
        description: "Failed to update the achievement",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(
        deleteJourneyAchievementEffect({
          journeyId,
          achievementId: achievement.id,
        })
      ).unwrap();
      setOpen(false);
      toast({
        description: "Achievement deleted",
      });
    } catch (e) {
      toast({
        description: "Failed to delete the achievement",
      });
    }
  };

  useEffect(() => {
    if (open) {
      reset({
        loggedAtHour: achievement.loggedAtHour,
        loggedOnDate: format(
          new Date(achievement.loggedOnDate),
          dateFormats.standart
        ),
        description: achievement?.description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reset]);

  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)} size="xl">
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit an achievement</ModalHeader>
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
                  initialPreviewSrc={
                    achievement?.mediaUrl
                      ? `${
                          achievement.mediaUrl
                        }?${achievement.updatedAt.toString()}` // prevents caching
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
            <Button mr={3} onClick={() => setOpen(false)}>
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
        bodyText="This will delete the achievement permanently"
        isOpen={confirmationDialogOpen}
        onAction={handleDelete}
        onClose={() => {
          setConfirmationDialogOpen(false);
        }}
      />
    </>
  );
};
