import React, { useState, useEffect } from "react";
import { canisterId, idlFactory } from "../../declarations/nftminter/index";

// for requesting motoko token balance from the faucet https://bootcamp-faucet.vercel.app/
import { Actor, HttpAgent } from "@dfinity/agent";
import ledger_idl from "./motoko-bootcamp-tokens-ledger.did";
import { getAccountIdentifier } from "./utils";

const Plug = ({ nftminter }) => {
	// state
	const [isConnected, setIsConnected] = useState(false);
	const [plugAgent, setPlugAgent] = useState(undefined);
	const [plugActor, setPlugActor] = useState(undefined);
	const [plugUserPrincipal, setPlugUserPrincipal] = useState(undefined);
	const [motokoBootcampTokenBalance, setMotokoBootcampTokenBalance] = useState(undefined);
	const [whoAmI, setWhoAmI] = useState();

	// idl
	const nftminterIdl = idlFactory;
	const nftminterCanisterId = canisterId;

	// plug
	const whitelist = [nftminterCanisterId];
	const host = "https://mainnet.dfinity.network";

	const connectToPlug = async () => {
		if (!isConnected) {
			// make connection request
			const publicKey = await window.ic.plug.requestConnect({
				whitelist,
				host,
			});
			// console.log(`The connected user's public key is:`, publicKey);
			setIsConnected(await window.ic.plug.isConnected());
		}

		// create actor
		const actor = await window.ic.plug.createActor({
			canisterId: nftminterCanisterId,
			interfaceFactory: nftminterIdl,
		});
		setPlugActor(actor);

		// create agent
		// const agent = window.ic.plug.createAgent({ whitelist, host });
		// setPlugAgent(agent);

		// get principal id
		const principalId = await window.ic.plug.agent.getPrincipal();
		setPlugUserPrincipal(principalId);
	};

	// get balance
	useEffect(() => {
		if (plugUserPrincipal) {
			getMotokoBootcampTokenBalance();
		}
	}, [plugUserPrincipal]);

	// get motoko bootcamp tokens balance
	// const ic_agent = new HttpAgent({ host });
	// let readActorCache = {};

	// function readActor(canId, idl) {
	// 	if (canId in readActorCache) {
	// 		readActorCache[canId];
	// 	}
	// 	const actor = Actor.createActor(idl, {
	// 		agent: ic_agent,
	// 		canisterId: canId,
	// 	});

	// 	readActorCache[canId] = actor;
	// 	return actor;
	// }

	async function getMotokoBootcampTokenBalance() {
		// const ledger = readActor("yeeiw-3qaaa-aaaah-qcvmq-cai", ledger_idl);

		const ledger = Actor.createActor(ledger_idl, {
			agent: new HttpAgent({ host }),
			canisterId: "yeeiw-3qaaa-aaaah-qcvmq-cai", // faucet canister
		});
		const account = getAccountIdentifier(plugUserPrincipal);
		const balance = await ledger.account_balance_dfx({ account });
		// serialize bigInt
		const serialized = JSON.stringify(balance, (key, value) =>
			typeof value === "bigint" ? value.toString() + "n" : value
		);
		setMotokoBootcampTokenBalance(serialized);
	}

	async function getWhoAmI() {
		setWhoAmI(await plugActor.whoami());
	}

	return (
		<div>
			<button onClick={() => connectToPlug()} disabled={isConnected ? true : false}>
				Sign in with Plug
			</button>
			{/* <button onClick={() => window.ic.plug.disconnect()} disabled={isConnected ? false : true}>
				Disconnect
			</button> */}
			<p>Connection status: {isConnected.toString()}</p>
			<p>Plug Principal Id: {String(plugUserPrincipal)}</p>
			<p>Bootcamp token balance: {String(motokoBootcampTokenBalance)}</p>
			<a
				href="https://bootcamp-faucet.vercel.app/"
				rel="noreferrer noopener"
				target="_blank"
				style={{ display: "block", marginBottom: "1rem" }}
			>
				Token Faucet →
			</a>
			<button onClick={() => getWhoAmI()}>Request canister who am I</button>
			<p>Your Plug Principal Id is {whoAmI}</p>
		</div>
	);
};

export default Plug;
