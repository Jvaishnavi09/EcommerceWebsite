import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="container col-sm-12 col-md-6 col-lg-4 d-flex flex-column  justify-content-center align-items-center vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center  gap-4 shadow-lg rounded-4">
        <h1 className="text-center">Profile Details</h1>
        {user && (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              src="/profile-user.png"
              alt="profile"
              style={{ height: "100px", width: "100px", margin: "10px 0px" }}
            />
            <div>
              <p>
                Username:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {user.userDetails.name}
                </span>
              </p>
            </div>
            <div>
              <p>
                Email:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {user.userDetails.email}
                </span>
              </p>
            </div>
            <div>
              <p>
                Role:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {user.userDetails.role}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
