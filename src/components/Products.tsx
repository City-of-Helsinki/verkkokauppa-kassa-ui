import React, {useState, useEffect, Component} from 'react';

interface Props {
  cartId: string;
}

function Products(props: Props) {
  const [cartItems, setCartItems] = useState();
  const [cartTotalsGross,setCartTotalsGross]=useState(0);
  const [cartTotalsNet,setCartTotalsNet]=useState(0);
  const [cartTotalsVat,setCartTotalsVat]=useState(0);
  let cartId = props.cartId;

  const fetchCart=() => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch('https://talpa-verkkokauppa-cart-experience-api-test.apps.arodevtest.hel.fi/'+cartId+'/totals')
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        if (myJson.items != null && myJson.items.length > 0) {
         
          var cartRows;
          let key: keyof typeof myJson.items // add this declaration

          var cartRows;
          {myJson.items.map((key: any, index: any) => (
              cartRows = <tr><td>{key.productId} x {key.quantity}</td><td>{key.rowTotal.grossValue}&euro;</td></tr>

          ))}

          var cartSize = document.getElementById('cart-size');
          cartSize!.innerText = myJson.items.length;

          console.log(cartRows)
          setCartItems(
            cartRows
          )

          setCartTotalsGross(myJson.cartTotals.grossValue);
      } 
     });
  }


  useEffect(()=>{
    fetchCart();
  },[])

  return (
    <div className="product-list">
      <div className="product-list-header">Olet tilaamassa seuraavat tuotteet:</div>
      <table>
        <tbody>
          {cartItems}
        </tbody>
      </table>
      <div className="product-summary">
        Maksettava summa yhteensä: <span className="cart-total">{cartTotalsGross} &euro;</span> 
      </div>
    </div>
  )
}

export default Products;