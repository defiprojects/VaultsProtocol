export const env = {
	NETWORK_ID: Number(import.meta.env.VITE_NETWORK_ID),
	ETHEREUM_NODE_URI: String(import.meta.env.VITE_ETHEREUM_NODE_URI),
	ETHERSCAN_BASE_URI: String(import.meta.env.VITE_ETHERSCAN_BASE_URI),
	WALLET_CONNECT_BRIDGE_URI: String(import.meta.env.VITE_WALLET_CONNECT_BRIDGE_URI),
	NFT_CONTRACT_ADDRESS: String(import.meta.env.VITE_NFT_CONTRACT_ADDRESS),
}