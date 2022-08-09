import React, { useState } from 'react';
import Nav from "../components/Nav";
import { useNavigate } from 'react-router-dom';


function AddImage() {
  const [src, Setsrc] = useState('');
  const nevigate = useNavigate();
  const saveImage = async (e) => {
    e.preventDefault();

    const data = {
      src
    }

    const res = await axios.post("/api/image-upload", data, {
      headers: {
        "Accept": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }).then((result) => {
      nevigate('/dashboard');
      alert('img upload successfully');
    }).catch((error) => {
      if (error.response) {      
        if (error.response.data.errors) {
          alert('given data is invalid');
        }
      }
    });

  }
  return (
    <>
      <Nav />
      <div className='card shadow p-3'>
        <div className='d-flex justify-content-between'>
          <h2>Dashboard</h2>
        </div>
      </div>

      <div className='p-5'>
        <form onSubmit={saveImage}>
          <input type="text" name="link" onChange={(e) => Setsrc(e.target.value)} className="form-control" placeholder="Enter Image Link" />
          <button type="submit" className='btn btn-primary mt-2'>Submit</button>
        </form>
      </div>

      <div className='mb-3'>
        <center>
          <p>Image Preview</p>
          <img src={src}
            className="rounded" alt="img" height={250} width={400} id="img-src" />
        </center>
      </div>

    </>
  )
}

export default AddImage