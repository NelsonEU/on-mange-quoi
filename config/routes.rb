Rails.application.routes.draw do
  namespace :api do
    namespace :private do
      get 'recipes/index'
    end
  end
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
