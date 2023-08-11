import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import RecipeItem from './RecipeItem';

export default function MainPage() {
  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch('api/recipe')
      .then((data) => data.json())
      .then((data) => setRecipes(data));
  }, [page]);
  // console.log(recipes);

  return (
    <>
      <h1>Рецепты</h1>
      <div className="row justify-content-evenly wrapper">
        {recipes.map((el) => <RecipeItem recipe={el} key={el.idMeal} />)}
      </div>
      {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button style={{ alignSelf: 'center' }} onClick={() => setPage((prev) => prev + 1)}>Click</button>
      </div> */}
      <div className="d-flex justify-content-center align-item-center mt-3 mb-3">
        <Button variant="outline-primary" onClick={() => setPage((prev) => prev + 1)}>Click</Button>
      </div>
      {/* <div className="container text-center">
        <div className="row justify-content-md-center">
          <button className="col-md-auto" onClick={() => setPage((prev) => prev + 1)}>Click</button>
        </div>
      </div> */}
    </>
  );
}
