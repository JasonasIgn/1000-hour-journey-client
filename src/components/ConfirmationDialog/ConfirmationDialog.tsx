import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FC, useState } from "react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bodyText: string;
  actionText: string;
  onAction: () => Promise<any>;
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  actionText,
  bodyText,
  isOpen,
  onAction,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{bodyText}</Text>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            isDisabled={loading}
            variant="ghost"
            onClick={async () => {
              setLoading(true);
              await onAction();
              setLoading(false);
              onClose();
            }}
          >
            {actionText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
