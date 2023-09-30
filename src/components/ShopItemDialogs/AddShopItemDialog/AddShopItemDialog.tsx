import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useEffect, FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "store/hooks";
import {
  InputField,
  NumberInputField,
  TextAreaField,
  UploadField,
} from "components";
import { ShopItemFormData } from "../types";
import { shopItemFormValidation } from "../validation";
import { createShopItemEffect } from "store/features/shop/effects";
import { getSliderTrackBgColor } from "./utils";

interface AddShopItemDialogProps {
  setOpen: (open: boolean) => void;
  open: boolean;
}

export const AddShopItemDialog: FC<AddShopItemDialogProps> = ({
  open,
  setOpen,
}) => {
  const toast = useToast();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, reset, setValue, control, watch } =
    useForm<ShopItemFormData>({
      defaultValues: {
        cost: 0,
      },
      resolver: yupResolver(shopItemFormValidation),
    });
  const { isSubmitting, errors } = formState;
  const onSubmit = async (data: any) => {
    try {
      await dispatch(createShopItemEffect(data)).unwrap();
      setOpen(false);
      toast({
        description: "Item added",
      });
    } catch (e) {
      toast({
        description: "Failed to add item",
      });
    }
  };
  const costValue = watch("cost");
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
        <ModalHeader>Create new item</ModalHeader>
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
          <Controller
            name="cost"
            control={control}
            render={({
              field: { onChange, ...rest },
              fieldState: { error },
            }) => (
              <NumberInputField
                label="Cost"
                step={1}
                errorMessage={error?.message}
                formControlProps={{ mb: 3 }}
                onChange={(val) => {
                  onChange(val);
                }}
                {...rest}
              />
            )}
          />
          <Slider
            onChange={(val) => {
              setIsDragging(true);
              setValue("cost", val);
            }}
            value={costValue}
            mt={8}
            mb={2}
            max={102}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onChangeEnd={() => {
              setIsDragging(false);
            }}
          >
            <SliderMark value={20}>Cheap</SliderMark>
            <SliderMark value={45}>Medium</SliderMark>
            <SliderMark value={75}>Expensive</SliderMark>
            <SliderTrack>
              <SliderFilledTrack bg={getSliderTrackBgColor(costValue)} />
            </SliderTrack>
            <Tooltip
              placement="top"
              isOpen={showTooltip || isDragging}
              label={`~${Number(costValue / 17).toFixed(2)}h`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <UploadField
            label="Media"
            {...register("media")}
            onClear={() => setValue("media", {} as FileList)}
          />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button variant="ghost" type="submit" isDisabled={isSubmitting}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
