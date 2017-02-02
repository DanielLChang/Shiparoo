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
    # url = URI.parse("https://api.goshippo.com/v1/tracks/usps/9205590164917310542443")
    # Net::HTTP.start(url.host, url.port, use_ssl: true) do |http|
    #   request = Net::HTTP::Get.new(url.path)
    #   response = http.request(request)
    #   render json: response.body
    # end
    @package = Package.find(params[:id])
    render :show
  end

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

    if @package.verify(package_params[:pin])
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
      :user_id,
      :carrier
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
