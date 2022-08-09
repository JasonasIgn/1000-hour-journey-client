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
import { AddJourneyAchievementFormData } from "./types";
import { addJourneyAchievementFormValidation } from "./validation";
import { NumberInputField } from "../NumberInputField/NumberInputField";
import { InputField } from "../InputField/InputField";
import { getLastJourneyLog } from "../../store/features/journeys/selectors";
import { LogExtended } from "../../store/features/journeys/types";
import { logJourneyAchievementEffect } from "../../store/features/journeys/effects";

interface AddJourneyAchievementDialogProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  journeyId: number;
  activeLog: LogExtended;
  currentHour: number;
}

export const AddJourneyAchievementDialog: React.FC<
  AddJourneyAchievementDialogProps
> = ({ open, setOpen, journeyId, activeLog, currentHour }) => {
  const dispatch = useAppDispatch();
  const lastLog = useAppSelector(getLastJourneyLog);
  const lastLogDate = lastLog
    ? format(new Date(lastLog?.loggedOn), "yyyy-MM-dd")
    : undefined;

  const { register, handleSubmit, formState, control, reset } =
    useForm<AddJourneyAchievementFormData>({
      defaultValues: {
        loggedOnDate: format(new Date(activeLog.loggedOn), "yyyy-MM-dd"),
        loggedAtHour: currentHour,
      },
      resolver: yupResolver(addJourneyAchievementFormValidation),
    });
  const { isSubmitting, errors } = formState;
  const onSubmit = async (data: AddJourneyAchievementFormData) => {
    try {
      await dispatch(logJourneyAchievementEffect({ data, id: journeyId }));
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
        <ModalHeader>Log an achievement</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TextAreaField
            label="Description"
            {...register("description")}
            errorMessage={errors.description?.message}
          />
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
          <InputField
            type="date"
            label="Date of achievement"
            min={lastLogDate || undefined}
            {...register("loggedOnDate")}
            errorMessage={errors.loggedOnDate?.message}
            isDisabled
          />
          <InputField type="file" label="Media" {...register("media")} />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button variant="ghost" type="submit" disabled={isSubmitting}>
            Log
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
