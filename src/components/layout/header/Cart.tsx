import React, {useContext} from "react"
import {AppContext} from "../../../context/Appcontext"

export const Cart = () => {
  const {items} = useContext(AppContext)
  const cartCount = items && Array.isArray(items) && items.length
  return (
    <div className="cart">
      <svg
        className="cart-icon"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>Slice 1</title>
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="icon-shopping-cart">
            <polygon id="Path" points="0 0 24 0 24 24 0 24" />
            <path
              d="M15.6,13 C16.3,13 17,12.6 17.3,12 L20.9,5.5 C21.2,4.8 20.8,4 20,4 L5.2,4 L4.3,2 L1,2 L1,4 L3,4 L6.6,11.6 L5.2,14 C4.5,15.3 5.4,17 7,17 L19,17 L19,15 L7,15 L8.1,13 L15.6,13 Z M6.2,6 L18.3,6 L15.5,11 L8.5,11 L6.2,6 Z M7,18 C5.9,18 5,18.9 5,20 C5,21.1 5.9,22 7,22 C8.1,22 9,21.1 9,20 C9,18.9 8.1,18 7,18 Z M17,18 C15.9,18 15,18.9 15,20 C15,21.1 15.9,22 17,22 C18.1,22 19,21.1 19,20 C19,18.9 18.1,18 17,18 Z"
              id="Shape"
              fill="#000000"
              fillRule="nonzero"
            />
          </g>
        </g>
      </svg>
      <div className="cart-size" id="cart-size">
        {cartCount}
      </div>
    </div>
  )
}