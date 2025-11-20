// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MemethTreasury
 * @notice L1 Treasury Contract - Holds all ETH and handles settlements
 * @dev Minimalistic design: Security and transparency above all
 * 
 * Core Principles:
 * - All real value is held in ETH
 * - No token minting or burning
 * - Pure settlement layer for virtual positions
 * - Transparent accounting
 */
contract MemethTreasury {
    /// @notice Owner of the treasury (should be multi-sig in production)
    address public owner;
    
    /// @notice Total ETH deposited by users
    uint256 public totalDeposits;
    
    /// @notice Total ETH withdrawn by users
    uint256 public totalWithdrawals;
    
    /// @notice User balances in ETH
    mapping(address => uint256) public userBalances;
    
    /// @notice Emergency pause mechanism
    bool public paused;
    
    // Events
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event Settlement(address indexed user, int256 pnl);
    event Paused(bool status);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    modifier whenNotPaused() {
        require(!paused, "Contract paused");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        paused = false;
    }
    
    /**
     * @notice Deposit ETH into treasury
     * @dev Users deposit ETH to participate in the virtual meme market
     */
    function deposit() external payable whenNotPaused {
        require(msg.value > 0, "Must deposit > 0");
        
        userBalances[msg.sender] += msg.value;
        totalDeposits += msg.value;
        
        emit Deposit(msg.sender, msg.value);
    }
    
    /**
     * @notice Withdraw ETH from treasury
     * @param amount Amount of ETH to withdraw
     * @dev Only withdraw available balance (after settlements)
     */
    function withdraw(uint256 amount) external whenNotPaused {
        require(amount > 0, "Must withdraw > 0");
        require(userBalances[msg.sender] >= amount, "Insufficient balance");
        
        userBalances[msg.sender] -= amount;
        totalWithdrawals += amount;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit Withdrawal(msg.sender, amount);
    }
    
    /**
     * @notice Settle position PnL (called by authorized engine)
     * @param user User whose position is being settled
     * @param pnl Profit/Loss in wei (positive = profit, negative = loss)
     * @dev In production, this should be called by authorized L2 bridge or engine
     */
    function settle(address user, int256 pnl) external onlyOwner whenNotPaused {
        if (pnl > 0) {
            // User made profit
            userBalances[user] += uint256(pnl);
        } else if (pnl < 0) {
            // User made loss
            uint256 loss = uint256(-pnl);
            require(userBalances[user] >= loss, "Insufficient balance for loss");
            userBalances[user] -= loss;
        }
        
        emit Settlement(user, pnl);
    }
    
    /**
     * @notice Get user's available balance
     * @param user User address
     * @return Available ETH balance
     */
    function getBalance(address user) external view returns (uint256) {
        return userBalances[user];
    }
    
    /**
     * @notice Get treasury statistics
     * @return deposits Total deposits
     * @return withdrawals Total withdrawals
     * @return balance Current contract balance
     */
    function getStats() external view returns (
        uint256 deposits,
        uint256 withdrawals,
        uint256 balance
    ) {
        return (totalDeposits, totalWithdrawals, address(this).balance);
    }
    
    /**
     * @notice Emergency pause
     * @param _paused New pause status
     */
    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
        emit Paused(_paused);
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
