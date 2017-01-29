class PackagesController < ApplicationController

  def create
    @package = Package.new(package_params)

    if @package.generate_pin
      @package.send_pin
    else
      render json: { status: error }
    end

  end

  def update
    @package = Package.find(params[:id])

    if @package
    else
      render json: { error: "Unable to find package" }
    end

  end

  def show
    @package = Package.find(params[:id])
    if @package
      p @package
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

end
