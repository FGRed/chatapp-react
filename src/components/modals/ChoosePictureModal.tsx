import React, {FC, useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import {useSelector} from "react-redux";
import CUser from "../../model/cuser/CUser";
import PicturePicker from "../css/misc/PicturePicker";

interface PropType{
    show: boolean,
    onHide: ()=>void
}

const ChoosePictureModal:FC<PropType>=({show, onHide})=>{

    const user:CUser = useSelector((state:any) => state.cuserReducer)
    const [image, setImage] = useState<any>()

    useEffect(()=>{

    }, [image])

    return(
        <Modal onHide={onHide} show={show} centered backdrop="static">
            <Modal.Header>
                Choose photo
            </Modal.Header>
            <Modal.Body>
                {
                    user.avatar &&
                    <PicturePicker width={600} height={600} initialImage={user.avatar} setImage={setImage}/>
                }
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    )
}

export default ChoosePictureModal