import React from "react";
import MyRecipeItem from "./MyRecipeItem";

export default function ProfilePage({myrecipes}) {
  return (

    
    <>
      <h1> Мои избранные Рецепты</h1>
      <div className="row justify-content-evenly wrapper">
        {myrecipes.map((myrecipe) => <MyRecipeItem myrecipe={myrecipe} key={myrecipe.idMeal} />)}
      </div>
      <div className="d-flex justify-content-center align-item-center mt-3 mb-3">
      </div>
    </>
  )
}
