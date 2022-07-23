import { Box, Skeleton, useBoolean } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import CustomTooltip from "./CustomTooltip";

interface CustomImageProps {
    src: string;
    width: number;
    ratio: number;
    alt?: string;
    fallbackSrc?: string;
    title?: string;
    tooltipLabel?: string;
}

export default function CustomImage({
    src,
    fallbackSrc,
    alt,
    width,
    ratio,
    title,
    tooltipLabel
}: CustomImageProps) {
    const [imageSrc, setImageSrc] = useState(src);
    const [isLoaded, setIsLoaded] = useBoolean(false);

    useEffect(() => setImageSrc(src), [src]);

    const height = width / ratio;

    return (
        <Skeleton isLoaded={isLoaded} fadeDuration={1}>
            <CustomTooltip label={tooltipLabel}>
                <Box
                    width={`${width}px`}
                    height={`${height}px`}
                    position="relative">
                    <Image
                        src={imageSrc}
                        alt={alt}
                        onError={() => setImageSrc(fallbackSrc || "")}
                        // placeholder={"blur"}
                        blurDataURL={src}
                        style={{ filter: "drop-shadow(0px 0px 0px black)" }}
                        onLoad={setIsLoaded.on}
                        title={title}
                        layout="fill"
                        objectFit="cover"
                    />
                </Box>
            </CustomTooltip>
        </Skeleton>
    );
}
