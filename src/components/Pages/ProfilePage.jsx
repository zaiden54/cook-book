import React, { useState } from 'react';
import axios from 'axios';
import MyRecipeItem from './MyRecipeItem';

export default function ProfilePage({ myrecipes }) {
  const [currentRecipes, setRecipes] = useState(myrecipes);

  const deletefavoutiteHandler = (id) => {
    axios
      .delete(`/api/profile/${id}`)
      .then((res) => {
        // setRecipes(currentRecipes.filter((onerec) => onerec.id !== id));
        setRecipes((prev) => prev.filter((el) => el.id !== id));
      })
      .catch((err) => console.log(err.response.data));
  };
  return (

    <div className="container">
      <div className="text-center mt-4 mb-4">
        <h3>Мои избранные Рецепты</h3>
      </div>
      <div className="row justify-content-evenly wrapper">
        {currentRecipes.map((myrecipe) => (
          <MyRecipeItem
            myrecipe={myrecipe}
            key={myrecipe.idMeal}
            deletefavoutiteHandler={deletefavoutiteHandler}
          />
        ))}
      </div>
    </div>
  );
}
