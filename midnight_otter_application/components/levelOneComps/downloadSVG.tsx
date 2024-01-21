"use client";
import { SVG } from "@svgdotjs/svg.js";

const downloadSVG = () => {
  var draw = SVG().addTo("body").size(300, 300);
  var svg = draw.svg();
  var svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  var svgUrl = URL.createObjectURL(svgBlob);
  var downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = "newesttree.svg";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export default function DownloadSVG() {
  return (
    <button
      className="my-4 self-end rounded-md  px-2 py-2 text-sm text-white outline outline-1 outline-slate-400 hover:bg-gray-800"
      onClick={downloadSVG}
    >
      Scarica l&apos;etichetta del reperto / prova
    </button>
  );
}
