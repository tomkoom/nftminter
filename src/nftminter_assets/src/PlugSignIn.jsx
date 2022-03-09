import React, { useState } from "react";
import { idlFactory } from "../../declarations/nftminter/index";

const PlugSignIn = ({ nftminter }) => {
	// state
	const [isConnected, setIsConnected] = useState(false);
	const [actor, setActor] = useState({});
	const [plugUserPrincipal, setPlugUserPrincipal] = useState("");
	const [whoAmI, setWhoAmI] = useState("");

	const queryWhoAmI = async () => {
		nftminter.whoami().then((res) => setWhoAmI(res.toString()));
	};

	// plug
	const nnsCanisterId = "rrkah-fqaaa-aaaaa-aaaaq-cai";
	const whitelist = [nnsCanisterId];
	const host = "https://mainnet.dfinity.network";

	const connectToPlug = async () => {
		if (!isConnected) {
			// make connection request
			const publicKey = await window.ic.plug.requestConnect({
				whitelist,
				host,
			});
			console.log(`The connected user's public key is:`, publicKey);
			setIsConnected(await window.ic.plug.isConnected());
		}

		// create actor
		const plugActor = await window.ic.plug.createActor({
			canisterId: nnsCanisterId,
			interfaceFactory: idlFactory,
		});
		setActor(plugActor);
		console.log("Actor: ", plugActor);

		// get the user principal id
		const principalId = await window.ic.plug.agent.getPrincipal();
		setPlugUserPrincipal(principalId);
		console.log(`Plug's user principal Id is ${principalId}`);

		// const agent = window.ic.plug.createAgent({ whitelist, host });
		// console.log(agent);
	};

	return (
		<div>
			<button onClick={() => connectToPlug()} disabled={isConnected ? true : false}>
				Sign in with Plug
			</button>
			<button onClick={() => window.ic.plug.disconnect()} disabled={isConnected ? false : true}>
				Disconnect
			</button>
			<p>Connection status: {isConnected.toString()}</p>
			<p>Plug user principal: {plugUserPrincipal.toString()}</p>
			<button onClick={() => queryWhoAmI(actor)}>Who Am I</button>
			<p>{whoAmI}</p>
		</div>
	);
};

export default PlugSignIn;
