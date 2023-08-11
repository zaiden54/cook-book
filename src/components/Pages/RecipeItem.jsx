import React, { useState } from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';

export default function RecipeItem({ recipe, addToFavHandler }) {
  let countIng = 0;
  const keys = Object.keys(recipe);
  keys.forEach((key) => {
    if (key.startsWith('strIngredient') && recipe[key]) countIng += 1;
  });
  const [status, setStatus] = useState(false);
  return (
    <div className="col-4 mt-3">
      <div className="card">
        <img
          style={{ height: '300px', objectFit: 'cover' }}
          src={recipe.strMealThumb}
          className="card-img-top"
          alt="recipe_picture"
        />
        <div className="card-body">
          <a href={`/recipe/${recipe.idMeal}`} className="card-text color-black d-flex justify-content-center link-dark">{recipe.strMeal}</a>
          <div className="d-flex justify-content-center align-item-center mt-3 mb-3">
            <Button variant="light" onClick={() => addToFavHandler(recipe, setStatus)}>Add to favourite</Button>
          </div>
          <Container>
            <Row className="row justify-content-evenly wrapper">
              Ingredients:
              {' '}
              {countIng}
            </Row>
            <Row>
              <Col md={4}>{recipe.strArea}</Col>
              <Col md={{ span: 4, offset: 4 }}>{recipe.strCategory}</Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}
