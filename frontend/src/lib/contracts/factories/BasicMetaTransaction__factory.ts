/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  BasicMetaTransaction,
  BasicMetaTransactionInterface,
} from "../BasicMetaTransaction";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address payable",
        name: "relayerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "functionSignature",
        type: "bytes",
      },
    ],
    name: "MetaTransactionExecuted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "functionSignature",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "sigR",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "sigS",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "sigV",
        type: "uint8",
      },
    ],
    name: "executeMetaTransaction",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getChainID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getNonce",
    outputs: [
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "chainID",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "functionSignature",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "sigR",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "sigS",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "sigV",
        type: "uint8",
      },
    ],
    name: "verify",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061078f806100206000396000f3fe60806040526004361061003f5760003560e01c80630c53c51c146100445780632d0335ab1461006d578063564b81ef146100b15780636281133d146100c4575b600080fd5b6100576100523660046104ef565b6100f4565b60405161006491906106dc565b60405180910390f35b34801561007957600080fd5b506100a36100883660046104d5565b6001600160a01b031660009081526020819052604090205490565b604051908152602001610064565b3480156100bd57600080fd5b50466100a3565b3480156100d057600080fd5b506100e46100df36600461055f565b6102c6565b6040519015158152602001610064565b6001600160a01b03851660009081526020819052604090205460609061012090879046888888886102c6565b61017b5760405162461bcd60e51b815260206004820152602160248201527f5369676e657220616e64207369676e617475726520646f206e6f74206d6174636044820152600d60fb1b60648201526084015b60405180910390fd5b6001600160a01b03861660009081526020819052604090205461019f90600161040e565b6001600160a01b0387166000908152602081815260408083209390935591519091829130916101d2918a918c910161062a565b60408051601f19818403018152908290526101ec9161060e565b6000604051808303816000865af19150503d8060008114610229576040519150601f19603f3d011682016040523d82523d6000602084013e61022e565b606091505b5091509150816102805760405162461bcd60e51b815260206004820152601c60248201527f46756e6374696f6e2063616c6c206e6f74207375636365737366756c000000006044820152606401610172565b7f5845892132946850460bff5a0083f71031bc5bf9aadcd40f1de79423eac9b10b8833896040516102b3939291906106a7565b60405180910390a1979650505050505050565b600080610343883089896040516020016102e39493929190610661565b60408051601f1981840301815282825280516020918201207f19457468657265756d205369676e6564204d6573736167653a0a33320000000084830152603c8085019190915282518085039091018152605c909301909152815191012090565b6040805160008082526020820180845284905260ff87169282019290925260608101889052608081018790529192509060019060a0016020604051602081039080840390855afa15801561039b573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166103f25760405162461bcd60e51b8152602060048201526011602482015270496e76616c6964207369676e617475726560781b6044820152606401610172565b6001600160a01b038a8116911614915050979650505050505050565b600061041a82846106ef565b9392505050565b80356001600160a01b038116811461043857600080fd5b919050565b600082601f83011261044d578081fd5b813567ffffffffffffffff8082111561046857610468610743565b604051601f8301601f19908116603f0116810190828211818310171561049057610490610743565b816040528381528660208588010111156104a8578485fd5b8360208701602083013792830160200193909352509392505050565b803560ff8116811461043857600080fd5b6000602082840312156104e6578081fd5b61041a82610421565b600080600080600060a08688031215610506578081fd5b61050f86610421565b9450602086013567ffffffffffffffff81111561052a578182fd5b6105368882890161043d565b9450506040860135925060608601359150610553608087016104c4565b90509295509295909350565b600080600080600080600060e0888a031215610579578182fd5b61058288610421565b96506020880135955060408801359450606088013567ffffffffffffffff8111156105ab578283fd5b6105b78a828b0161043d565b9450506080880135925060a088013591506105d460c089016104c4565b905092959891949750929550565b600081518084526105fa816020860160208601610713565b601f01601f19169290920160200192915050565b60008251610620818460208701610713565b9190910192915050565b6000835161063c818460208801610713565b60609390931b6bffffffffffffffffffffffff19169190920190815260140192915050565b8481526bffffffffffffffffffffffff198460601b16602082015282603482015260008251610697816054850160208701610713565b9190910160540195945050505050565b6001600160a01b038481168252831660208201526060604082018190526000906106d3908301846105e2565b95945050505050565b60208152600061041a60208301846105e2565b6000821982111561070e57634e487b7160e01b81526011600452602481fd5b500190565b60005b8381101561072e578181015183820152602001610716565b8381111561073d576000848401525b50505050565b634e487b7160e01b600052604160045260246000fdfea2646970667358221220953d6599c0a1251b68ae0296d9019f9ea3a71ce445608c541f0d9f4070fad27764736f6c63430008040033";

type BasicMetaTransactionConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BasicMetaTransactionConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BasicMetaTransaction__factory extends ContractFactory {
  constructor(...args: BasicMetaTransactionConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "BasicMetaTransaction";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BasicMetaTransaction> {
    return super.deploy(overrides || {}) as Promise<BasicMetaTransaction>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BasicMetaTransaction {
    return super.attach(address) as BasicMetaTransaction;
  }
  connect(signer: Signer): BasicMetaTransaction__factory {
    return super.connect(signer) as BasicMetaTransaction__factory;
  }
  static readonly contractName: "BasicMetaTransaction";
  public readonly contractName: "BasicMetaTransaction";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BasicMetaTransactionInterface {
    return new utils.Interface(_abi) as BasicMetaTransactionInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BasicMetaTransaction {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as BasicMetaTransaction;
  }
}