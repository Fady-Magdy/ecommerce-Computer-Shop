import React from "react";
import "./profile.scss";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { appContext } from "../../context/AppContext";
export default function Profile() {
  const { favouriteList, setFavouriteList, addToCart, getStars ,userData} =
    useContext(appContext);
  const removeFromFavourite = (currentProductId) => {
    let newFavouriteList = favouriteList;
    newFavouriteList = newFavouriteList.filter(
      (product) => product.id !== currentProductId
    );
    setFavouriteList(newFavouriteList);
  };

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="left-side">
          <div className="top">
            <img src={userData.coverImage} alt="" />
          </div>
          <div className="image">
            <img src={userData.userImage} alt="user" />
          </div>
          <div className="bottom">
            <h1>{userData.username}</h1>
            <h3><span>Age:</span> {userData.userAge} Years Old</h3>
            <h3><span>Address:</span> {userData.address}</h3>
            <h3><span>Phone:</span> {userData.phone}</h3>
          </div>
        </div>
        <div className="center-side">
          <h1 className="favourite-title">Favourite List</h1>
          <div className="favourite-list">
            <hr />
            {favouriteList.length === 0 && (
              <h3 className="empty-list">List is Empty</h3>
            )}
            {favouriteList.map((item) => {
              return (
                <div key={item.id}>
                  <div className="favourite-item">
                    <div className="left">
                      <div className="image">
                        <img src={item.images[0]} alt="favourite-item" />
                      </div>
                      <div className="center">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="title">{item.title}</h3>
                        </Link>
                        <div className="rating">
                          <div className="stars">
                            {getStars(item)} ({item.raters})
                          </div>
                        </div>
                        <div className="price-count">
                          <p className="price">Price: ${item.price} </p>
                          <p className={`count ${item.count >= 5 ? "high" : "low"}`}>Quantity: {item.count}</p>
                        </div>
                      </div>
                    </div>

                    <div className="right">
                      <button
                        onClick={() => {
                          removeFromFavourite(item.id);
                        }}
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => {
                          addToCart(item);
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
        <div className="right-side">
          <h1 className="orders-title">Your Orders</h1>
          <hr />
        </div>
      </div>
    </>
  );
}
