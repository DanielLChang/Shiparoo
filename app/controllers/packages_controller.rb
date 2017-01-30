class PackagesController < ApplicationController

  # For testing
  def index
    @packages = Package.all
    render :index
  end

  def create
    @oackage = Package.find_by(package_params)

    if @package
      render json: { error: "Already tracking package!" }
    else
      @package = Package.new(package_params)
      @package.generate_pin
      @package.send_pin
      @package.send_initial_message

      render json: { package_id: @package.id }
    end
  end

  def update
    @package = Package.find(params[:id])

    if @package.update(package_params)
      @package.send_updates
    else
      render json: { error: "Unable to find package" }
    end

  end

  # For testing
  def show
    @package = Package.find(params[:id])
    if @package
      render :show
    else
      render json: { error: "Unable to find package" }
    end
  end

  private

  def package_params
    params.require(:package).permit(
      :tracking_number,
      :phone_number,
      :realtime_updates,
      :pin
    )
  end

  def shippo_status
    url = "https://api.goshippo.com/v1/tracks/"
  end

end
