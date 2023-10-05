// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract BitLogixNFT is ERC721, Ownable {
    using Strings for uint256;

    // Base URI for token metadata
    string private _baseTokenURI;

    // Used to generate the tokenId
    uint256 private _tokenIdCounter;

    // Mapping to store token URIs
    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory baseURI) ERC721("BitLogixNFT", "BLOGIX") {
        _baseTokenURI = baseURI;
        _tokenIdCounter = 0;
    }

    // Mint a new NFT with the associated IPFS URI
    function mintNFT(address to, string memory ipfsURI) public returns (uint256){
        _tokenIdCounter += 1;
        uint256 newTokenId = _tokenIdCounter;
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, ipfsURI);
        return newTokenId;
    }

    // Function to update the base URI
    function setBaseURI(string memory newBaseURI) public {
        _baseTokenURI = newBaseURI;
    }

    // Internal function to set token URI
    function _setTokenURI(uint256 tokenId, string memory newTokenURI) internal {
        _tokenURIs[tokenId] = newTokenURI;
    }

    // Override the base URI function to include token-specific URI
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        string memory base = _baseTokenURI;
        string memory ipfsURI = _tokenURIs[tokenId];
        
        // Ensure the token has an associated IPFS URI
        require(bytes(ipfsURI).length > 0, "IPFS URI not set for this token");

        // Concatenate the base URI and IPFS URI
        return string(abi.encodePacked(base, ipfsURI));
    }
}
