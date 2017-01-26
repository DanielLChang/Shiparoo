# Shiparoo

Shiparoo live link here later.

Shiparoo is a web application to make tracking your shipments simple. All you need to do is enter the tracking number of your shipment, a valid phone number, and you'll be able to receive the status of your shipment and when it has arrived!

You will also have the option to receive real time SMS updates on your shipment.

## Feature and Implementation
### Packages
Packages will be stored in a table containing the package `id`, `tracking_number`, `phone_number`, and option for `realtime_updates`.

As default `realtime_updates` will be set to false.

##Technology
###Shippo
[Shippo's Tracking API][shippo] will be used to provide data about the specific shipment.
[shippo]: https://goshippo.com/tracking-api/

###Twilio
[Twilio's SMS API][twilio] will be used to send SMS updates about the shipment to the phone number provided.
[twilio]: https://www.twilio.com/sms

##Future Implementation
### Google Maps API
* [Google Maps API][maps] will provide the shipment's history as markers on a map.
[maps]: https://developers.google.com/maps/

###Mobile
* [React Native][native] will be used to port Shiparoo onto mobile platforms, making the application more accessible.
[native]: https://facebook.github.io/react-native/
