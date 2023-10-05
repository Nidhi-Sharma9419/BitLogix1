import { create } from 'ipfs-http-client';
import pinataSDK from '@pinata/sdk';

// Initialize Pinata API client with your API keys
const pinata = pinataSDK('2985420746e8ba454e98', '1b4b8765cc741c60b66d93e7f5c39ec54bbde638530f4b3366ef13ada818ddd8');

export async function uploadToIPFS(file) {
  try {
    // Convert the selected file to a buffer
    const buffer = await file.arrayBuffer();
    
    // Create a pinata pin request
    const pinataOptions = {
      pinataMetadata: {
        name: file.name,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };

    const result = await pinata.pinFileToIPFS(new create([buffer], file.name), pinataOptions);

    if (result.IpfsHash) {
      const ipfsURI = `https://ipfs.io/ipfs/${result.IpfsHash}`;
      return ipfsURI;
    } else {
      throw new Error("IPFS upload failed.");
    }
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
}
