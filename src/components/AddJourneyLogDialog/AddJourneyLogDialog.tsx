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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import format from "date-fns/format";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { TextAreaField } from "../TextAreaField/TextAreaField";
import { AddJourneyLogFormData } from "./types";
import { addJourneyFormValidation } from "./validation";
import { NumberInputField } from "../NumberInputField/NumberInputField";
import { createJourneyLogEffect } from "../../store/features/journeys/effects";
import { InputField } from "../InputField/InputField";
import { getLastJourneyLog } from "../../store/features/journeys/selectors";

interface AddJourneyLogDialogProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  journeyId: number;
}

export const AddJourneyLogDialog: React.FC<AddJourneyLogDialogProps> = ({
  open,
  setOpen,
  journeyId,
}) => {
  const dispatch = useAppDispatch();
  const lastLog = useAppSelector(getLastJourneyLog);
  const lastLogDate = lastLog
    ? format(new Date(lastLog?.loggedOn), "yyyy-MM-dd")
    : undefined;

  const { register, handleSubmit, formState, control, reset } =
    useForm<AddJourneyLogFormData>({
      defaultValues: {
        loggedOn: format(new Date(), "yyyy-MM-dd"),
      },
      resolver: yupResolver(addJourneyFormValidation),
    });
  const { isSubmitting, errors } = formState;
  const onSubmit = async (data: AddJourneyLogFormData) => {
    try {
      await dispatch(createJourneyLogEffect({ data, id: journeyId }));
      reset();
      setOpen(false);
    } catch (e) {
      console.error("Caught error", e);
    }
  };

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Create new log</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TextAreaField
            label="Description"
            {...register("description")}
            errorMessage={errors.description?.message}
          />
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
          <InputField
            type="date"
            label="Date of log"
            min={lastLogDate || undefined}
            {...register("loggedOn")}
            errorMessage={errors.loggedOn?.message}
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
