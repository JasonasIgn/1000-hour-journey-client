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
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "store/hooks";
import { TextAreaField, InputField, UploadField } from "components";
import {
  deleteJourneyActivityEffect,
  updateJourneyActivityEffect,
} from "store/features/journeys/effects";
import { JourneyActivityFormData } from "../types";
import { journeyActivityFormValidation } from "../validation";
import { Tag } from "store/features/journeys/types";

interface EditActivityDialogProps {
  handleClose: () => void;
  journeyId: number;
  activity?: Tag;
}

export const EditActivityDialog: FC<EditActivityDialogProps> = ({
  handleClose,
  journeyId,
  activity,
}) => {
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
          journeyId,
          activityId: activity?.id as number,
        })
      ).unwrap();
      handleClose();
    } catch (e) {
      console.error("Caught error", e);
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(
        deleteJourneyActivityEffect({
          journeyId,
          activityId: activity?.id as number,
        })
      ).unwrap();
      handleClose();
    } catch (e) {
      console.error("Caught error", e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        name: activity?.name,
        description: activity?.description || undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, reset]);

  return (
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
          <Button mr="auto" onClick={handleDelete}>
            Delete
          </Button>
          <Button mr={3} onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="ghost"
            type="submit"
            isDisabled={isSubmitting || !isValid}
          >
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
