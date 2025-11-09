import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface CrossfadeImageProps extends ImageProps {
    className?: string;          // size/shape (e.g., w-64 h-40 rounded)
    durationMs?: number;         // default 500ms
};

export function CrossfadeImage({
    src,
    alt = "",
    width,
    height,
    className = "",
    durationMs = 500,
}: CrossfadeImageProps) {
    // two “slots” we flip between
    const [aSrc, setASrc] = useState(src);
    const [bSrc, setBSrc] = useState<string | null>(null);
    const [showA, setShowA] = useState(true);   // which slot is on top
    const [ready, setReady] = useState(false);  // wait for first load

    // when the prop src changes, load it into the hidden slot first
    useEffect(() => {
        if (showA) setBSrc(src as string);
        else setASrc(src);
    }, [src, showA]);

    const onBufferLoaded = () => {
        setReady(true);
        setShowA((prev) => !prev); // flip which one is visible (triggers fade)
    };

    // base classes for the two stacked images
    const base =
        "absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out";
    const dur = `duration-[${durationMs}ms]`;

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* A slot */}
            <Image
                width={width}
                height={height}
                src={aSrc ?? ""}
                alt={alt}
                className={`${base} ${dur} ${showA ? "opacity-100" : "opacity-0"}`}
                onLoad={() => !ready && setReady(true)}
                draggable={false}
            />
            {/* B slot – only render when we have something to show */}
            {bSrc && (
                <Image
                    width={width}
                    height={height}
                    src={bSrc}
                    alt={alt}
                    className={`${base} ${dur} ${showA ? "opacity-0" : "opacity-100"}`}
                    onLoad={onBufferLoaded}
                    draggable={false}
                />
            )}
        </div>
    );
}

