import React, { useState } from 'react';

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
import { Row, Form } from 'react-bootstrap';

import './Modal.scss';

const SiteModal = ({ isOpen, onClose, title, body, reply, submitReply }) => {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const closeHandler = () => {
    setReplying(false);
    setReplyText('');
    onClose();
  };

  const replyHandler = (replyText) => {
    setReplying(false);
    submitReply(replyText);
    setReplyText('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton className="close-btn" />
        <ModalBody>
          {body}
          {replying && (
            <Form>
              <Form.Group style={{ marginLeft: '-10px' }}>
                <Form.Control
                  as="textarea"
                  value={replyText}
                  className="w-100 m-2  p-1"
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </Form.Group>
            </Form>
          )}
        </ModalBody>

        <ModalFooter px={4} py={2} pt={replying ? 0 : 2}>
          {reply && (
            <Button
              onClick={
                !replying
                  ? () => setReplying(true)
                  : () => replyHandler(replyText)
              }
              setvariant="ghost"
            >
              {replying ? 'Send' : 'Reply'}
            </Button>
          )}
          <Button ml={3} onClick={closeHandler} className="close-button">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SiteModal;
