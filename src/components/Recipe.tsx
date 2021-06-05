import { IRecipe } from "../IRecipe"

const Recipe = (props: { recipe: IRecipe }) => {
  const { recipe } = props

  return (
    <div className='recipe'>
      <div className='title'>
        <img src={recipe.thumbnail} alt='recipe' />
        <p>{recipe.title}</p>
      </div>
      {recipe.ingredients && (
        <ul>
          {recipe.ingredients.split(",").map((ingredient) => (
            <li>{ingredient}</li>
          ))}
        </ul>
      )}

      <a href={recipe.href} target='_blank' rel='noreferrer'>
        View Recipe
      </a>
    </div>
  )
}

export default Recipe
