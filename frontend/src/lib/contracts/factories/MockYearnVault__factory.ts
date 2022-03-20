/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, type Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MockYearnVault,
  MockYearnVaultInterface,
} from "../MockYearnVault";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "strategy",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "who",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPricePerFullShare",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161016e38038061016e83398101604081905261002f91610035565b50610063565b600060208284031215610046578081fd5b81516001600160a01b038116811461005c578182fd5b9392505050565b60fd806100716000396000f3fe6080604052348015600f57600080fd5b506004361060465760003560e01c80632e1a7d4d14604b57806370a0823114605b57806377c7b8fc14607e578063b6b55f2514604b575b600080fd5b6059605636600460b0565b50565b005b606c60663660046084565b50600190565b60405190815260200160405180910390f35b6001606c565b6000602082840312156094578081fd5b81356001600160a01b038116811460a9578182fd5b9392505050565b60006020828403121560c0578081fd5b503591905056fea26469706673582212209b73bd7fcf2555187306b5029bcd69b5437ec1bf2436accc68f8b74d26d65b0a64736f6c63430008040033";

type MockYearnVaultConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockYearnVaultConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockYearnVault__factory extends ContractFactory {
  constructor(...args: MockYearnVaultConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "MockYearnVault";
  }

  deploy(
    strategy: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MockYearnVault> {
    return super.deploy(strategy, overrides || {}) as Promise<MockYearnVault>;
  }
  getDeployTransaction(
    strategy: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(strategy, overrides || {});
  }
  attach(address: string): MockYearnVault {
    return super.attach(address) as MockYearnVault;
  }
  connect(signer: Signer): MockYearnVault__factory {
    return super.connect(signer) as MockYearnVault__factory;
  }
  static readonly contractName: "MockYearnVault";
  public readonly contractName: "MockYearnVault";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockYearnVaultInterface {
    return new utils.Interface(_abi) as MockYearnVaultInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockYearnVault {
    return new Contract(address, _abi, signerOrProvider) as MockYearnVault;
  }
}
