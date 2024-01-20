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
          margin: 2,
          scale: 5,
          width: 300,
        }}
      />
    </div>
  );
}
