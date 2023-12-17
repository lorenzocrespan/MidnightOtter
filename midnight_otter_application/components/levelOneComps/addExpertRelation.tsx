"use client";
import { useRef, useState } from "react";
import { Icons } from "@/components/baseComponents/icons";
import { pushPdfToIPFS } from "@/services/infura";

export default function ExpertRelation() {
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
      // ERROR: No files added
    } else {
      console.log("Submitting files");
      // Upload files to IPFS
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileHash = await pushPdfToIPFS(file);
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
    <div className="fixed left-1/2 top-1/2 z-50 w-2/3 -translate-x-1/2 -translate-y-2/3  items-center justify-center">
      <div className="relative">
        <div className="relative rounded-lg border-2 bg-black">
          <div className="flex p-5">
            <button className="ms-auto h-10 w-10 items-center justify-center ">
              <Icons.close />
            </button>
          </div>
          <div className="flex flex-col items-center gap-5 p-5">
            <form
              className="flex min-h-[20rem] w-2/3 items-center justify-center rounded-lg border-2 border-dashed"
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
              <div className="flex flex-col items-center justify-center gap-5">
                <Icons.fileUp className="h-12 w-12" />
                <p>
                  Drag & Drop files or{" "}
                  <span
                    className="cursor-pointer font-bold underline-offset-4"
                    onClick={openFileExplorer}
                  >
                    <u>Select files</u>
                  </span>{" "}
                  to upload.
                </p>
              </div>
            </form>
            <div className="overflow-y flex flex-col items-center p-5">
              <table className="w-full table-fixed overflow-scroll text-left">
                <thead className="border-b">
                  <tr>
                    <th scope="col" className="w-3" />
                    <th scope="col" className="w-24">
                      Name
                    </th>
                    <th scope="col" className="w-5">
                      Dimension
                    </th>
                    <th scope="col" className="right-0 w-5 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {files.length > 0 ? (
                    files.map((file: any, idx: any) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-700 dark:hover:bg-gray-900"
                      >
                        <td>
                          <div className="flex justify-center">
                            <Icons.file />
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-5 text-center">
                        No files added
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {files.length > 0 && (
                <button
                  className="mt-5 w-auto rounded-lg border-2 p-2"
                  onClick={handleSubmitFile}
                >
                  <span className="p-5">Submit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
