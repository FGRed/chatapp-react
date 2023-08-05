import React, {FC} from "react"
import ReactImagePickerEditor from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css'

interface propType {
    width: number,
    height: number,
    setImage?: (image:string) => void,
    initialImage: string,
}

const PicturePicker: FC<propType> = ({width, height, initialImage, setImage}) => {

    const config2: any = {
        borderRadius: '8px',
        language: 'en',
        width: width,
        height: height,
        objectFit: 'scale-down',
        compressInitial: null,
        hideDownloadBtn: true,
        aspectRatio: 2
    };

    return (<ReactImagePickerEditor
            config={config2}
            imageSrcProp={initialImage}
            imageChanged={(imageUrl:string) => {
                if (setImage) {
                    setImage(imageUrl)
                }
            }}
            color="#fff"
        />

    )
}

export default PicturePicker;