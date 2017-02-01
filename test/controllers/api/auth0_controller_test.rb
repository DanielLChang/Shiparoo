require 'test_helper'

class Api::Auth0ControllerTest < ActionDispatch::IntegrationTest
  test "should get callback" do
    get api_auth0_callback_url
    assert_response :success
  end

  test "should get failure" do
    get api_auth0_failure_url
    assert_response :success
  end

end
