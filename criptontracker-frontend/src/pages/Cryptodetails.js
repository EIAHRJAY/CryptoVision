// src/components/CryptoDetails.js
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useCrypto } from '../context/CryptoContext';
// import Details from '../components/Details';

// const CryptoDetails = () => {
//   const { id } = useParams();
//   const { cryptoData } = useCrypto();
//   const crypto = cryptoData ? cryptoData.find((c) => c.id === id) : null;

//   if (!crypto) {
//     return <div>Crypto not found!</div>;
//   }

//   return (
//     <Details/>
//   );
// };

// export default CryptoDetails;
// src/components/CryptoDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Details from '../components/Details';

const CryptoDetails = () => {
  const { id } = useParams();
  

  // if (!id) {
  //        return <div>Crypto not found!</div>;
  //      }
  return (<Details id={id} />);
};

export default CryptoDetails;
