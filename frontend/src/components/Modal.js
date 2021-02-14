import React from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

const SiteModal = ({ isOpen, onClose, title, body, reply }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>

        <ModalFooter px={4} py={2}>
          {reply && <Button variant="ghost">Reply</Button>}
          <Button colorScheme="blue" ml={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SiteModal;
