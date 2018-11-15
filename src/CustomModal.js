import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export const CustomModal = (props) => {
    const { className, isOpen, modalType, header, toggleModal } = props
    return (
        <Modal
            isOpen={isOpen}
            toggle={() => toggleModal(modalType)}
        >
            <ModalHeader toggle={() => toggleModal(modalType)}>
                {header}
            </ModalHeader>
            <ModalBody className={className}>
                {props.children}
            </ModalBody>
            <ModalFooter>
                <Button
                    color='primary'
                    onClick={() => toggleModal(modalType)}
                >
                    {"OK"}
                </Button>
            </ModalFooter>
        </Modal>
    )
}