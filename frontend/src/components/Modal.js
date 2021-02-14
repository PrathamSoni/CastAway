import React, {useState} from 'react';

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
import { Row } from 'react-bootstrap';

const SiteModal = ({ isOpen, onClose, title, body, reply, submitReply }) => {

  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const closeHandler = () => {
    setReplying(false);
    setReplyText("");
    onClose();
  };

  const replyHandler = (replyText) => {
    setReplying(false);
    submitReply(replyText);
    setReplyText("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}
        {replying && 
            <Row>
              <textarea value={replyText} className="w-100 m-2 p-1" onChange={(e) => setReplyText(e.target.value)}/>
            </Row>
           }</ModalBody>

        <ModalFooter px={4} py={2}>
          {reply && <Button onClick={!replying ? (() => setReplying(true)):(() => replyHandler(replyText))} setvariant="ghost">{replying ? "Send":"Reply"}</Button>}
          <Button colorScheme="blue" ml={3} onClick={closeHandler}>
            Close
          </Button>
        </ModalFooter>
        
      </ModalContent>
    </Modal>
  );
};

export default SiteModal;
