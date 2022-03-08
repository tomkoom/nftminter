import React, { useState } from "react";

const WhoAmI = ({ nftminter }) => {
	const [whoAmI, setWhoAmI] = useState("");

	const queryWhoAmI = async () => {
		nftminter.whoami().then((res) => setWhoAmI(res.toString()));
	};

	return (
		<div>
			<button onClick={() => queryWhoAmI()}>Who am I</button>
			<p>Who am I : {whoAmI}</p>
		</div>
	);
};

export default WhoAmI;
