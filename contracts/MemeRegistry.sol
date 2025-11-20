// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MemeRegistry
 * @notice Registry for all memes in the virtual market
 * @dev Tracks meme metadata, NOT tokens - this is a virtual exposure system
 * 
 * Core Principles:
 * - No ERC20 tokens created
 * - Only metadata and identifiers stored
 * - Immutable meme data (culture preservation)
 * - Transparent creation history
 */
contract MemeRegistry {
    /// @notice Meme metadata structure
    struct Meme {
        uint256 id;
        string name;
        string symbol;
        string imageUri;
        address creator;
        uint256 createdAt;
        bool active;
    }
    
    /// @notice Owner/admin address
    address public owner;
    
    /// @notice Meme counter
    uint256 public memeCount;
    
    /// @notice Mapping from meme ID to Meme data
    mapping(uint256 => Meme) public memes;
    
    /// @notice Mapping from symbol to meme ID (for uniqueness)
    mapping(string => uint256) public symbolToId;
    
    /// @notice Creation fee in ETH
    uint256 public creationFee;
    
    // Events
    event MemeCreated(
        uint256 indexed id,
        string name,
        string symbol,
        address indexed creator,
        uint256 timestamp
    );
    event MemeDeactivated(uint256 indexed id);
    event CreationFeeUpdated(uint256 newFee);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor(uint256 _creationFee) {
        owner = msg.sender;
        creationFee = _creationFee;
        memeCount = 0;
    }
    
    /**
     * @notice Create a new meme in the registry
     * @param name Meme name
     * @param symbol Meme symbol (must be unique)
     * @param imageUri IPFS or permanent storage URI
     * @return memeId The ID of the newly created meme
     */
    function createMeme(
        string memory name,
        string memory symbol,
        string memory imageUri
    ) external payable returns (uint256 memeId) {
        require(msg.value >= creationFee, "Insufficient creation fee");
        require(bytes(name).length > 0, "Name required");
        require(bytes(symbol).length > 0, "Symbol required");
        require(bytes(imageUri).length > 0, "Image URI required");
        require(symbolToId[symbol] == 0, "Symbol already exists");
        
        memeCount++;
        memeId = memeCount;
        
        memes[memeId] = Meme({
            id: memeId,
            name: name,
            symbol: symbol,
            imageUri: imageUri,
            creator: msg.sender,
            createdAt: block.timestamp,
            active: true
        });
        
        symbolToId[symbol] = memeId;
        
        emit MemeCreated(memeId, name, symbol, msg.sender, block.timestamp);
        
        return memeId;
    }
    
    /**
     * @notice Get meme data by ID
     * @param memeId Meme identifier
     * @return Meme struct
     */
    function getMeme(uint256 memeId) external view returns (Meme memory) {
        require(memeId > 0 && memeId <= memeCount, "Invalid meme ID");
        return memes[memeId];
    }
    
    /**
     * @notice Check if symbol exists
     * @param symbol Symbol to check
     * @return exists True if symbol is already registered
     */
    function symbolExists(string memory symbol) external view returns (bool) {
        return symbolToId[symbol] != 0;
    }
    
    /**
     * @notice Deactivate a meme (emergency only)
     * @param memeId Meme to deactivate
     * @dev Should only be used for illegal content or extreme violations
     */
    function deactivateMeme(uint256 memeId) external onlyOwner {
        require(memeId > 0 && memeId <= memeCount, "Invalid meme ID");
        require(memes[memeId].active, "Already inactive");
        
        memes[memeId].active = false;
        emit MemeDeactivated(memeId);
    }
    
    /**
     * @notice Update creation fee
     * @param newFee New fee in wei
     */
    function setCreationFee(uint256 newFee) external onlyOwner {
        creationFee = newFee;
        emit CreationFeeUpdated(newFee);
    }
    
    /**
     * @notice Get all active memes count
     * @return count Number of active memes
     */
    function getActiveMemeCount() external view returns (uint256 count) {
        count = 0;
        for (uint256 i = 1; i <= memeCount; i++) {
            if (memes[i].active) {
                count++;
            }
        }
        return count;
    }
    
    /**
     * @notice Withdraw collected fees
     */
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Transfer failed");
    }
    
    /**
     * @notice Transfer ownership
     * @param newOwner New owner address
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
