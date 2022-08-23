import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateJourneyEffect } from "store/features/journeys/effects";
import { useAppDispatch } from "store/hooks";
import { InputField, TextAreaField, UploadField } from "components";
import { JourneyFormData } from "../types";
import { journeyFormValidation } from "../validation";
import { JourneyListItem } from "store/features/journeys/types";

interface EditJourneyDialogProps {
  handleClose: () => void;
  journey: JourneyListItem | null;
}

export const EditJourneyDialog: FC<EditJourneyDialogProps> = ({
  handleClose,
  journey,
}) => {
  const dispatch = useAppDispatch();
  const isOpen = Boolean(journey);
  const { register, handleSubmit, formState, reset, setValue } =
    useForm<JourneyFormData>({
      resolver: yupResolver(journeyFormValidation),
    });
  const { isSubmitting, errors } = formState;
  const onSubmit = async (data: any) => {
    try {
      if (!journey) {
        throw new Error("No journey selected");
      }
      await dispatch(updateJourneyEffect({ data, journeyId: journey.id }));
      handleClose();
    } catch (e) {
      console.error("Caught error", e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        title: journey?.title,
        description: journey?.description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Edit journey</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputField
            label="Title"
            {...register("title")}
            errorMessage={errors.title?.message}
            formControlProps={{ mb: 3 }}
          />
          <TextAreaField
            label="Description"
            {...register("description")}
            errorMessage={errors.description?.message}
            formControlProps={{ mb: 3 }}
          />
          <UploadField
            label="Media"
            {...register("media")}
            onClear={() => setValue("media", {} as FileList)}
            initialPreviewSrc={journey?.mediaUrl}
          />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={handleClose}>
            Close
          </Button>
          <Button variant="ghost" type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
