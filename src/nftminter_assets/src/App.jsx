import React, { useState } from "react";
import css from "./App.module.css";
import Mint from "./Sections/Mint/Mint";
import Hero from "./Sections/Hero/Hero";
import "./App.css";

// components
import Plug from "./Sections/Plug/Plug";

const App = ({ nftminter }) => {
	// state
	const [isConnected, setIsConnected] = useState(false);
	const [plugActor, setPlugActor] = useState(undefined);
	const [plugUserPrincipal, setPlugUserPrincipal] = useState(undefined);
	const [motokoBootcampTokenBalance, setMotokoBootcampTokenBalance] = useState(undefined);
	const [whoAmI, setWhoAmI] = useState(undefined);

	return (
		<div className="app">
			<Hero />
			<div className="app__content">
				<Plug
					nftminter={nftminter}
					isConnected={isConnected}
					setIsConnected={setIsConnected}
					plugActor={plugActor}
					setPlugActor={setPlugActor}
					plugUserPrincipal={plugUserPrincipal}
					setPlugUserPrincipal={setPlugUserPrincipal}
					motokoBootcampTokenBalance={motokoBootcampTokenBalance}
					setMotokoBootcampTokenBalance={setMotokoBootcampTokenBalance}
					whoAmI={whoAmI}
					setWhoAmI={setWhoAmI}
				/>
				<Mint nftminter={nftminter} isConnected={isConnected} plugActor={plugActor} />
			</div>
		</div>
	);
};

export default App;
