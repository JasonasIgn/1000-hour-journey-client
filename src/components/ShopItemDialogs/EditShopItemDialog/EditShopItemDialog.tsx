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
import { useEffect, FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "store/hooks";
import {
  ConfirmationDialog,
  InputField,
  NumberInputField,
  TextAreaField,
  UploadField,
} from "components";
import { ShopItemFormData } from "../types";
import { shopItemFormValidation } from "../validation";
import { ShopItem } from "store/features/shop/types";
import {
  deleteShopItemEffect,
  updateShopItemEffect,
} from "store/features/shop/effects";

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
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const isOpen = Boolean(item);
  const { register, handleSubmit, formState, reset, setValue, control } =
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
        updateShopItemEffect({ data, shopItemId: item.id })
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

  const handleDelete = async () => {
    try {
      await dispatch(
        deleteShopItemEffect({
          shopItemId: item?.id || 0,
        })
      ).unwrap();
      handleClose();
      toast({
        description: "Item deleted",
      });
    } catch (e) {
      toast({
        description: "Failed to delete the item",
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
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit item</ModalHeader>
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
            <Button
              mr="auto"
              onClick={() => {
                setConfirmationDialogOpen(true);
              }}
              variant="warning"
            >
              Delete
            </Button>
            <Button mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button variant="ghost" type="submit" isDisabled={isSubmitting}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ConfirmationDialog
        actionText="Delete"
        bodyText="This will delete the item permanently"
        isOpen={confirmationDialogOpen}
        onAction={handleDelete}
        onClose={() => {
          setConfirmationDialogOpen(false);
        }}
      />
    </>
  );
};
