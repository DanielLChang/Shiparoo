class Api::UsersController < ApplicationController
  before_action :authenticate_user, only: [:show, :update]

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.from_token_request(user_params)

    render "api/users/show"
  end

  private

  def user_params
    params.require(:auth).permit(:username, :password, :email, :demo)
  end
end
