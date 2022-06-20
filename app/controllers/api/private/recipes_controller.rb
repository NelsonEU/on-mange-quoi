class Api::Private::RecipesController < ApplicationController
  RANDOM_RECIPE_URL = "https://www.themealdb.com/api/json/v1/1/random.php".freeze

  EXCLUDED_CATEGORIES = %w[Dessert Breakfast]

  def index
    render json: { local: find_recipe, external: find_recipe }
  end

  private

  def find_recipe
    recipe = HTTParty.get(RANDOM_RECIPE_URL)
    category = recipe.parsed_response['meals'][0]['strCategory']
    return recipe if EXCLUDED_CATEGORIES.exclude?(category)

    find_recipe
  end
end

