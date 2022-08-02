import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { logout, user } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    //localStorage.removeItem("user");
  };

  const handleDelete = () => {
    fetch('/deleteuser', {
      method: 'DELETE',
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        email: user.email
      }) 
    });
    localStorage.removeItem("user");
    handleLogout();
  }

  // TODO: Handle if no picture or name
  return (
    <div className="profile">
      <h1 className="profile-heading">My Profile</h1>
      <img className="profile-img" src={user.picture} alt={user.name}/>
      <h2 className="profile-username" >{user.name}</h2>
      <p>{user.email}</p>
      <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      <button onClick={() => handleDelete()} class="delete-btn">Delete Account</button>
    </div>
  );
};

export default Profile;