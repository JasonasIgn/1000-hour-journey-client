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
import { useEffect, FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "store/hooks";
import { TextAreaField, InputField, UploadField } from "components";
import { createJourneyActivityEffect } from "store/features/journeys/effects";
import { JourneyActivityFormData } from "../types";
import { journeyActivityFormValidation } from "../validation";

interface AddActivityDialogProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  journeyId: number;
}

export const AddActivityDialog: FC<AddActivityDialogProps> = ({
  open,
  setOpen,
  journeyId,
}) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, reset, setValue } =
    useForm<JourneyActivityFormData>({
      defaultValues: {
        name: "",
        description: "",
      },
      resolver: yupResolver(journeyActivityFormValidation),
    });
  const { isSubmitting, errors, isValid } = formState;

  const onSubmit = async (data: JourneyActivityFormData) => {
    try {
      await dispatch(createJourneyActivityEffect({ data, journeyId })).unwrap();
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
    <Modal isOpen={open} onClose={() => setOpen(false)} size="xl">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Create an activity</ModalHeader>
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
              />
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button
            variant="ghost"
            type="submit"
            isDisabled={isSubmitting || !isValid}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
