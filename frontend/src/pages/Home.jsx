import React, {  useEffect } from 'react'
import api from '../services/api';

function Home() {

      useEffect(() => {
        api.get("/auth/me")
            .then((response) => {
                console.log("Current user:", response.data);
            })
            .catch((error) => {
                console.log("Request failed:", error.response?.status);
            });
    }, []);
  return (
   <div>
    <h1>SecureVault</h1>
   <p>Your secure credential management system.</p>
   </div>
  )
}

export default Home