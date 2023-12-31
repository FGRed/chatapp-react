import React, {createRef, FC, useEffect, useRef, useState} from "react";
import {Col, Container, Modal, Row, Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import 'react-image-crop/dist/ReactCrop.css'
import {centerCrop, Crop, makeAspectCrop, PixelCrop, ReactCrop} from "react-image-crop";
import {canvasPreview} from "./canvasPreview";
import {useDebounceEffect} from "./useDebounceEffect";
import CUser from "../../../../model/cuser/CUser";
import "../../../css/view/main/avatar-select/AvatarSelect.css"
import {changeAvatar} from "../../../../service/cuser/CUserService";
import {showSuccess} from "../../../notifications/GeneralNotifications";
import ImageCompressor from "../../../util/ImageCompressor";

const SelectAvatar = () => {

    const [crop, setCrop] = useState<Crop>()
    const [imgSrc, setImgSrc] = useState<string>('')
    const imgRef = useRef<HTMLImageElement>(null)
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const fileCropperOpt: any = useSelector((state: any) => state.imageCropperReducer)
    const previewCanvasRef: any = useRef()
    const [imgFile, setImgFile]: any = useState<any>(null)
    const [disableCrop, setDisableCrop] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (fileCropperOpt.show) {
            setCrop(undefined)
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(fileCropperOpt.file)
        }
    }, [fileCropperOpt.show])


    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const {width, height} = e.currentTarget
        setCrop(centerAspectCrop(width, height, 1))
    }

    const centerAspectCrop = (
        mediaWidth: number,
        mediaHeight: number,
        aspect: number,
    ) => {
        return centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
                aspect,
                mediaWidth,
                mediaHeight,
            ),
            mediaWidth,
            mediaHeight,
        )
    }

    const onHide = () => {
        if(!disableCrop){
            dispatch({type: "HIDE_IMAGE_CROPPER"})
        }
    }

    const save = async () => {
        if (imgFile) {

            const changeAvatarAs = async (file: File | Blob) => {
                const cuser = await changeAvatar(file)
                if(cuser) {
                    dispatch({type: "SET_USER", cuser})
                    showSuccess("Avatar image changed")
                    onHide()
                }
            }
            console.log(imgFile.size / 10000)

            if (imgFile.size / 10000 > 100) {
                if (window.confirm(`Maximum file size exceeded (${(imgFile.size / 10000).toFixed(2)}Kb). Do you want to compress the file to 100Kb?`)) {
                    setDisableCrop(false)
                    ImageCompressor.compressImage(imgFile, 0.1, async (compressedBlob) => {
                        changeAvatarAs(compressedBlob)
                        setDisableCrop(true)
                    })
                }
            }else{
                changeAvatarAs(imgFile)
            }
        }
    }

    useDebounceEffect(
        async () => {
            setDisableCrop(true)
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {

                await canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    1,
                    0,
                )

                convertToImgFile()
            }
        },
        100,
        [completedCrop],
    )

    const convertToImgFile = () => {
        if (!previewCanvasRef.current) {
            throw new Error('Crop canvas does not exist')
        }
        previewCanvasRef.current.toBlob((blob: any) => {
            if (!blob) {
                throw new Error('Failed to create blob')
            }
            const fileImg = new File([blob], "avatar")
            setImgFile(fileImg)
            setDisableCrop(false)
        })
    }

    return (
        <Modal size="lg" show={fileCropperOpt.show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
                <i className="bi bi-crop me-2"/> Crop image
            </Modal.Header>
            <Modal.Body className="pb-0">
                <div className="cropper-select">
                    {!!imgSrc && (
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => {
                                setCrop(percentCrop)
                            }}
                            onComplete={(c) => {
                                setCompletedCrop(c);
                            }}
                            aspect={1}
                            className="mx-auto">
                            <img
                                ref={imgRef}
                                alt="Crop me"
                                src={imgSrc}
                                style={{transform: `scale(1) rotate(0deg)`}}
                                onLoad={onImageLoad}
                                className="img-fluid"
                            />
                        </ReactCrop>

                    )}
                </div>
                <div className="avatar-preview">
                    <div className="right text-center">
                        <canvas
                            ref={previewCanvasRef}
                            style={{
                                border: '1px solid black',
                                borderRadius: "0.375rem",
                                objectFit: 'cover',
                                width: 100,
                                height: 100,
                            }}
                        />
                    </div>
                    <div className="left">
                        <Container className="pt-3">
                            <UserInfoCol field="Resolution" text={(completedCrop
                                    && Math.trunc(completedCrop.width)) +
                                " x " + (completedCrop && Math.trunc(completedCrop.height)) + "px"}/>
                            <UserInfoCol field="Size" text={imgFile && (imgFile.size / 10000).toFixed(2) + "Kb"}/>
                        </Container>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary-outline" onClick={onHide}>
                    Cancel
                </button>
                <button className={"btn btn-primary " + (disableCrop &&  "disabled")} onClick={save}>
                    Crop & Save {disableCrop && <Spinner size="sm"/>}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

interface Props {
    field: string
    text: string
}

const UserInfoCol: FC<Props> = ({field, text}) => {
    return (
        <div className="user-info-col">
            <span className="text-secondary fw-bolder mb-0">{field}</span>
            <Row>
                <Col>
                    <p>{text ? text : "-"}</p>
                </Col>
            </Row>
        </div>
    )
}

export default SelectAvatar