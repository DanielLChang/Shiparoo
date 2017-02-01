Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create, :show, :update]
    resources :webhooks, only: [:create]
    resources :packages, only: [:create, :update, :show, :index]
    get "/auth/oauth2/callback" => "auth0#callback"
    get "/auth/failure" => "auth0#failure"
  end
end
