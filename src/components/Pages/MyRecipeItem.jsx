import React, { useState } from 'react';
import {
  Button, Card, Col, Dropdown, DropdownButton,
} from 'react-bootstrap';
import axios from 'axios';

export default function MyRecipeItem({ myrecipe }) {
  // const [onerecipe, setOneRecipe] = useState(myrecipe);

  // const deletefavoutiteHandler = (id) => {
  //   axios
  //     .delete(`/api/profile/${myrecipe.id}`)
  //     .then((res) => {
  //       setOneRecipe(onerecipe.filter((onerec) => onerec.id !== id));
  //     })
  //     .catch((err) => console.log(err.response.data));
  // };
  return (

    <Col xs={4} className="mt-3 d-flex justify-content-center">
      <Card>
        <Card.Img style={{ height: '300px', objectFit: 'cover' }} variant="top" src={myrecipe.image} alt="recipe_picture" />
        <Card.Body className="d-flex flex-column justify-content-between">
          <div className="text-center">
            <Card.Title>{myrecipe.title}</Card.Title>
          </div>
          <div className="text-center mt-2 mb-2">
            <DropdownButton id="dropdown-basic-button" title="Рецепт" variant="info">
              <Dropdown.ItemText>{myrecipe.instructions}</Dropdown.ItemText>
            </DropdownButton>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Button variant="secondary" onClick={() => deletefavoutiteHandler(myrecipe.id)}>Удалить из избранного</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
