import { useState, usestate } from "react";
import axios from "axios";
import "./FileUpload.css";
const FileUpload = ({ contract, account, provider }) => {
  const { file, setFile } = useState(null);
  const { fileName, setFileName } = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData("file", file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `
            0483ba1944dc8becbd15`,
            pinata_secret_api_key: `
  58a206e573e08007ccb93b881f9c9f0971de7ec123ad1c2b337994e08f6bc6b1`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        //const signer = contract.connect(provider.getSigner());
        await contract.add(account, ImgHash);
        alert("Successfully image change");
        //now change the set file parameters to original state
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload");
      }
    }
  };
  const retrieveFile = () => {};
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
