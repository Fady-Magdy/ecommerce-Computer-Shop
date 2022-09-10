import React from "react";
import "./profile.scss";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { appContext } from "../../context/AppContext";
export default function Profile() {
  const { favouriteList, setFavouriteList } = useContext(appContext);
  return (
    <>
      <Navbar />
      <div className="profile-page">Profile</div>
      {favouriteList.map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })}
    </>
  );
}
