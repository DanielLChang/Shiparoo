class Package < ApplicationRecord

  validates :phone_number, presence: true, length: { is: 10 }
  validates :tracking_number, presence: true

end
