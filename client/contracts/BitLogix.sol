// SPDX-License-Identifier: Unlicensed 
pragma solidity ^0.8.7;

contract BitLogix {
    struct Enterprise {
        string name;
        string businessDetails;
        string govAuthorizedID;
        bool isRegistered;
        bool hasClaimedTokens;
        uint256 balance;
    }

    struct Recipient {
        string name;
        string placeOfBusiness;
        string govAuthorizedID;
        bool isRegistered;
        bool hasClaimedTokens;
    }

    struct Product {
        string name;
        uint256 Price;
        uint256 quantity;
        string pickupPlace;
        string destinationPlace;
        address recipientAddress;
        bool isDelivered;
    }

    mapping(address => Enterprise) public enterprises;
    mapping(address => Recipient) public recipients;
    mapping(address => Product[]) public enterpriseProducts;

    uint256 public constant tokenRewardAmount = 1000 ether;
    uint256 public platformFeesCollected; // To store the total platform fees collected

    // Enterprise registration function
    function registerEnterprise(string memory name, string memory businessDetails, string memory govAuthorizedID) external {
        require(!enterprises[msg.sender].isRegistered, "Enterprise is already registered");

        enterprises[msg.sender] = Enterprise(name, businessDetails, govAuthorizedID, true, false, 0);
    }

    // Recipient registration function
    function registerRecipient(string memory name, string memory placeOfBusiness, string memory govAuthorizedID) external {
        require(!recipients[msg.sender].isRegistered, "Recipient is already registered");

        recipients[msg.sender] = Recipient(name, placeOfBusiness, govAuthorizedID, true, false);
    }

    // Function to claim tokens from the contract's balance
    function claimTokens() external {
        if (enterprises[msg.sender].isRegistered && !enterprises[msg.sender].hasClaimedTokens) {
            // Claim tokens for enterprises
            enterprises[msg.sender].hasClaimedTokens = true;
            payable(msg.sender).transfer(tokenRewardAmount);
        } else if (recipients[msg.sender].isRegistered && !recipients[msg.sender].hasClaimedTokens) {
            // Claim tokens for recipients
            recipients[msg.sender].hasClaimedTokens = true;
            payable(msg.sender).transfer(tokenRewardAmount);
        } else {
            revert("Tokens already claimed or sender is not registered");
        }
    }

    // Function to deposit BTT tokens into the contract
    function deposit() external payable {
        enterprises[msg.sender].balance += msg.value;
    }

    // Function to create a product for delivery to a recipient
    function createProduct(
        string memory name,
        uint256 Price,
        uint256 quantity,
        string memory pickupPlace,
        string memory destinationPlace,
        address recipientAddress
    ) external {
        require(enterprises[msg.sender].isRegistered, "Enterprise is not registered");
        require(recipients[recipientAddress].isRegistered, "Recipient is not registered");

        // Calculate the total payment value in BTT
        uint256 totalPaymentInBTT = Price * quantity * 1 ether;

        require(totalPaymentInBTT <= enterprises[msg.sender].balance, "Insufficient balance for total payment");

        // Calculate the platform fee and deduct it from the total payment
        uint256 platformFee = totalPaymentInBTT * 2 / 100;
        uint256 paymentToEnterprise = totalPaymentInBTT - platformFee;

        // Increment the platformFeesCollected variable with the platform fee
        platformFeesCollected += platformFee;

        // Create the product and add it to the enterprise's product list
        enterpriseProducts[msg.sender].push(
            Product({
                name: name,
                Price: Price,
                quantity: quantity,
                pickupPlace: pickupPlace,
                destinationPlace: destinationPlace,
                recipientAddress: recipientAddress,
                isDelivered: false
            })
        );

        // Transfer the payment to the enterprise in BTT
        payable(msg.sender).transfer(paymentToEnterprise);

        // Update the enterprise's balance after deducting the payment
        enterprises[msg.sender].balance -= paymentToEnterprise;
    }

    // Function for the recipient to confirm receipt of the product and release payment
    function confirmReceipt(address enterpriseAddress, uint256 productIndex) external {
        Product storage product = enterpriseProducts[enterpriseAddress][productIndex];
        require(!product.isDelivered, "Product already delivered");
        require(msg.sender == product.recipientAddress, "Unauthorized recipient");

        // Mark the product as delivered
        product.isDelivered = true;

        // Transfer the payment to the enterprise in BTT
        uint256 totalPaymentInBTT = product.Price * product.quantity * 1 ether;
        payable(enterpriseAddress).transfer(totalPaymentInBTT);
    }

    // Function to check the token balance of the contract
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // Function for the contract owner to withdraw the platform fees
    function withdrawPlatformFees() external {
        require(msg.sender == owner, "Only the contract owner can withdraw platform fees");

        // Transfer the platform fees to the contract owner
        payable(owner).transfer(platformFeesCollected);

        // Reset the platformFeesCollected variable after withdrawal
        platformFeesCollected = 0;
    }

    // Add the contract owner address in a private variable
    address private owner;

    constructor() {
        owner = msg.sender;
    }
}