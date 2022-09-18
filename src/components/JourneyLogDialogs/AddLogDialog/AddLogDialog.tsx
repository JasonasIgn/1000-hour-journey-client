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
import { useEffect, FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import format from "date-fns/format";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  TextAreaField,
  NumberInputField,
  InputField,
  UploadField,
} from "components";
import { JourneyLogFormData } from "../types";
import { journeyLogFormValidation } from "../validation";
import { createJourneyLogEffect } from "store/features/journeys/effects";
import { getLastJourneyLog } from "store/features/journeys/selectors";
import { dateFormats } from "utils/constants";
import { getTimerTime } from "store/features/timer/selectors";
import { pauseTimer, resetTimer } from "store/features/timer/slice";

interface AddLogDialogProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  journeyId: number;
}

export const AddLogDialog: FC<AddLogDialogProps> = ({
  open,
  setOpen,
  journeyId,
}) => {
  const dispatch = useAppDispatch();
  const lastLog = useAppSelector(getLastJourneyLog);
  const timerTime = useAppSelector(getTimerTime);
  const [shouldResetTimer, setShouldResetTimer] = useState(true);
  const lastLogDate = lastLog
    ? format(new Date(lastLog?.loggedOn), dateFormats.standart)
    : undefined;

  const { register, handleSubmit, formState, control, reset, setValue } =
    useForm<JourneyLogFormData>({
      defaultValues: {
        loggedOn: format(new Date(), dateFormats.standart),
      },
      resolver: yupResolver(journeyLogFormValidation),
    });
  const { isSubmitting, errors } = formState;
  const onSubmit = async (data: JourneyLogFormData) => {
    try {
      await dispatch(createJourneyLogEffect({ data, journeyId }));
      if (shouldResetTimer) {
        dispatch(resetTimer());
      }
      setOpen(false);
    } catch (e) {
      console.error("Caught error", e);
    }
  };
  useEffect(() => {
    if (open) {
      dispatch(pauseTimer());
      setShouldResetTimer(true);
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reset]);

  useEffect(() => {
    setValue(
      "hoursSpent",
      timerTime.hours + Math.round(timerTime.minutes / 6) / 10
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerTime]);

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} size="xl">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Create new log</ModalHeader>
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
                render={({
                  field: { onChange, ...rest },
                  fieldState: { error },
                }) => (
                  <NumberInputField
                    label="Hours Spent"
                    errorMessage={error?.message}
                    onChange={(val) => {
                      onChange(val);
                      setShouldResetTimer(false);
                    }}
                    {...rest}
                  />
                )}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <InputField
                type="date"
                label="Date of log"
                min={lastLogDate || undefined}
                {...register("loggedOn")}
                errorMessage={errors.loggedOn?.message}
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
          <Button variant="ghost" type="submit" disabled={isSubmitting}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
