import axios from 'axios';
import Navbar from './Navigation.jsx';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../src/assets/profile.scss";
import Footer from './Footer';




function UserPage() {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

  const { id } = useParams();
  const [user, setUser] = useState(null)
  const [curUser, setCurUser] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios(
        `http://127.0.0.1:3000/users/${id}`
      )
      console.log(data["user"])
        let userJson = JSON.parse(data["user"]);
        setUser(userJson);
        setCurUser(data["is_curr_user"]);
    }
    getUser()
  },[]);
  
  return (
    user?
    <>
    <Navbar></Navbar>
    <section className="profile-sec">
      <div className="profile-container">
        <div className="content">
          <div className="image"><img src="../src/assets/avatar.jpg" alt="Profile picture" /></div>
          <div className="info">
            <h2>{user.first_name} {user.last_name}</h2>
            <h6>{user.username}</h6>
          </div>
          <div className="my-list">
            <Link to={`/advertisements?user_id=${user.id}`} className="button det-button ad-list">
              Advertisements
            </Link>
            {/* <a className="chats" href="#">My chats</a> */}
          </div>
          {curUser?
          <div className="button-container">
            <Link to={`/users/edit/${user.id}`} className="btn button det-button edit">
              Edit
            </Link>
            <button type="submit" className="btn delete">Delete</button>
          </div>
          : <></> }
        </div>
      </div>
    </section>
    <Footer></Footer>

    </>
    : <Loading></Loading>
  );
}

export default UserPage;