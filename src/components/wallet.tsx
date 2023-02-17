import React,{useState} from 'react';


interface AddressProps{
  setAddress: (address :string) => void;
}

function WalletSpecifier (props:AddressProps)  {
  
  const isMartianWalletInstalled = (window as any).martian
  
  const getProvider = async () => {
    const response = await (window as any).martian.connect();
    const data = response["address"]
    props.setAddress(data);
    // if ("martian" in (window as any)) {
    //   return((window as any).martian);
    //   console.log("Martian wallet is available");

    // }
    // window.open("https://www.martianwallet.xyz/", "_blank");
  };


    return (
      <>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={getProvider}>
            Button
          </button>
      </>
    )
    
  
    
}

export default WalletSpecifier;