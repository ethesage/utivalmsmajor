import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";

const PayPal = () => {
  return(
    <PayPalButton
    amount="1"
    onSuccess={(response) => console.log(response)}
    currency="USD"
    options={{
      clientId: "ARNza4Lg5kmlC32WTEWPZqtEUVynBIAewkg7Kx3mmO3xHPnjGVDypYpJORpqVORHGNjb8_zeW4Zvw2Pc"
    }}
    style= {{
      layout:  'horizontal',
      color:   'silver',
      // shape:   'rect',
      // label:   'paypal'
    }
    }
    />
  )
}

export default PayPal