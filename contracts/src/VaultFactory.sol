// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./tokens/ERC721.sol";
import "./interfaces/IStrategy.sol";

interface iVault {
    function setStrat(address addr) external;
}


// creates vaults and returns address of controller / vault nft and the vault
contract VaultFactory {

    constructor(address _creator) {
        creator = _creator;
    }

    address immutable creator;

    // creation code of vaults and strats
    mapping (uint256 => bytes) public vaultType;
    uint256 public vaultsLength;
    mapping (uint256 => bytes) public stratType;
    uint256 public stratsLength;
    mapping (uint256 => bytes) public nftGeneratorType;
    uint256 public nftGeneratorsLength;

    address[] public vaults;

    // construcors are appended to the end of creation code
    function createVault(

        uint256 _vaultKey, 
        uint256 _stratType,
        address stratVault,
        address vaultToken, 
        address yield,
        bytes calldata _constructor,
        bytes calldata _nftGeneratorConstructor

    ) public returns(address vault) {

        bytes memory newVault = abi.encodePacked(vaultType[_vaultKey], _constructor);
        bytes memory newStrat = abi.encodePacked(stratType[_stratType], abi.encode(yield, vaultToken));
        bytes memory newNftGenerator = abi.encodePacked(nftGeneratorType[_vaultKey], _nftGeneratorConstructor);
        address strat;
        address nftGenerator;

        // use create2
        assembly {
            strat := create(0, add(newStrat, 0x20), mload(newStrat))
            vault := create(0, add(newVault, 0x20), mload(newVault))
            nftGenerator := create(0, add(newNftGenerator, 0x20), mload(newNftGenerator))
        }

        iVault(vault).setStrat(strat);
        IStrategy(strat).initVault(vault);
        // iNftDataGenerator(nftGenerator);
    }

    function addVault(bytes calldata newVault) external returns (uint256) {
        require (msg.sender == creator);

        uint256 current = vaultsLength;
        vaultType[vaultsLength] = newVault;
        vaultsLength++;

        return current;
    }

    function addNftGenerator(bytes calldata newNftGenerator) external returns (uint256) {
        require (msg.sender == creator);

        uint256 current = nftGeneratorsLength;
        nftGeneratorType[nftGeneratorsLength] = newNftGenerator;
        nftGeneratorsLength++;

        return current;
    }

    function addStrat(bytes calldata newStrat) external returns (uint256) {
        require (msg.sender == creator);

        uint256 current = stratsLength;
        stratType[stratsLength] = newStrat;
        stratsLength++;

        return current;

    }

}
