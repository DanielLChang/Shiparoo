class PackagesController < ApplicationController

  def create
    @oackage = Package.find_by(package_params)

    if @package
      render json: { error: "Already tracking package!" }
    else
      @package = Package.new(package_params)
      @package.generate_pin
      @package.send_pin

      render json: { package_id: @package.id }
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
