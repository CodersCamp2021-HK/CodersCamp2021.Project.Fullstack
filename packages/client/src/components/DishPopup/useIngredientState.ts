import { DishDto } from '@fullstack/sdk';
import { zipWith } from 'lodash';
import { useState } from 'react';

function useIngredientState({ ingredients }: DishDto, initiallyExcluded: string[] = []) {
  const [ingredientIncluded, setIngredientIncluded] = useState(
    ingredients.map((ing) => !initiallyExcluded.includes(ing.name)),
  );

  const ingredientState = zipWith(ingredients, ingredientIncluded, (ingredient, isIncluded) => ({
    ingredient,
    isIncluded,
  }));

  const toggleIngredient = (idx: number) =>
    setIngredientIncluded((prev) => prev.map((elem, i) => (i === idx ? !elem : elem)));

  return [ingredientState, toggleIngredient] as const;
}

export { useIngredientState };
