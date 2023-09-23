import React from 'react'

const ReceiveCoinModal = ({ selectedCryptoData }) => {
  return (
    <section>
      <p>{selectedCryptoData && selectedCryptoData.address}</p>
    </section>
  );
};

export default ReceiveCoinModal