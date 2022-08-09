import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const nevigate=useNavigate();

    const [name, Setname] = useState('');
    const [email, Setemail] = useState('');
    const [phone, Setphone] = useState('');
    const [password, Setpassword] = useState('');

    const saveUser = async (e) => {
        e.preventDefault();

        const data={
            name,email,phone,password
        }        
      
        const res = await axios.post("/api/registration", data, {
            headers: {
                "Accept": 'application/json'               
            }
        }).then((result) => {
            nevigate('/');
        }).catch((error) => {
            if(error.response) {                          
                if (error.response.data.errors) {
                  alert('given data is invalid');
                }
            }
        });

    }

    return (
        <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-danger text-white" style={{ borderRadius: "1rem" }}>
                <div className="card-body text-center">
                  <h3 className="fw-bold p-3 text-uppercase">Registration HERE</h3>
                                        <form onSubmit={saveUser}>
                                            <div className="row">
                                                <div className="col-md-12 p-3">
                                                    <input type="text" name="name" onChange={(e) => Setname(e.target.value)} className="form-control" placeholder="name" />
                                                </div>
                                                <div className="col-md-12 p-3">
                                                    <input type="text" name="email" className="form-control" onChange={(e) => Setemail(e.target.value)} placeholder="Email" />
                                                </div>
                                                <div className="col-md-12 p-3">
                                                    <input type="text" name="phone" className="form-control" onChange={(e) => Setphone(e.target.value)} placeholder="Phone" />
                                                </div>
                                                <div className="col-md-12 p-3">
                                                    <input type="password" name="password" className="form-control" onChange={(e) => Setpassword(e.target.value)} placeholder="Password" />
                                                </div>
                                            </div>
                                            <button type="submit" className='btn btn-outline-light btn-lg px-5 m-3'>Register</button>
                                        </form>
                                    </div>
                                    <p className='text-white text-lowercase text-center m-3'>have an account? login <Link className="" to="/">Here</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>             
            </section>
    )
}

export default Register