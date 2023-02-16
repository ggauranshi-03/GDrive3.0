import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Modal from "./components/Modal";
import Display from "./components/Display";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum); // to read data from smart contract
    //   const loadProvider = async () => {
    //     if (provider) {
    //       await provider.send("eth_requestAccounts", []);
    //       const signer = provider.getSigner(); //to write data on blockchain
    //       const address = await signer.getAddress();
    //       let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    //       const contract = new ethers.Contract(
    //         contractAddress,
    //         Upload.abi,
    //         signer
    //       );
    //       console.log(contract);
    //       setContract(contract);
    //       setProvider(provider);
    //     } else {
    //       console.error("Metamask is not installed !");
    //     }
    //   };
    //   provider && loadProvider();
    // }, []);
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "Your Contract Address Here";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <div className="App">
      <h1 style={{ color: "white" }}>BlockDrive</h1>
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
      <p style={{ color: "white" }}>
        Account : {account ? account : "Not connected"}
      </p>
    </div>
  );
}

export default App;
