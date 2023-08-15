import React from "react";
import {Button, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

const Dialog = () => {

    const dialogOptions = useSelector((state: any) => state.dialogReducer)
    const dispatch = useDispatch()

    const onHide=()=>{
        dispatch({type: "HIDE_DIALOG"})
    }

    return (
        <Modal show={dialogOptions.show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
                {dialogOptions?.title}
            </Modal.Header>
            <Modal.Body>
                <p>{dialogOptions?.message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={dialogOptions.acceptFunction}>
                    Ok
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Dialog