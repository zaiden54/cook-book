import React from 'react';
import {
  Container, Image, ListGroup,
} from 'react-bootstrap';

export default function RecipePage({ meal }) {
  const ingredients = [];

  for (let i = 1; i <= 20; i += 1) {
    if (meal[`strIngredient${i}`] && meal[`strMeasure${i}`]) {
      ingredients.push([meal[`strIngredient${i}`], meal[`strMeasure${i}`], i]);
    }
  }

  const instructions = meal.strInstructions.split('\r\n').filter((el) => el !== '');

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="mt-3">{meal.strMeal}</h1>
      <Image fluid src={meal.strMealThumb} className="mt-3 col-6" />
      <p className="mt-3">{`${meal.strCategory}, ${meal.strArea}`}</p>
      <h3>{`Ингредиенты для «${meal.strMeal}»:`}</h3>

      <ListGroup as="ol" numbered className="col-6 mt-3">
        {ingredients.map((el) => <ListGroup.Item as="li" key={el[2]}>{`${el[0]} --- ${el[1]}`}</ListGroup.Item>)}
      </ListGroup>

      <h3 className="mt-3">{`Рецепт «${meal.strMeal}»:`}</h3>
      <ListGroup as="ol" numbered className="col-6 mt-3 mb-5">
        {instructions.map((el) => <ListGroup.Item as="li" key={instructions.indexOf(el)}>{el}</ListGroup.Item>)}
      </ListGroup>
    </Container>
  );
}
