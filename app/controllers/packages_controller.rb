class PackagesController < ApplicationController

  # For testing
  def new
    @package = Package.new
  end

  # For testing
  def index
    tracking_number = params[:tracking_number]
    carrier = params[:carrier]

    url = URI.parse("https://api.goshippo.com/v1/tracks/usps/9400110898680009697924")
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    res = http.start do |http|
      req = Net::HTTP::Get.new(url.path)
      http.request(req)
    end

    render json: res.body
    # @packages = Package.all
    # render 'packages/index.json.jbuilder'
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
      render 'packages/show.json.jbuilder'
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

    url = "https://api.goshippo.com/v1/tracks/#{carrier}/#{tracking_number}/"
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    res = http.start do |http|
      req = Net::HTTP::Get.new(url.path)
      http.request(req)
    end

    render json: res.body
  end

end
