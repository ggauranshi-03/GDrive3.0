import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No Image Selected");
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (file) {
  //     try {
  //       const formData = new FormData();
  //       formData.append("file", file);

  //       const resFile = await axios({
  //         method: "post",
  //         url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
  //         data: formData,
  //         headers: {
  //           pinata_api_key: `0483ba1944dc8becbd15`,
  //           pinata_secret_api_key: `58a206e573e08007ccb93b881f9c9f0971de7ec123ad1c2b337994e08f6bc6b1`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  //       const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
  //       // const signer = contract.connect(provider.getSigner());
  //       contract.add(account, ImgHash);
  //       alert("Successfully Image Uploaded");
  //       setFileName("No Image Selected");
  //       setFileName(null);
  //     } catch (e) {
  //       alert("Unable to upload image to Pinata");
  //     }
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        // method: 'post',
        // url: 'https://managed.mypinata.cloud/api/v1/auth/content/jwt',
        // headers: {
        //   'x-api-key': 'tka1dqbGfyh4RW4kdT5kg2upEJ7viEMe',
        //   'Content-Type': 'application/json'
        // },
        // data: data;
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `926f9ac16a1cf97b26a1`,
            pinata_secret_api_key: `
            599d763356cb9472771cd68f5105dd3bb392829247e95460c6bfa559558501ea`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        //const signer = contract.connect(provider.getSigner());
        const signer = contract.connect(provider.getSigner());
        signer.add(account, ImgHash);
        console.log("In try block");
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; // files array of files object
    console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        ></input>
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;

// This is a React component named "FileUpload" that allows users to upload an image file to IPFS (InterPlanetary File System) and add the resulting image hash to a smart contract on the blockchain. The component uses the following dependencies: useState hook from React and axios for making HTTP requests.

// The component has a state that holds the selected image file and its name. The handleSubmit function is called when the user submits the form, and it checks if a file has been selected. If a file is selected, it creates a new FormData object and appends the selected file to it. Then it makes a post request to Pinata's API to upload the file to IPFS using the Pinata API key and secret API key as headers. If the request is successful, the image hash is retrieved from the response, prefixed with "ipfs://", and added to the smart contract using the add function. A success alert is shown to the user, and the file input is cleared.

// The retrieveFile function is called when the user selects a file, and it retrieves the selected file from the event and sets the file state with it.

// The component returns a form with an input element of type "file" that allows users to select an image file, a button that allows users to submit the form and upload the file to IPFS, and a span element that shows the name of the selected file. The button is disabled if no file has been selected or if the user is not signed in to the web3 wallet. The form is styled with CSS classes.

// const resFile = await axios({
//   method: "post",
//   url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//   data: formData,
//   headers: {
//     pinata_api_key: `0483ba1944dc8becbd15`,
//     pinata_secret_api_key: `58a206e573e08007ccb93b881f9c9f0971de7ec123ad1c2b337994e08f6bc6b1`,
//     "Content-Type": "multipart/form-data",
//   },
// });
