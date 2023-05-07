import React from 'react';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';

const Faq = () => {
  return (
    <div className="d-flex flex-column g-4">
      <h2 style={{ color: 'white', marginTop: 50 }}>FAQ</h2>

      <MDBAccordion initialActive={1}>
        <MDBAccordionItem collapseId={1} headerTitle="Question 1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, excepturi, nemo. Aliquam asperiores cum deserunt dicta excepturi iure iusto
          magnam, mollitia nisi numquam placeat quam quo recusandae sit veritatis voluptate.
        </MDBAccordionItem>

        <MDBAccordionItem collapseId={2} headerTitle="Question 2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam, aspernatur beatae debitis dolor excepturi expedita ipsam iste itaque
          labore natus odio odit officiis perferendis quaerat rerum sapiente totam unde!
        </MDBAccordionItem>

        <MDBAccordionItem collapseId={3} headerTitle="Question 3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita facere incidunt minus natus numquam quasi sint totam! Blanditiis ea est
          illo iusto laboriosam nobis officiis quae quod, sit voluptate voluptates?
        </MDBAccordionItem>
      </MDBAccordion>
    </div>
  );
};

export default Faq;
