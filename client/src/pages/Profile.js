import { useAuth0 } from "@auth0/auth0-react";
import "../App.css"


const Profile = () => {
  const { logout, user } = useAuth0();

  return (
    <div className="profile">
      <h1>My Profile</h1>
      <img src={user.picture} alt={user.name}/>
      <h2>{user.name}</h2>
      <p>Username: {user.email}</p>
      <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
    </div>
  );
};

export default Profile;