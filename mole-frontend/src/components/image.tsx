import NextImage from "next/image";

type propsType = React.ComponentProps<typeof NextImage>

export default function Image({placeholder, src, blurDataURL, ...otherProps} : propsType){
    var blur : "blur" | "empty" = "empty";
    if(placeholder === "blur"){
        if(blurDataURL || typeof src === "object"){
            blur = "blur";
        }
        else{
            console.warn("An image is set with placeholder = 'blur' but it's an external image and no blurDataUrl has been provided. Placeholder property has been changed to 'empty'")
        }
    }
    return(
        <NextImage placeholder={blur} src={src} blurDataURL={blurDataURL} {...otherProps} />
    )
}