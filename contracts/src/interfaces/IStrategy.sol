// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface IStrategy {

    function deposit(uint256 amount) external;

    function withdrawl(uint256 amount) external;

    function initVault(address vault) external;

    function withdrawlableVaultToken() external view returns (uint256);
    
}