"use client";
import { useQRCode } from "next-qrcode";

export default function QR({ exihibit }: { exihibit: string }) {
  const { Canvas } = useQRCode();

  return (
    <div className="m-10 h-fit w-fit self-center rounded-md border-2">
      <Canvas
        text={"https://midnight-otter.vercel.app/exihibitPage/" + exihibit}
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
