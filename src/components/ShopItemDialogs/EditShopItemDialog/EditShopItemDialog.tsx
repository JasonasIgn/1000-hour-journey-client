import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useEffect, FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateJourneyEffect } from "store/features/journeys/effects";
import { useAppDispatch } from "store/hooks";
import { InputField, TextAreaField, UploadField } from "components";
import { ShopItemFormData } from "../types";
import { shopItemFormValidation } from "../validation";
import { ShopItem } from "store/features/shop/types";

interface EditShopItemDialogProps {
  handleClose: () => void;
  item: ShopItem | null;
}

export const EditShopItemDialog: FC<EditShopItemDialogProps> = ({
  handleClose,
  item,
}) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const isOpen = Boolean(item);
  const { register, handleSubmit, formState, reset, setValue } =
    useForm<ShopItemFormData>({
      resolver: yupResolver(shopItemFormValidation),
    });
  const { isSubmitting, errors } = formState;
  const onSubmit = async (data: any) => {
    try {
      if (!item) {
        throw new Error("No item selected");
      }
      await dispatch(
        updateJourneyEffect({ data, journeyId: item.id })
      ).unwrap();
      handleClose();
      toast({
        description: "Changes saved",
      });
    } catch (e) {
      toast({
        description: "Failed to update the item",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        title: item?.title,
        description: item?.description,
        cost: item?.cost,
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
            initialPreviewSrc={
              item?.mediaUrl
                ? `${item?.mediaUrl}?${item.updatedAt.toString()}` // prevent caching
                : undefined
            }
          />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={handleClose}>
            Close
          </Button>
          <Button variant="ghost" type="submit" isDisabled={isSubmitting}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
