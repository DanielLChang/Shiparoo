Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :webhooks, only: [:create]
    resources :packages, only: [:create, :update, :show, :index]
  end

  get '*path', to: 'static_pages#root'
end
