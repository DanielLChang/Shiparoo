json.list_packages @packages.each do |package|
  json.id package.id
  json.tracking_number package.tracking_number
  json.phone_number package.phone_number
  json.realtime_updates package.realtime_updates
  json.final_update package.final_update
  json.pin package.pin
  json.created_at package.created_at
  json.updated_at package.updated_at
end
