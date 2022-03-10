import React, { useState } from "react";

const Mint = ({ nftminter }) => {
	const [name, setName] = useState("");
	const [symbol, setSymbol] = useState("");

	function getName() {
		nftminter.name().then((res) => setName(res));
	}

	function getSymbol() {
		nftminter.symbol().then((res) => setSymbol(res));
	}

	const link = "http://localhost:8080";

	function mint() {
		nftminter.mint(`${link}/artworks/battery/1.png`).then((res) => console.log(res));
	}

	return (
		<div>
			<h2>Collection info</h2>
			<button onClick={() => getName()}>Get collection name</button>
			<p>Collection name: {name}</p>
			<button onClick={() => getSymbol()}>Get collection symbol</button>
			<p>Collection name: {symbol}</p>
			<button onClick={() => mint()}>Mint</button>
		</div>
	);
};

export default Mint;
