import { useAuth0 } from "@auth0/auth0-react";
// import "../App.css"


const Profile = () => {
  const { logout, user } = useAuth0();

  const handleDelete = () => {
    fetch('http://localhost:3001/deleteuser', {  
      method: 'DELETE', 
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        user: user.email,
      }) 
    })
    .then(res => res.json())
    .then(data => console.log(data))
    logout({ returnTo: window.location.origin });
  }

  return (
    <div className="profile">
      <h1 className="profile-heading">My Profile</h1>
      <img className="profile-img" src={user.picture} alt={user.name}/>
      <h2 className="profile-username" >{user.name}</h2>
      <p>{user.email}</p>
      <button className="logout-btn" onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
      <button onClick={() => handleDelete()}>Delete account</button>
    </div>
  );
};

export default Profile;