import React, { Component } from 'react';
import '../components/style.css';
import { useNavigate,Link } from 'react-router-dom';

class Login extends Component {

  state={
    email:"",
    password:"",
  }


  formsubmit = (e)=>{

    e.preventDefault(); 

    axios.get('/sanctum/csrf-cookie').then(() => {

      const payload={
        email:this.state.email,
        password:this.state.password
      }   
            axios.post('/api/login', payload, {
              headers: { 'Accept': 'application/json' } 
            }).then(response => {
              localStorage.setItem('token',response.data.token);            
              localStorage.setItem('user',JSON.stringify(response.data.user));            

              if(localStorage.getItem('token')){                 
                  this.props.navigate('/dashboard');
              }
             
            }).catch(error => {
              if(error.response) {             
                if (error.response.data.errors) {
                  alert('given data is invalid'); 
                }
            }
                   
            });
        });
    };

  render() {
    return (
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-danger text-white" style={{ borderRadius: "1rem" }}>
                <div className="card-body text-center">
                  <h3 className="fw-bold p-3 text-uppercase">Login</h3>
                  <p className="text-white-80">Please enter your email and password!</p>

                  <form onSubmit={this.formsubmit}>
                    <div className="form-outline form-white mb-4">                    
                      <input type="email" onChange={(e)=>{this.setState({email:e.target.value})}} className="form-control form-control-lg" placeholder="email" />
                    </div>

                    <div className="form-outline form-white mb-2 ">                     
                      <input type="password" onChange={(e)=>{this.setState({password:e.target.value})}} className="form-control form-control-lg" placeholder="password" />
                    </div>
                    <button className="btn btn-outline-light btn-lg px-5 m-3" type="submit">Login</button>
                  </form>
                  <p className='text-white text-lowercase m-3'>Don't have account? Register <Link className="" to="/register">Here</Link></p>

                </div>


              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const Navigate = (props) => {
  let navigate = useNavigate();
  return (
      <div>
          <Login {...props} navigate={navigate} />
      </div>
  );
};

export default Navigate;