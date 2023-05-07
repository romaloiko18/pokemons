import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { http } from '../services/api';
import { authService } from '../services/auth';
import { useAuth } from '../hooks/useAuth';
import { Button } from 'react-bootstrap';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e: any) => {
    e.preventDefault();

    const { data } = await http.post<{ success: boolean; token: string }>('/auth/signup', { email, password });
    authService.setToken(data.token);

    navigate('/');
  };

  return (
    <MDBContainer fluid className="bg-primary overflow-hidden">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <form onSubmit={handleSignUp}>
            <MDBCard className="bg-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">Sign up</h2>

                <p className="text-white-50 mb-3">Please enter your login and password!</p>

                <MDBInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  wrapperClass="mb-4 w-100"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                />
                <MDBInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  wrapperClass="mb-4 w-100"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                />

                <Button type="submit">Sign Up</Button>

                <hr className="my-4" />

                <Link to="/signin">
                  <Button className="w-100">Sign in</Button>
                </Link>
              </MDBCardBody>
            </MDBCard>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignUp;
