// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./BaseVault.sol";

// No Loss Charity Vaults are immutable and recipients cannot changed, 
contract CharityVault is BaseVault {
    
    struct Context {
        uint16 percentOfYield;
        address recipient;
    }

    // #########################
    // ##                     ##
    // ##        State        ##
    // ##                     ##
    // #########################

    Context ctx;

    uint256 yieldForRecipient;

    // #########################
    // ##                     ##
    // ##     Constructor     ##
    // ##                     ##
    // #########################

    constructor( 

        ERC20 _vaultToken,
        address _recipient,
        uint16 _tokenPercent,
        string memory name,
        string memory symbol

    ) BaseVault( 

        _vaultToken,
        name,
        symbol

    ) {

        ctx = Context(_tokenPercent, _recipient);

    }

    // #########################
    // ##                     ##
    // ##     User Facing     ##
    // ##                     ##
    // #########################

    function withdrawlToRecipient() external {
        
        vaultToken.transfer(ctx.recipient, yieldForRecipient);

    }


    // #########################
    // ##                     ##
    // ##      Override       ##
    // ##                     ##
    // #########################

    function adjustYeild() public override {

        uint256 totalInStrat = strat.withdrawlableVaultToken();
        uint256 totalYield = totalInStrat - depositedToStrat;

        uint256 toCharitable = totalYield * ctx.percentOfYield / 1e4;
        uint16 percentToSend = 10000 - ctx.percentOfYield;

        yieldForRecipient += toCharitable;

        yeildPerDeposit += (totalYield * percentToSend / 1e4) * SCALAR / totalDeposits;

    }
    

}