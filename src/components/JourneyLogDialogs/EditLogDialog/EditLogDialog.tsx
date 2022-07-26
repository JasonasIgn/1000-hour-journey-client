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
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  TextAreaField,
  NumberInputField,
  InputField,
  UploadField,
  CreatableSelectField,
} from "components";
import { JourneyLogFormData } from "../types";
import { journeyLogFormValidation } from "../validation";
import {
  createJourneyTagEffect,
  updateJourneyLogEffect,
} from "store/features/journeys/effects";
import { useEffect, FC } from "react";
import { dateFormats } from "utils/constants";
import { LogExtended, Tag } from "store/features/journeys/types";
import { setEditLogDialogOpen } from "store/features/journey/slice";
import { getEditLogDialogOpen } from "store/features/journey/selectors";
import { getTagOption, getTagOptions } from "../utils";
import { Option } from "types";

interface EditLogDialogProps {
  journeyId: number;
  log: LogExtended;
  tags: Tag[];
}

export const EditLogDialog: FC<EditLogDialogProps> = ({
  journeyId,
  log,
  tags,
}) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(getEditLogDialogOpen);

  const handleClose = () => {
    dispatch(setEditLogDialogOpen(false));
  };

  const {
    register,
    handleSubmit,
    formState,
    control,
    reset,
    setValue,
    getValues,
  } = useForm<JourneyLogFormData>({
    defaultValues: {
      loggedOn: format(new Date(log.loggedOn), dateFormats.standart),
      hoursSpent: log.hoursSpent,
      description: log.description,
      tags: getTagOptions(log.tags),
    },
    resolver: yupResolver(journeyLogFormValidation),
  });
  const { isSubmitting, errors } = formState;
  const onSubmit = async (data: JourneyLogFormData) => {
    try {
      await dispatch(
        updateJourneyLogEffect({ data, journeyId, logId: log.id })
      );
      handleClose();
    } catch (e) {
      console.error("Caught error", e);
    }
  };
  useEffect(() => {
    if (open) {
      reset({
        loggedOn: format(new Date(log.loggedOn), dateFormats.standart),
        hoursSpent: log.hoursSpent,
        description: log.description,
        tags: getTagOptions(log.tags),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reset]);

  const onCreateOption = async (value: string) => {
    try {
      const currentValue = getValues("tags");
      const createdTag = await dispatch(
        createJourneyTagEffect({
          data: { name: value },
          journeyId,
        })
      ).unwrap();
      setValue("tags", [...currentValue, getTagOption(createdTag)]);
    } catch (e) {
      console.error("Error creating tag", e);
    }
  };

  return (
    <Modal isOpen={open} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Edit log</ModalHeader>
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
                disabled
                {...register("loggedOn")}
                errorMessage={errors.loggedOn?.message}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <CreatableSelectField<Option>
                options={getTagOptions(tags)}
                control={control as any}
                name="tags"
                label="Tags"
                onCreateOption={onCreateOption}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <UploadField
                label="Media"
                {...register("media")}
                onClear={() => setValue("media", {} as FileList)}
                initialPreviewSrc={
                  log?.mediaUrl
                    ? `${log.mediaUrl}?${log.updatedAt.toString()}` // prevents caching
                    : undefined
                }
              />
            </GridItem>
          </Grid>
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
