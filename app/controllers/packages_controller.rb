class PackagesController < ApplicationController

  def create
    @package = Package.find_by(package_params)

    if @package
      render json: { error: "Package already tracked" }
    else
      @package = Package.new(package_params)
      render json: { package_id: @package.id }
    end
  end

  def update
    @package = Package.find(params[:id])

    if @package
    else
      render json: { error: "Can not find package" }
    end

  end

  private

  def package_params
    params.require(:package).permit(:tracking_number, :phone_number, :realtime_updates)
  end

end
