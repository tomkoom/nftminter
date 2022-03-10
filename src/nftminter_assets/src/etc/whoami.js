import React from 'react'

const whoami = ({ nftminter }) => {
  const [whoAmI, setWhoAmI] = useState(undefined);
  const queryWhoAmI = async () => {
    nftminter.whoami().then((res) => setWhoAmI(res.toString()));
  };
  return (
    <div>
      <button onClick={() => queryWhoAmI()}>Who am I</button>
      <p>Who am I: {whoAmI ? whoAmI : String(whoAmI)}</p>
    </div>
  )
}

export default whoami