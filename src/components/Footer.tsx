import React from 'react';
import { MDBCol, MDBContainer, MDBFooter, MDBIcon, MDBRow } from 'mdb-react-ui-kit';

const Footer = () => {
  return (
    <MDBFooter bgColor="light" className="pt-1 text-center text-lg-start text-muted">
      <section className="h-25">
        <MDBContainer className="text-center text-md-start mt-1">
          <MDBRow className="mt-1">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-1">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                TeamW
              </h6>
              <p>Perform best with TeamW</p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-1">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="/projects" className="text-reset">
                  Projects
                </a>
              </p>
              <p>
                <a href="/" className="text-reset">
                  Instagram
                </a>
              </p>
              <p>
                <a href="/" className="text-reset">
                  Facebook
                </a>
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className="text-center p-2" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright:
        <a className="text-reset fw-bold" href="">
          TeamW.edu.nau
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
