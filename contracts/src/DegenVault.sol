// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./tokens/ERC20.sol";
import "./BaseVault.sol";
import "hardhat/console.sol";

// Jackpot & Dividend Vault
// This is the vault that the Jackpot and Degen dividends go.
// Balances for jackpot vs dividends are tracked with internal vars
contract DegenVault is BaseVault {

    // #########################
    // ##                     ##
    // ##      Structs        ##
    // ##                     ##
    // #########################

    struct Context {
        uint16 jackpotBP;
        uint16 dividendsBP;
    }
    
    // #########################
    // ##                     ##
    // ##       State         ##
    // ##                     ##
    // #########################

    Context public ctx;

    uint256 public minimumPrice; //wei
    uint256 public deadline; //seconds
    uint256 public jackpot; //wei

    uint256 timeTracker;
    uint256 timeDecay;
    uint256 growthFactor;

    address public lastDepositer;

    // #########################
    // ##                     ##
    // ##     Constructor     ##
    // ##                     ##
    // #########################

    constructor(

        ERC20 _vaultToken,
        uint16 _jackpotBP,
        uint16 _dividendsBP,
        uint256 _minimumPrice,
        uint256 _intialTimeInSeconds,
        string memory name,
        string memory symbol

    ) BaseVault(_vaultToken, name, symbol) {

        require(_jackpotBP + _dividendsBP <= 10000);

        ctx = Context(_jackpotBP, _dividendsBP);
        minimumPrice = _minimumPrice;
        timeTracker = _intialTimeInSeconds;

        // 24 hrs
        deadline = block.timestamp + _intialTimeInSeconds;

    }

    // #########################
    // ##                     ##
    // ##     User Facing     ##
    // ##                     ##
    // #########################

    // this could all be done better by making all BaseVault methods internal instead of overriding the logic
    // and extracting the logic to public functions

    function mintNewNFT(uint256 amount) public override returns (uint256) {

        require(
            amount >= minimumPrice &&
            block.timestamp <= deadline,
            "Underpaid, or past deadline"
        );

        Context memory ctxm = ctx;

        // contract execution never passed to 
        // untrusted contract so this pattern is safe
        uint id = _mint(msg.sender, currentId);

        uint256 totalBP = 10000 - (ctxm.jackpotBP + ctxm.dividendsBP);
        uint256 amountClaimable = amount * totalBP / 10000;

        if (id > 1) {

            // sorry :( , you dont get your own dividends?!
            adjustYeild(
                amount * ctxm.dividendsBP / 10000
            );

            jackpot += amount * ctxm.jackpotBP / 10000;
            deposits[id].tracker = amountClaimable * yeildPerDeposit;

        } else {
            jackpot = amount * (ctxm.jackpotBP + ctxm.dividendsBP) / 10000;
        }

        deposits[id].amount = amountClaimable;
        totalDeposits += amountClaimable;

        lastDepositer = msg.sender;

        adjustFactors();

        //ensure token reverts on failed
        vaultToken.transferFrom(msg.sender, address(this), amount);
        return id;

    }

     function depositToId(uint256 amount, uint256 id) external override {
        
        // trusted contract
        require(
            msg.sender == ownerOf[id] &&
            amount >= minimumPrice &&
            block.timestamp <= deadline
        );

        Context memory ctxm = ctx;

        // sorry :( , you dont get your own dividends?!
        adjustYeild(
            amount * ctxm.dividendsBP / 10000
        );

        uint256 totalBP = 10000 - (ctxm.jackpotBP + ctxm.dividendsBP);
        uint256 newAmount = amount * totalBP / 10000;

        jackpot += amount * ctxm.jackpotBP / 10000;
        totalDeposits += newAmount;

        deposits[id].amount += newAmount;
        deposits[id].tracker += newAmount * yeildPerDeposit;

        lastDepositer = msg.sender;

        adjustFactors();

        //ensure token reverts on failed
        vaultToken.transferFrom(msg.sender, address(this), amount);

    }

    function withdrawFromId(uint256 amount, uint256 id) public override {

        require(msg.sender == ownerOf[id]);
        require(amount == withdrawableById(id), "USE BURN");

        //trusted contract
        uint256 balanceCheck = vaultToken.balanceOf(address(this));

        // trusted contract
        if (amount > balanceCheck) {
            uint256 needed = amount - balanceCheck;
            withdrawFromStrat(needed, id);
        } else {

            uint256 yield = yieldPerId(id);
            if (amount > yield) {
                totalDeposits -= (amount - yield);
            }

        }

        deposits[id].amount -= amount;
        deposits[id].tracker -= amount * yeildPerDeposit;

        vaultToken.transfer(msg.sender, amount);

    }

    function claimJackpot() external {

        require (block.timestamp > deadline);

        vaultToken.transfer(lastDepositer, jackpot);
        
    }

    // #########################
    // ##                     ##
    // ##        Yeild        ##
    // ##                     ##
    // #########################

    // internal adjust yeild function that adjusts dividens from buy ins 
    // adjustYeild() manages startegy yeild
    function adjustYeild(uint256 amount) internal {

        yeildPerDeposit += amount * SCALAR / totalDeposits;

    }

    function withdrawableById(uint256 id) public override view returns (uint) {

        uint256 yield = yieldPerId(id);
        return deposits[id].amount + yield;

    }

    // #########################
    // ##                     ##
    // ##     Internal        ##
    // ##                     ##
    // #########################

    // every deposits shortens the time 33%
    // every deposit increases the minimum 33%
    function adjustFactors() internal {

        timeTracker -= (timeTracker * timeDecay / 10000);

        deadline += timeTracker;
        minimumPrice += (minimumPrice * growthFactor / 10000);

    }

}