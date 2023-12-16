"use client";
import * as React from "react";
import { useQRCode } from "next-qrcode";

export function QR() {
  const { Canvas } = useQRCode();

  return (
    <div className="h-fit w-auto rounded-md border-2">
      <Canvas
        text={"https://github.com/bunlong/next-qrcode"}
        options={{
          errorCorrectionLevel: "H",
          margin: 3,
          scale: 4,
          width: 300,
          color: {
            dark: "#010599FF",
          },
        }}
      />
    </div>
  );
}
