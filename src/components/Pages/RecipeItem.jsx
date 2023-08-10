import React, { useState } from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';

export default function RecipeItem({ recipe, addToFavHandler }) {
  const countIng = 0;
  const [status, setStatus] = useState(false);
  return (
    <div className="col-4 mt-1">
      <div className="card">
        <img
          style={{ height: '300px', objectFit: 'cover' }}
          src={recipe.strMealThumb}
          className="card-img-top"
          alt="recipe_picture"
        />
        <div className="card-body">
          <a href={`/recipe/${recipe.idMeal}`} className="card-text">{recipe.strMeal}</a>
          <div className="d-flex justify-content-center align-item-center mt-3 mb-3">
            <Button variant="light" onClick={() => addToFavHandler(recipe, setStatus)}>Add to favourite</Button>
          </div>
          <Container>
            <Row>
              <Col md={4}>{countIng}</Col>
              <Col md={{ span: 4, offset: 4 }}>time</Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}
