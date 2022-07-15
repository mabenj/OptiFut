import Image from "next/image";
import { useEffect, useState } from "react";

interface CustomImageProps {
    src: string;
    fallbackSrc: string;
    alt: string;
    width: number;
    ratio: number;
}

export default function CustomImage({
    src,
    fallbackSrc,
    alt,
    width,
    ratio
}: CustomImageProps) {
    const [imageSrc, setImageSrc] = useState(src);

    useEffect(() => setImageSrc(src), [src]);

    return (
        <Image
            src={imageSrc}
            alt={alt}
            width={width}
            height={width / ratio}
            onError={() => setImageSrc(fallbackSrc)}
            placeholder="blur"
            blurDataURL={src}
        />
    );
}
