class TwilioClient

  account_sid = 'AC2ad34a3aeaf594ac796421e8ea122e76'
  auth_token = 'bf7641e3b269e3e45728967a856df2a7'
  @twilio_number = '+16506514507'

  # From twilio docs
  @client = Twilio::REST::Client.new(account_sid, auth_token)

  def send_pin(phone_number, pin)
    @client.messages.create(
      from: @twilio_number,
      to: phone_number,
      body: "Your Shippo PIN is #{pin}."
    )
  end

  def send_initial_message(phone_number, tracking_number, tracking_status)
    @client.messages.create(
      from: @twilio_number,
      to: phone_number,
      body: "Your #{tracking_number} is currently #{tracking_status}."
    )
  end

  def send_message_update(phone_number, tracking_number, tracking_status)
    @client.messages.create(
      from: @twilio_number,
      to: phone_number,
      body: "Your #{tracking_number} is currently #{tracking_status}."
    )
  end

end
