import axios from 'axios';
import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC'

const Login = () => {
   const navigate = useNavigate();
   const [user, setUser] = useState({
      email: "",
      password: ""
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.post("http://localhost:8000/Login", user)
         .then((res) => {
            alert("Successfully logged in");
            localStorage.setItem("user", JSON.stringify(res.data));
            const isLoggedIn = JSON.parse(localStorage.getItem("user"));
            const { userType } = isLoggedIn
            switch (userType) {
               case "Admin":
                  navigate("/AdminHome")
                  break;
               case "Ordinary":
                  navigate("/HomePage")
                  break;
               case "Agent":
                  navigate("/AgentHome")
                  break;

               default:
                  navigate("/Login")
                  break;
            }
         })
         .catch((err) => {
            if (err.response && err.response.status === 401) {
               alert("User doesn`t exists");
            }
            navigate("/Login");
         });
   };

   return (
      <>
         <Navbar bg="dark" variant="dark">
            <Container>
               <Navbar.Brand><svg style={{background:'white', marginRight:'10px'}}xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12v4.143C2 17.167 2.897 18 4 18h1a1 1 0 0 0 1-1v-5.143a1 1 0 0 0-1-1h-.908C4.648 6.987 7.978 4 12 4s7.352 2.987 7.908 6.857H19a1 1 0 0 0-1 1V18c0 1.103-.897 2-2 2h-2v-1h-4v3h6c2.206 0 4-1.794 4-4 1.103 0 2-.833 2-1.857V12c0-5.514-4.486-10-10-10z"></path></svg>Objection Care </Navbar.Brand>
               <ul className="navbar-nav">
                  <li className="nav-item mb-2">
                     <Link to={'/'}
                        className={`nav-link text-light `}
                     >
                        <svg style={{background:'white',marginRight:'10px'}} xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"><path d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z"></path></svg>
                        Home
                     </Link>
                  </li>
                  {/* <li className="nav-item mb-2">
                     <Link
                        to={'/about'}
                        className={`nav-link text-light `}
                     >
                        About
                     </Link>
                  </li> */}
                  <li className="nav-item mb-2">
                     <Link
                     to={'/signup'}
                        className={`nav-link text-light `}
                     >
                        <svg style={{background:'white',marginRight:'10px'}} xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"><path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 8a3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4 3.91 3.91 0 0 0-4 4zm6 0a1.91 1.91 0 0 1-2 2 1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2zM4 18a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2z"></path></svg>
                        SignUp
                     </Link>
                  </li>
                  <li className="nav-item mb-2">
                     <Link
                     to={'/login'}
                        className={`nav-link text-light `}
                     >
                        <svg style={{background:'white', marginRight:'10px'}}xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" ><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></svg>
                        Login
                     </Link>
                  </li>
               </ul>
            </Container>
         </Navbar>
         <section className="vh-100 gradient-custom">
            <div className="container burlywood">
               <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                     <div className="card gray">
                        <div className="card-body p-5 text-center gray">
                           <div className="mb-md-5 mt-md-4 pb-5">
                              <h2 className="fw-bold mb-4">Login For Registering the Objection </h2>
                              <p className="fw-bold text-black-60 mb-5">Please enter your Details!</p>
                              <form onSubmit={handleSubmit}>
                                 <div className="form-outline fw-bold form-white mb-4">
                                    <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control form-control-lg" required />
                                    <label className="form-label" htmlFor="email"> Enter your Email</label>
                                 </div>
                                 <div className="form-outline fw-bold form-white mb-4">
                                    <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control form-control-lg" autoComplete="off" required />
                                    <label className="form-label" htmlFor="password"> Enter your Password</label>
                                 </div>
                                 <button className="btn btn-outline-light fw-bold btn-lg px-5" type="submit">Login</button>
                              </form>
                           </div>
                           <div>
                              <p className="mb-0 fw-bold">Don't have an account? <Link to="/SignUp">SignUp</Link></p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <Footer/>
      </>
   );
};

export default Login;
