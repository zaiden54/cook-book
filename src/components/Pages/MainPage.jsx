/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Button, Col, Container, Dropdown, Row,
} from 'react-bootstrap';
import RecipeItem from './RecipeItem';

export default function MainPage() {
  const [page, setPage] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [type, setType] = useState('all/all');
  useEffect(() => {
    fetch(`api/recipes/${type}/${page}`)
      .then((data) => data.json())
      .then((data) => setRecipes((prev) => [...prev, ...data]));
  }, [page]);
  useEffect(() => {
    fetch(`api/recipes/${type}/${page}`)
      .then((data) => data.json())
      .then((data) => setRecipes(() => data));
  }, [type]);
  useEffect(() => {
    fetch('api/categories')
      .then((data) => data.json())
      .then((data) => setCategories(data));
  }, []);
  useEffect(() => {
    fetch('api/countries')
      .then((data) => data.json())
      .then((data) => setCountries(data));
  }, []);
  const addToFavHandler = async (recipe, setStatus) => {
    const response = await fetch('api/recipe/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log('ERROR------------\n', error);
      return;
    }
    setStatus(() => true);
  };
  return (
    <>
      <h1>Рецепты</h1>
      <div style={{
        display: 'block',
        width: 700,
        padding: 30,
      }}
      >
        <Container>
          <Row>
            <Col>
              <Button variant="secondary" onClick={() => setType('all/all')}>Remove filters</Button>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="secondary">
                  Category
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.map((category) => <Dropdown.Item onClick={() => setType(`categories/${category.strCategory}`)} key={category.id}>{category.strCategory}</Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="secondary">
                  Country
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {countries.map((country) => <Dropdown.Item onClick={() => setType(`countries/${country.strArea}`)} key={country.id}>{country.strArea}</Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="row justify-content-evenly wrapper">
        {recipes.map((el) => <RecipeItem recipe={el} key={el.idMeal} addToFavHandler={addToFavHandler} />)}
      </div>
      <div className="d-flex justify-content-center align-item-center mt-3 mb-3">
        <Button variant="outline-primary" onClick={() => setPage((prev) => prev + 1)}>Добавить</Button>
      </div>
    </>
  );
}
