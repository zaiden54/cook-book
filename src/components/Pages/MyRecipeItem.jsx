import React, { useState } from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import axios from 'axios';

export default function MyRecipeItem({ myrecipe }) {
  const [onerecipe, setOneRecipe] = useState(myrecipe);

  const deletefavoutiteHandler = (id) => {
    axios
      .delete(`/api/profile/${myrecipe.id}`)
      .then((res) => {
        setOneRecipe(onerecipe.filter((onerec) => onerec.id !== id));
      })
      .catch((err) => console.log(err.response.data));
  };
  return (

    <div className="col-4 mt-1">
      <div className="card">
        <img
          style={{ height: '300px', objectFit: 'cover' }}
          src={myrecipe.strMealThumb}
          className="card-img-top"
          alt="recipe_picture"
        />
        <div className="card-body">
          <Container>
            <Row>
              <Col md={4}>{countIng}</Col>
              <Col md={{ span: 4, offset: 4 }}>time</Col>
            </Row>
          </Container>
          <Card.Text className=" col d-flex justify-content-between align-items-center">
            <button type="button" onClick={() => deletefavoutiteHandler(onerec.id)}> Удалить из избранного </button>
          </Card.Text>
        </div>
      </div>
    </div>
  );
}
