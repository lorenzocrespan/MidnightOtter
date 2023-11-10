"use client";
import { useRef, useState } from "react";
import { Icons } from "@/components/baseComponents/icons";
import { pushFileToIPFS, getFileFromIPFS } from "@/services/infura";

export default function Page() {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);

  function handleChange(e: any) {
    e.preventDefault();
    console.log("File has been added");
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
      for (let i = 0; i < e.target.files["length"]; i++) {
        setFiles((prevState: any) => [...prevState, e.target.files[i]]);
      }
    }
  }

  async function handleSubmitFile(e: any) {
    if (files.length === 0) {
      console.log("Get file from IPFS");
      // Get file from IPFS
      const fileFromIPFS = await getFileFromIPFS({
        Hash: "QmfKjWn4vX4nWAvNqTDxUCEUi1WqdmAQ4NAisdxyPAnSKY",
      });
      console.log(fileFromIPFS);
      // ERROR: No files added
    } else {
      console.log("Submitting files");
      // Upload files to IPFS
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileHash = await pushFileToIPFS(file);
        console.log(fileHash);
      }
    }
  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <form
        className="flex min-h-[15rem] w-1/3 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400"
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleChange}
          accept="image/*, .doc, .docx, .pdf"
        />
        <p>
          Drag & Drop files or{" "}
          <span
            className="cursor-pointer font-bold underline-offset-4"
            onClick={openFileExplorer}
          >
            <u>Select files</u>
          </span>{" "}
          to upload
        </p>
      </form>
      <button
        className="mt-3 w-auto rounded-lg border-2 p-2"
        onClick={handleSubmitFile}
      >
        <span className="p-2 text-white ">Submit</span>
      </button>
      <div className="flex min-w-full flex-col items-center p-5">
        <table className="w-full table-fixed text-left">
          <thead className="border-b">
            <tr>
              <th scope="col" className="w-4" />
              <th scope="col" className="w-24">
                Nome
              </th>
              <th scope="col" className="w-5">
                Dimensione
              </th>
              <th scope="col" className="right-0 w-5 text-center">
                Azione
              </th>
            </tr>
          </thead>
          <tbody>
            {files.map((file: any, idx: any) => (
              <tr key={idx} className="border-b dark:hover:bg-gray-900">
                <td>
                  <div className="flex justify-center">
                    <Icons.accessibility />
                  </div>
                </td>
                <td>{file.name}</td>
                <td>{(file.size / 1000).toFixed(2)} KB</td>
                <td
                  className="cursor-pointer px-6 py-4 text-center text-red-500"
                  onClick={() => removeFile(file.name, idx)}
                >
                  Remove
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
