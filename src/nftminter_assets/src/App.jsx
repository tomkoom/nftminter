import React from "react";
import Contacts from "./Contacts";
import WhoAmI from "./WhoAmI";

const App = ({ nftminter }) => {
	return (
		<div>
			<p>App</p>
			<WhoAmI nftminter={nftminter} />
			{/* <Contacts nftminter={nftminter} /> */}
		</div>
	);
};

export default App;
