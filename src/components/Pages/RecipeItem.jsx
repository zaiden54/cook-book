import React from 'react';

export default function RecipeItem({ recipe }) {
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
        </div>
      </div>
    </div>
  );
}
