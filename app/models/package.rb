require 'twilio-ruby'

class Package < ApplicationRecord

  validates :phone_number, presence: true, length: { is: 10 }
  validates :tracking_number, presence: true
  validates :pin, presence: true, length: { is: 4 }

  def generate_pin
    self.pin = rand(0..9999).to_s.rjust(4, "0")
    self.save
  end

  def send_pin
    TwilioClient.instance.send_pin(self.phone_number, self.pin)
  end

end
