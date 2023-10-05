import bitLogixContractABI from '../ABI/BitLogixNFT.json';
import { ethers } from "ethers";

const [depositAmount, setDepositAmount] = useState(""); 

  const depositnftfee = async () => {
    try {
      const bitLogixContractAddress = "0x6fa424C2379E7b86d039562dA5E8b6E25dcc4af5";
     
  const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const bitLogixContract = new ethers.Contract(bitLogixContractAddress, bitLogixContractABI, signer);

    
      const depositAmountWei = ethers.parseUnits(depositAmount, "ether");
      const gasLimit = 2106500;
     
      const tx = await bitLogixContract.deposit({ value: depositAmountWei, gasLimit: gasLimit });
      console.log("working??");
      await tx.wait();

  
      
    } catch (error) {
      console.error("Error depositing tokens:", error);
    }
  };

  depositnftfee();