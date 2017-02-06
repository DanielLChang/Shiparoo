json.array! @packages do |package|
  json.extract! package, :id, :tracking_number, :phone_number, :realtime_updates,
    :final_update, :created_at, :pin, :user_id, :carrier
end
