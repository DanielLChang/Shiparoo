# == Schema Information
#
# Table name: packages
#
#  id               :integer          not null, primary key
#  tracking_number  :string           not null
#  phone_number     :string           not null
#  realtime_updates :boolean          default("false"), not null
#  final_update     :boolean          default("true"), not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  pin              :string           not null
#

# require_relative 'twilio_client'

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

  def send_initial_message
    TwilioClient.instance.send_initial_message(
      self.phone_number,
      self.tracking_number
    )
  end

  def send_updates(status)
    TwilioClient.instance.send_message_update(
      self.phone_number,
      self.tracking_number,
      status
    )
  end

end
