class Api::UsersController < ApplicationController
  before_action :authenticate_user, only: [:show, :update]

  def new
  end

  def create
  end

  def show
  end

  def update
  end
end
