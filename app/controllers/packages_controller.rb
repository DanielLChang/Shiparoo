class PackagesController < ApplicationController

  # For testing
  # def new
  #   @package = Package.new
  # end
  #

  # For testing fake package
  def index
    url = URI.parse("https://api.goshippo.com/v1/tracks/usps/9270190164917304202250")
    Net::HTTP.start(url.host, url.port, use_ssl: true) do |http|
      request = Net::HTTP::Get.new(url.path)
      response = http.request(request)
      render json: response.body
    end
  end

  # For testing real package
  def show
    url = URI.parse("https://api.goshippo.com/v1/tracks/usps/9205590164917310542443")
    Net::HTTP.start(url.host, url.port, use_ssl: true) do |http|
      request = Net::HTTP::Get.new(url.path)
      response = http.request(request)
      render json: response.body
    end
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
      @package.send_updates(shippo_status)

      render json: { tracking: shippo_status }
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
      :pin,
      :carrier
    )
  end

  def shippo_status
    tracking_number = params[:tracking_number]
    carrier = params[:carrier]

    url = URI.parse("https://api.goshippo.com/v1/tracks/#{carrier}/#{tracking_number}")
    Net::HTTP.start(url.host, url.port, use_ssl: true) do |http|
      request = Net::HTTP::Get.new(url.path)
      response = http.request(request)
      render json: response.body
    end
  end

end
