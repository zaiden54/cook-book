import React from 'react';
import {
  Button, Card, Col,
} from 'react-bootstrap';

export default function MyRecipeItem({ myrecipe, deletefavoutiteHandler }) {
  return (
    <Col xs={4} className="mt-3 d-flex justify-content-center">
      <Card>
        <Card.Img style={{ height: '300px', objectFit: 'cover' }} variant="top" src={myrecipe.image} alt="recipe_picture" />
        <Card.Body className="d-flex flex-column justify-content-between">
          <div className="text-center">
            <Card.Title>{myrecipe.title}</Card.Title>
          </div>
          <div className="text-center mt-2 mb-2">
            {/* <DropdownButton id="dropdown-basic-button" title="Рецепт" variant="info">
              <Dropdown.ItemText>{myrecipe.instructions}</Dropdown.ItemText>
            </DropdownButton> */}
            <Button href={`/recipe/${myrecipe.idMeal}`}>Рецепт</Button>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Button variant="secondary" onClick={() => deletefavoutiteHandler(myrecipe.id)}>Удалить из избранного</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
