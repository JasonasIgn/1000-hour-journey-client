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
import { createJourneyEffect } from "store/features/journeys/effects";
import { useAppDispatch } from "store/hooks";
import { InputField, TextAreaField } from "components";
import { AddJourneyFormData } from "./types";
import { addJourneyFormValidation } from "./validation";

interface AddJourneyDialogProps {
  setOpen: (open: boolean) => void;
  open: boolean;
}

export const AddJourneyDialog: FC<AddJourneyDialogProps> = ({
  open,
  setOpen,
}) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, reset } =
    useForm<AddJourneyFormData>({
      resolver: yupResolver(addJourneyFormValidation),
    });
  const { isSubmitting, errors } = formState;
  const onSubmit = async (data: any) => {
    try {
      await dispatch(createJourneyEffect(data));
      setOpen(false);
    } catch (e) {
      console.error("Caught error", e);
    }
  };

  useEffect(() => {
    if (open) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reset]);

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Create new journey</ModalHeader>
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
          />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button variant="ghost" type="submit" disabled={isSubmitting}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
