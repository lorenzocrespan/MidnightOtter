// Infura API key
const projectId = process.env.INFURA_PROJECT_ID;
const projectSecret = process.env.INFURA_PROJECT_SECRET;

console.log(projectId, projectSecret);

// CURL syntax for IPFS infura (HTTP POST)
// curl "https://ipfs.infura.io:5001/api/v0/add?...&pin=true" -X POST -u "<API_KEY>:<API_KEY_SECRET>" -H "Content-Type: multipart/form-data" -F file=@"<file>"

// Function to push file to IPFS infura (HTTP POST)
export const pushFileToIPFS = async (file: any) => {
  console.log("Pushing file to IPFS", file);
  console.log("Project ID", projectId);
  console.log("Project Secret", projectSecret);
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`https://ipfs.infura.io:5001/api/v0/add?pin=true`, {
    headers: {
      Authorization: `Basic ${btoa(`${projectId}:${projectSecret}`)}`,
    },
    method: "POST",
    body: formData,
  });
  const json = await res.json();
  return json;
};

export const getFileFromIPFS = async (hash: any) => {
  console.log("Getting file from IPFS", hash.Hash);
  console.log(`Basic ${btoa(`${projectId}:${projectSecret}`)}`);
  const res = await fetch(
    `https://ipfs.infura.io:5001/api/v0/cat?arg=${hash.Hash}`,
    {
      headers: {
        Authorization: `Basic ${btoa(`${projectId}:${projectSecret}`)}`,
      },
      method: "POST",
    }
  );
  console.log(res);
  const blob = await res.blob();
  // print data to console
  console.log(blob);
  // Save file to local storage
  const url = URL.createObjectURL(blob);
  const dataFetch = { url: url, size: blob.size, name: hash.Hash };
  return dataFetch;
};
