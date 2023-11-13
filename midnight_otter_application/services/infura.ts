/*
 *  NOTE:
 *    The following file defines the API calls to the IPFS
 *    infura node.
 */

// Define the project ID and project secret (defined in the .env.local file).
// NOTE: INFURA_PROJECT_ID is the project ID for the IPFS infura node.
const projectId = process.env.INFURA_PROJECT_ID;
// NOTE: INFURA_PROJECT_SECRET is the project secret for the IPFS infura node.
const projectSecret = process.env.INFURA_PROJECT_SECRET;
// Define the authorization header.
const autorization =
  `Basic ` + Buffer.from(`${projectId}:${projectSecret}`).toString("base64");

/**
 *  Function to push a file to IPFS.
 *
 *  @param file The file to push to IPFS (e.g. a PDF file).
 *  @returns The response from IPFS API call (e.g. the hash
 *  of the file, file name and size). In case of error, it
 *  returns null.
 *
 */
export const pushPdfToIPFS = async (file: any) => {
  console.log("[INFURA] Init push pdf to IPFS");
  console.log("[INFURA] File to push", file);
  // Create a new form data object.
  const formData = new FormData();
  // Append the file to the form data object.
  formData.append("file", file);
  console.log(
    "[INFURA] Pushing file to IPFS with project ID",
    projectId,
    "and project secret",
    projectSecret
  );
  // Push the file to IPFS.
  const result = await fetch(
    `https://ipfs.infura.io:5001/api/v0/add?pin=true`,
    {
      headers: {
        Authorization: autorization,
      },
      method: "POST",
      body: formData,
    }
  )
    .then((res) => {
      // Check status code.
      if (res.status !== 200) {
        console.log("[INFURA] Error pushing file to IPFS", res);
        return null;
      }
      console.log("[INFURA] Response from IPFS", res);
      // Return the response from IPFS API call.
      return res.json();
    })
    .catch((err) => {
      console.log("[INFURA] Error pushing file to IPFS", err);
      return null;
    });
  console.log("[INFURA] End push pdf to IPFS");
  return result;
};

/**
 *  Function to get a file from IPFS.
 *
 *  @param hash The hash of the file to get from IPFS
 *  (e.g. QmfKjWn4vX4nWAvNqTDxUCEUi1WqdmAQ4NAisdxyPAnSKY).
 *  @returns Dictionary with the URL (url), the size (size)
 *  and the name (name) of the file. In case of error, it
 *  returns null.
 *
 */
export const getPdfFromIPFS = async (hash: String) => {
  console.log("[INFURA] Init get pdf from IPFS");
  console.log("[INFURA] Hash of file to get from IPFS", hash);
  console.log(
    "[INFURA] Getting file from IPFS with project ID",
    projectId,
    "and project secret",
    projectSecret
  );
  // Push the file to IPFS.
  const result = await fetch(
    `https://ipfs.infura.io:5001/api/v0/cat?arg=${hash}`,
    {
      headers: {
        Authorization: autorization,
      },
      method: "POST",
    }
  )
    .then(async (res) => {
      // Check status code.
      if (res.status !== 200) {
        console.log("[INFURA] Error getting file from IPFS", res);
        return null;
      }
      console.log("[INFURA] Response from IPFS", res);
      // Blob the response from IPFS API call.
      const blob = await res.blob();
      // Return the dictionary with the URL, the size and the name of the
      // file.
      const resultDictionary = {
        url: URL.createObjectURL(blob),
        size: blob.size,
        name: hash,
      };
      return resultDictionary;
    })
    .catch((err) => {
      console.log("[INFURA] Error getting file from IPFS", err);
      return null;
    });
  console.log("[INFURA] End get pdf from IPFS");
  return result;
};
