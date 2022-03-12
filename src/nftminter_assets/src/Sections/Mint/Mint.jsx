import React, { useState, useEffect } from "react";
import css from "./Mint.module.css";
import image from "../../../assets/cat.png";

const Mint = ({ nftminter, isConnected, plugActor }) => {
	const [name, setName] = useState("");
	const [symbol, setSymbol] = useState("");
	// num
	const [tokensMinted, setTokensMinted] = useState(); // num
	// get
	const [tokenIdUrl, setTokenIdUrl] = useState(0);
	const [tokenUrl, setTokenUrl] = useState("");
	const [tokenIdOwner, setTokenIdOwner] = useState(0);
	const [tokenOwner, setTokenOwner] = useState("");
	// status
	const [isMinting, setIsMinting] = useState(false);

	async function getName() {
		await nftminter.name().then((res) => setName(res));
	}

	async function getSymbol() {
		await nftminter.symbol().then((res) => setSymbol(res));
	}

	// const link = "http://localhost:8080";
	const linkNetwork = "https://ys7ac-hyaaa-aaaai-qibga-cai.raw.ic0.app";

	async function mint() {
		if (tokensMinted < 11) {
			setIsMinting(true);
			await plugActor
				.mint(`${linkNetwork}/${tokensMinted + 1}.svg`)
				.then((res) => console.log("Minted NFT with id", res.toString()));
			getNumMinted();
			setIsMinting(false);
		}
	}

	async function getOwnerOf() {
		await nftminter.ownerOf(tokenIdOwner).then((owner) => setTokenOwner(owner));
	}

	async function getTokenUrl() {
		await nftminter.tokenURI(tokenIdUrl).then((url) => setTokenUrl(url));
	}

	async function getNumMinted() {
		await nftminter.getNumTokensMinted().then((numTokensMinted) => {
			setTokensMinted(parseInt(numTokensMinted.toString()));
		});
	}

	// get number of tokens minted
	useEffect(async () => {
		if (isConnected) {
			getNumMinted();
		}
	}, [isConnected]);

	return (
		<div className="section">
			<h2>Collection info</h2>
			{isConnected ? (
				<div className={css.mint__info}>
					<button onClick={() => getName()}>Query collection name</button>
					<p>collection name: {name}</p>
					<button onClick={() => getSymbol()}>Query collection symbol</button>
					<p>collection symbol: {symbol}</p>
					<p>tokens minted: {tokensMinted}/11</p>
					<p>last minted token id is {tokensMinted}</p>
					<p>you are minting this svg:</p>
					{tokensMinted >= 0 && tokensMinted <= 11 ? (
						<img
							className={css.img}
							src={`https://ys7ac-hyaaa-aaaai-qibga-cai.raw.ic0.app/${tokensMinted + 1}.svg`}
							alt=""
						/>
					) : (
						<p>all nfts have been minted</p>
					)}
					<button onClick={() => mint()}>{!isMinting ? "Mint" : "Minting..."}</button>

					{/* owner */}
					<div className={css.withInput}>
						<p>get owner of token id # </p>
						<input onChange={(e) => setTokenIdOwner(parseInt(e.target.value))} type="number" />
						<button onClick={() => getOwnerOf()}>Get</button>
					</div>
					<p>token owner: </p>
					<p>{tokenOwner}</p>

					{/* url */}
					<div className={css.withInput}>
						<p>get url of token id # </p>
						<input onChange={(e) => setTokenIdUrl(parseInt(e.target.value))} type="number" />
						<button onClick={() => getTokenUrl()}>Get</button>
					</div>
					<p>token url: </p>
					<p>{tokenUrl}</p>
				</div>
			) : (
				<p>Sign in to see minting info</p>
			)}
		</div>
	);
};

export default Mint;
