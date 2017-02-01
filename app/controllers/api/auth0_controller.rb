class Api::Auth0Controller < ApplicationController
  def callback
    # This stores all the user information that came from Auth0
    # and the IdP
    session[:userinfo] = request.env['omniauth.auth']

    # Redirect to the URL you want after successful auth
    render 'api/users/show'
   end

   def failure
    # show a failure page or redirect to an error page
    render(
      json: ['Invalid username/password combination'],
      status: 401
    )
   end
 end
