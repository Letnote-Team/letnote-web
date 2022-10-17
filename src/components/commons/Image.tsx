import React from "react";
import NextImage, { ImageProps } from "next/image";

export const Image = (props: ImageProps) => {
  return (
    <div className={`${props.className} relative`}>
      <NextImage
        src={props.src}
        alt={props.alt}
        layout="fill"
        objectFit="cover"
        unoptimized={true}
      />
    </div>
  );
};
