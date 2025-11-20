// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MemethPlatform
 * @dev Main contract for simulated memecoin trading platform
 * Users deposit ETH to open long/short positions on memecoins
 * All trading is simulated - no actual tokens are bought/sold
 * Profits/losses are settled in ETH based on simulated price movements
 */
contract MemethPlatform is ReentrancyGuard, Ownable {
    // Position types
    enum PositionType { LONG, SHORT }
    
    // Position structure
    struct Position {
        address trader;
        string memecoinSymbol;
        PositionType positionType;
        uint256 entryPrice;
        uint256 amount;
        uint256 leverage;
        uint256 timestamp;
        bool isOpen;
    }
    
    // Memecoin price data
    struct MemecoinData {
        string symbol;
        string name;
        uint256 currentPrice;
        uint256 lastUpdateTime;
        bool isActive;
    }
    
    // State variables
    mapping(uint256 => Position) public positions;
    mapping(string => MemecoinData) public memecoins;
    mapping(address => uint256) public userBalances;
    mapping(address => uint256[]) public userPositions;
    
    uint256 public nextPositionId;
    string[] public memecoinSymbols;
    
    // Constants
    uint256 public constant MAX_LEVERAGE = 10;
    uint256 public constant MIN_POSITION_AMOUNT = 0.001 ether;
    uint256 public constant PRICE_PRECISION = 1e18;
    
    // Events
    event MemecoinAdded(string symbol, string name, uint256 initialPrice);
    event PriceUpdated(string symbol, uint256 newPrice, uint256 timestamp);
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event PositionOpened(
        uint256 indexed positionId,
        address indexed trader,
        string memecoinSymbol,
        PositionType positionType,
        uint256 entryPrice,
        uint256 amount,
        uint256 leverage
    );
    event PositionClosed(
        uint256 indexed positionId,
        address indexed trader,
        uint256 exitPrice,
        int256 profitLoss
    );
    
    constructor() Ownable(msg.sender) {
        nextPositionId = 1;
    }
    
    /**
     * @dev Deposit ETH to the platform
     */
    function deposit() external payable nonReentrant {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        userBalances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    
    /**
     * @dev Withdraw ETH from the platform
     * @param amount Amount to withdraw
     */
    function withdraw(uint256 amount) external nonReentrant {
        require(amount > 0, "Withdrawal amount must be greater than 0");
        require(userBalances[msg.sender] >= amount, "Insufficient balance");
        
        userBalances[msg.sender] -= amount;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit Withdrawal(msg.sender, amount);
    }
    
    /**
     * @dev Add a new memecoin to the platform (owner only)
     * @param symbol Memecoin symbol
     * @param name Memecoin name
     * @param initialPrice Initial price in wei
     */
    function addMemecoin(
        string memory symbol,
        string memory name,
        uint256 initialPrice
    ) external onlyOwner {
        require(bytes(symbol).length > 0, "Symbol cannot be empty");
        require(bytes(name).length > 0, "Name cannot be empty");
        require(initialPrice > 0, "Initial price must be greater than 0");
        require(!memecoins[symbol].isActive, "Memecoin already exists");
        
        memecoins[symbol] = MemecoinData({
            symbol: symbol,
            name: name,
            currentPrice: initialPrice,
            lastUpdateTime: block.timestamp,
            isActive: true
        });
        
        memecoinSymbols.push(symbol);
        
        emit MemecoinAdded(symbol, name, initialPrice);
    }
    
    /**
     * @dev Update memecoin price (owner only)
     * @param symbol Memecoin symbol
     * @param newPrice New price in wei
     */
    function updatePrice(string memory symbol, uint256 newPrice) external onlyOwner {
        require(memecoins[symbol].isActive, "Memecoin does not exist");
        require(newPrice > 0, "Price must be greater than 0");
        
        memecoins[symbol].currentPrice = newPrice;
        memecoins[symbol].lastUpdateTime = block.timestamp;
        
        emit PriceUpdated(symbol, newPrice, block.timestamp);
    }
    
    /**
     * @dev Open a new position
     * @param memecoinSymbol Memecoin symbol
     * @param positionType Position type (LONG or SHORT)
     * @param amount Amount in ETH
     * @param leverage Leverage multiplier (1-10x)
     */
    function openPosition(
        string memory memecoinSymbol,
        PositionType positionType,
        uint256 amount,
        uint256 leverage
    ) external nonReentrant {
        require(memecoins[memecoinSymbol].isActive, "Memecoin does not exist");
        require(amount >= MIN_POSITION_AMOUNT, "Position amount too small");
        require(leverage >= 1 && leverage <= MAX_LEVERAGE, "Invalid leverage");
        require(userBalances[msg.sender] >= amount, "Insufficient balance");
        
        // Lock the position amount
        userBalances[msg.sender] -= amount;
        
        uint256 positionId = nextPositionId++;
        uint256 currentPrice = memecoins[memecoinSymbol].currentPrice;
        
        positions[positionId] = Position({
            trader: msg.sender,
            memecoinSymbol: memecoinSymbol,
            positionType: positionType,
            entryPrice: currentPrice,
            amount: amount,
            leverage: leverage,
            timestamp: block.timestamp,
            isOpen: true
        });
        
        userPositions[msg.sender].push(positionId);
        
        emit PositionOpened(
            positionId,
            msg.sender,
            memecoinSymbol,
            positionType,
            currentPrice,
            amount,
            leverage
        );
    }
    
    /**
     * @dev Close an existing position
     * @param positionId Position ID to close
     */
    function closePosition(uint256 positionId) external nonReentrant {
        Position storage position = positions[positionId];
        
        require(position.isOpen, "Position is not open");
        require(position.trader == msg.sender, "Not position owner");
        
        uint256 exitPrice = memecoins[position.memecoinSymbol].currentPrice;
        int256 profitLoss = calculateProfitLoss(positionId, exitPrice);
        
        position.isOpen = false;
        
        // Calculate final amount including profit/loss
        uint256 finalAmount;
        if (profitLoss >= 0) {
            finalAmount = position.amount + uint256(profitLoss);
        } else {
            uint256 loss = uint256(-profitLoss);
            if (loss >= position.amount) {
                // Total loss - position is liquidated
                finalAmount = 0;
            } else {
                finalAmount = position.amount - loss;
            }
        }
        
        // Return the final amount to user balance
        userBalances[msg.sender] += finalAmount;
        
        emit PositionClosed(positionId, msg.sender, exitPrice, profitLoss);
    }
    
    /**
     * @dev Calculate profit/loss for a position
     * @param positionId Position ID
     * @param exitPrice Exit price to use for calculation
     * @return profitLoss Profit (positive) or loss (negative)
     */
    function calculateProfitLoss(uint256 positionId, uint256 exitPrice) 
        public 
        view 
        returns (int256 profitLoss) 
    {
        Position memory position = positions[positionId];
        require(position.amount > 0, "Invalid position");
        
        int256 priceDiff;
        
        if (position.positionType == PositionType.LONG) {
            // Long position: profit when price goes up
            priceDiff = int256(exitPrice) - int256(position.entryPrice);
        } else {
            // Short position: profit when price goes down
            priceDiff = int256(position.entryPrice) - int256(exitPrice);
        }
        
        // Calculate profit/loss with leverage
        // profitLoss = (priceDiff / entryPrice) * amount * leverage
        int256 percentageChange = (priceDiff * int256(PRICE_PRECISION)) / int256(position.entryPrice);
        profitLoss = (percentageChange * int256(position.amount) * int256(position.leverage)) / int256(PRICE_PRECISION);
        
        return profitLoss;
    }
    
    /**
     * @dev Get user's open positions
     * @param user User address
     * @return positionIds Array of position IDs
     */
    function getUserOpenPositions(address user) external view returns (uint256[] memory) {
        uint256[] memory allPositions = userPositions[user];
        uint256 openCount = 0;
        
        // Count open positions
        for (uint256 i = 0; i < allPositions.length; i++) {
            if (positions[allPositions[i]].isOpen) {
                openCount++;
            }
        }
        
        // Create array of open positions
        uint256[] memory openPositions = new uint256[](openCount);
        uint256 index = 0;
        for (uint256 i = 0; i < allPositions.length; i++) {
            if (positions[allPositions[i]].isOpen) {
                openPositions[index] = allPositions[i];
                index++;
            }
        }
        
        return openPositions;
    }
    
    /**
     * @dev Get all memecoin symbols
     * @return Array of memecoin symbols
     */
    function getAllMemecoins() external view returns (string[] memory) {
        return memecoinSymbols;
    }
    
    /**
     * @dev Get user balance
     * @param user User address
     * @return User's balance in wei
     */
    function getBalance(address user) external view returns (uint256) {
        return userBalances[user];
    }
    
    /**
     * @dev Get memecoin price
     * @param symbol Memecoin symbol
     * @return Current price in wei
     */
    function getPrice(string memory symbol) external view returns (uint256) {
        require(memecoins[symbol].isActive, "Memecoin does not exist");
        return memecoins[symbol].currentPrice;
    }
    
    /**
     * @dev Receive function to accept ETH
     */
    receive() external payable {
        userBalances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
}
