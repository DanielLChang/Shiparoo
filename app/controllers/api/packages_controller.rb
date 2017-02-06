class Api::PackagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  # For testing fake package
  def index
    @packages = Package.all.where(user_id: params[:user_id])
  end

  # For testing real package
  def show
    @package = Package.find(params[:id])
    render :show
  end

  def create
    @package = Package.find_by(package_params)

    if @package
      render json: { package: @package }
    else
      @package = Package.new(package_params)
      @package.generate_pin
      @package.send_pin

      render json: { package: @package }
    end
  end

  def update
    @package = Package.find(params[:id])

    if @package.verify(package_params[:pin])
      @package.send_updates(shippo_status)

      render json: { tracking: shippo_status }
    else
      render json: { error: "Wrong PIN" }
    end

  end

  private

  def package_params
    params.require(:package).permit(
      :tracking_number,
      :phone_number,
      :realtime_updates,
      :pin,
      :user_id,
      :carrier,
      :verified
    )
  end

  def shippo_status
    tracking_number = package_params[:tracking_number]
    carrier = package_params[:carrier]

    url = URI.parse("https://api.goshippo.com/v1/tracks/")
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    response = http.start do |http|
      request = Net::HTTP::Post.new(url.path)
      request["Authorization"] = "ShippoToken shippo_test_8ca225cf58d99ecf339f9e2a9f0dc5bde8eb7dd2"
      request.set_form_data(
        tracking_number: tracking_number,
        carrier: carrier
      )

      http.request(request)
    end

    response.body
  end

end
