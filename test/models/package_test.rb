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

require 'test_helper'

class PackageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
