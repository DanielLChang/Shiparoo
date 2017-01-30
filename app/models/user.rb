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
  has_secure_password
  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true

  def self.from_token_request(request)
    username = request.params["auth"] && request.params["auth"]["username"]
    self.find_by(username: username)
  end
end
