import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { http } from '../services/api';
import { authService } from '../services/auth';
import { useAuth } from '../hooks/useAuth';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useAuth('/');
  const handleSignIn = async (e: any) => {
    e.preventDefault();
    const { data } = await http.post<{ success: boolean; token: string }>('/auth/signin', { email, password });
    authService.setToken(data.token);
    navigate('/');
    toast('Login has been successful');
  };

  return (
    <MDBContainer fluid className="bg-primary overflow-hidden">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <form onSubmit={handleSignIn}>
            <MDBCard className="bg-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">Sign in</h2>

                <p className="text-white-50 mb-3">Please enter your login and password!</p>

                <MDBInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  wrapperClass="mb-4 w-100"
                  label="Email address"
                  id="email"
                  type="email"
                  size="lg"
                />

                <MDBInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  wrapperClass="mb-4 w-100"
                  label="Password"
                  id="password"
                  type="password"
                  size="lg"
                />

                <Button size="lg" type="submit">
                  Login
                </Button>

                <hr className="my-4" />

                <Link to="/signup">
                  <Button className="mb-2 w-100" size="lg">
                    Sign up
                  </Button>
                </Link>
              </MDBCardBody>
            </MDBCard>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignIn;
