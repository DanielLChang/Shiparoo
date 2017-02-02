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
end
