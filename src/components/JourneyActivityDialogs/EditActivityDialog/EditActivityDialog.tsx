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
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "store/hooks";
import {
  TextAreaField,
  InputField,
  UploadField,
  ConfirmationDialog,
} from "components";
import {
  deleteJourneyActivityEffect,
  updateJourneyActivityEffect,
} from "store/features/journeys/effects";
import { JourneyActivityFormData } from "../types";
import { journeyActivityFormValidation } from "../validation";
import { Activity, Journey } from "store/features/journeys/types";
import { SwitchField } from "components/SwitchField";

interface EditActivityDialogProps {
  handleClose: () => void;
  journey: Journey;
  activity?: Activity;
}

export const EditActivityDialog: FC<EditActivityDialogProps> = ({
  handleClose,
  journey,
  activity,
}) => {
  const toast = useToast();
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const isOpen = Boolean(activity);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, reset, setValue } =
    useForm<JourneyActivityFormData>({
      resolver: yupResolver(journeyActivityFormValidation),
    });
  const { isSubmitting, errors, isValid } = formState;

  const onSubmit = async (data: JourneyActivityFormData) => {
    try {
      await dispatch(
        updateJourneyActivityEffect({
          data,
          journeyId: journey.id,
          activityId: activity?.id as number,
        })
      ).unwrap();
      handleClose();
      toast({
        description: "Changes saved",
      });
    } catch (e) {
      console.error("Caught error", e);
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(
        deleteJourneyActivityEffect({
          journeyId: journey.id,
          activityId: activity?.id as number,
        })
      ).unwrap();
      handleClose();
      toast({
        description: "Activity deleted",
      });
    } catch (e) {
      toast({
        description: "Failed to delete the activity",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        name: activity?.name,
        description: activity?.description || undefined,
        completed: activity?.completed || false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, reset]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit activity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid
              templateRows="repeat(3, auto)"
              templateColumns="repeat(2, 1fr)"
              gap={4}
            >
              <GridItem colSpan={2}>
                <InputField
                  label="Title"
                  {...register("name")}
                  errorMessage={errors.name?.message}
                  formControlProps={{ mb: 3 }}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <TextAreaField
                  label="Description"
                  {...register("description")}
                  errorMessage={errors.description?.message}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <SwitchField
                  label="Completed"
                  {...register("completed")}
                  errorMessage={errors.completed?.message}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <UploadField
                  label="Media"
                  {...register("media")}
                  onClear={() => setValue("media", {} as FileList)}
                  initialPreviewSrc={
                    activity?.mediaUrl
                      ? `${activity?.mediaUrl}?${activity.updatedAt.toString()}` // prevent caching
                      : undefined
                  }
                />
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={journey.finished}
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
            <Button
              variant="ghost"
              type="submit"
              isDisabled={isSubmitting || !isValid || journey.finished}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ConfirmationDialog
        actionText="Delete"
        bodyText="This will delete the activity permanently and remove all associations with related logs"
        isOpen={confirmationDialogOpen}
        onAction={handleDelete}
        onClose={() => {
          setConfirmationDialogOpen(false);
        }}
      />
    </>
  );
};
