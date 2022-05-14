import { DishDto } from '@fullstack/sdk';
import _ from 'lodash';
import { useState } from 'react';

function useIngredientState({ ingredients }: DishDto) {
  const [ingredientIncluded, setIngredientIncluded] = useState(_.fill(Array(ingredients.length), true));

  const ingredientState = _.zipWith(ingredients, ingredientIncluded, (ingredient, isIncluded) => ({
    ingredient,
    isIncluded,
  }));

  const toggleIngredient = (idx: number) =>
    setIngredientIncluded((prev) => prev.map((elem, i) => (i === idx ? !elem : elem)));

  return [ingredientState, toggleIngredient] as const;
}

export { useIngredientState };
