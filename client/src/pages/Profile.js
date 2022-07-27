import { useAuth0 } from "@auth0/auth0-react";
// import "../App.css"


const Profile = () => {
  const { logout, user } = useAuth0();

  const logoutHandler = () => {
    logout({ returnTo: window.location.origin })
    localStorage.removeItem("user")
  }
  return (
    <div className="profile">
      <h1 className="profile-heading">My Profile</h1>
      <img className="profile-img" src={user.picture} alt={user.name} />
      <h2 className="profile-username" >{user.name}</h2>
      <p>{user.email}</p>
      <button className="logout-btn" onClick={logoutHandler}>Log Out</button>
    </div>
  );
};

export default Profile;