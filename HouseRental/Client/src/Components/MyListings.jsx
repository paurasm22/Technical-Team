import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const baseURL = "http://localhost:1000";
  const url = "http://localhost:1000/api";

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${url}/post/delete/${id}`, {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      console.log("Post deleted:", response.data);
      toast.error("Post Deleted", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      setListings((prevListings) =>
        prevListings.filter((home) => home._id !== id)
      );
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(`${url}/post/getuserpost`, {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        });
        console.log("Listings of a user:", response.data);
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [token]);

  return (
    <div>
      <center>
        <h1 className="mt-4">All Listings </h1>
      </center>
      <div>
        <div className="cards flex justify-center align-middle flex-wrap gap-7 lg:grid lg:grid-cols-4 lg:place-items-center lg:justify-center">
          {listings.map((homes) => (
            <div className="mt-6" key={homes._id}>
              <div className="card cursor-pointer" style={{ width: "18rem" }}>
                <img
                  src={`${baseURL}${homes.images[0]}`}
                  className="card-img-top h-60 w-45 cursor-pointer"
                  alt=""
                  onClick={() => navigate(`/details/${homes._id}`)}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {homes.roomnos} BHK in {homes.place}
                  </h5>
                  <p className="card-text">Rent : ₹ {homes.rent}</p>
                </div>
                <div className="card-body">
                  <a
                    href="#"
                    onClick={() => handleDelete(homes._id)}
                    className="card-link btn btn-danger mx-auto"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyListings;
