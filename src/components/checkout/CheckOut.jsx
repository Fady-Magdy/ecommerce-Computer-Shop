import React, { useContext, useRef } from "react";
import { useEffect } from "react";
import { appContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import "./checkout.scss";
export default function CheckOut() {
  const {
    cartData,
    cartTotalPrice,
    setCheckOut,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(appContext);
  const count = useRef(0);
  count.current = 0;
  useEffect(() => {
    cartData.length === 0 && setCheckOut(false);
  });
  return (
    <div className="check-out">
      <h1 className="check-out-title">Check Out</h1>
      <div className="products">
        {cartData.map((item) => {
          count.current += 1;
          return (
            <div key={item.id}>
              <div className="product">
                <div className="left">
                  <img src={item.image} alt="product" />
                </div>
                <div className="right">
                  <Link to={`/product/${item.id}`}>
                    <h1 className="title">{item.title}</h1>
                  </Link>
                  <p className="price">Price: ${item.originalPrice}</p>
                  <p className="price">Quantity: {item.quantity}</p>
                  <div className="check-out-buttons">
                    <button
                      className="remove"
                      onClick={removeItem}
                      id={item.id}
                      value={count.current}
                    >
                      Delete
                    </button>
                    <span className="change-buttons">
                      <button
                        className="change-quantity"
                        onClick={decreaseQuantity}
                        id={item.id}
                        data-quantity={item.quantity}
                        data-avquantity={item.avQuantity}
                        value={count.current}
                      >
                        -
                      </button>
                      <button
                        className="change-quantity"
                        onClick={increaseQuantity}
                        id={item.id}
                        data-quantity={item.quantity}
                        data-avquantity={item.avQuantity}
                        value={count.current}
                      >
                        +
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      <div
        onClick={() => {
          setCheckOut(false);
        }}
        className="exit"
      >
        X
      </div>
      <button className="next-step">Next Step</button>
      <h2 className="total">Total To Pay: ${cartTotalPrice}</h2>
    </div>
  );
}
