# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string
#  email_verified  :boolean
#  name            :string
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: :true
  validates :email, email: true, allow_blank: true, uniqueness: { case_sensitive: false }

  def self.from_token_payload(payload)
    # Returns a valid user, `nil` or raise
    # e.g.
    #   self.find payload["sub"]
  end
end
