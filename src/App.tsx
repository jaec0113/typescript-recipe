import React, { useState, useEffect } from "react"
import { FormEvent } from "react"
import "./App.css"
import { IRecipe } from "./IRecipe"
import Recipe from "./components/Recipe"

function App() {
  const [recipesFound, setRecipesFound] = useState<IRecipe[]>([])
  const [recipeSearch, setRecipeSearch] = useState("")

  const searchForRecipes = async (query: string): Promise<[IRecipe]> => {
    const result = await fetch(`http://localhost:3001/?search=${query}`)
    return (await result.json()).results
  }

  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const input = form.querySelector("#searchText") as HTMLInputElement
    setRecipeSearch(input.value)
  }

  useEffect(() => {
    ;(async () => {
      const query = encodeURIComponent(recipeSearch)
      if (query) {
        const response = await searchForRecipes(query)
        setRecipesFound(response)
      }
    })()
  }, [recipeSearch])

  return (
    <div className='App'>
      <h1>Recipe Search App</h1>
      <form className='searchForm' onSubmit={(e) => search(e)}>
        <input id='searchText' type='text' />
        <button>Search</button>
      </form>
      {recipeSearch && <p>Results for {recipeSearch}...</p>}

      <div className='recipe-container'>
        {recipesFound.length &&
          recipesFound.map((recipe) => (
            <Recipe key={recipe.href} recipe={recipe}></Recipe>
          ))}
      </div>
    </div>
  )
}

export default App
