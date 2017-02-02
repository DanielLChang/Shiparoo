Rails.application.config.middleware.use OmniAuth::Builder do
  provider(
    :auth0,
    'HQyc8BbQc47Drpa85hJca6t6THDNOAXg',
    'L_du5GCbk0PWD5uWwGE5s8-GkLLuPG7Rdeqh2zjsehIpd_JfdJnbKQu3xKKPq47V',
    'justinsuen.auth0.com',
    callback_path: "/auth/oauth2/callback"
  )
end
