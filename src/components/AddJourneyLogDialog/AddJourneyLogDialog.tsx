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
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { TextAreaField } from "../TextAreaField/TextAreaField";
import { AddJourneyLogFormData } from "./types";
import { addJourneyLogFormValidation } from "./validation";
import { NumberInputField } from "../NumberInputField/NumberInputField";
import { createJourneyLogEffect } from "../../store/features/journeys/effects";
import { InputField } from "../InputField/InputField";
import { getLastJourneyLog } from "../../store/features/journeys/selectors";
import { useEffect } from "react";
import { dateFormats } from "../../utils/constants";
import { UploadField } from "../UploadField/UploadField";

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
    ? format(new Date(lastLog?.loggedOn), dateFormats.standart)
    : undefined;

  const { register, handleSubmit, formState, control, reset, setValue } =
    useForm<AddJourneyLogFormData>({
      defaultValues: {
        loggedOn: format(new Date(), dateFormats.standart),
      },
      resolver: yupResolver(addJourneyLogFormValidation),
    });
  const { isSubmitting, errors } = formState;
  const onSubmit = async (data: AddJourneyLogFormData) => {
    try {
      await dispatch(createJourneyLogEffect({ data, id: journeyId }));
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
                render={({ field, fieldState: { error } }) => (
                  <NumberInputField
                    label="Hours Spent"
                    {...field}
                    errorMessage={error?.message}
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
