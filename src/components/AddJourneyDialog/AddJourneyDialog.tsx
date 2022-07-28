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
import { useForm } from "react-hook-form";
import { InputField } from "../InputField/InputField";
import { TextAreaField } from "../TextAreaField/TextAreaField";

interface AddJourneyDialogProps {
  setOpen: (open: boolean) => void;
  open: boolean;
}

export const AddJourneyDialog: React.FC<AddJourneyDialogProps> = ({
  open,
  setOpen,
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => console.log(data);
  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Create new journey</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputField label="Title" {...register("title")} marginBottom={5} />
          <TextAreaField label="Description" {...register("description")} />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button variant="ghost" type="submit">
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
