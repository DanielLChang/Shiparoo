# Shiparoo

Shiparoo live link here later.

Shiparoo is a Rails/React web application and React Native mobile application to make tracking your shipments simple. All you need to do is enter the tracking number of your shipment, a valid phone number, and you'll be able to receive the status of your shipment and when it has arrived!

You will also have the option to receive real time SMS updates on your shipment.

## Wireframe
![home_page: ./images/Shiparoo.png][homepage]
[homepage]: ./images/Shiparoo.png "Shiparoo home page"

## Feature and Implementation

### Functionality and MVP
[ ] Enter in a tracking number and receive text updates

[ ] View key tracking destinations for a package on a maps

[ ] See list of tracked packages as user

### Packages
Packages will be stored in a table containing the package `id`, `tracking_number`, `phone_number`, and option for `realtime_updates`.

As default `realtime_updates` will be set to false.

## Technology
### Shippo
[Shippo's Tracking API][shippo] will be used to provide data about the specific shipment.
[shippo]: https://goshippo.com/tracking-api/

### Twilio
[Twilio's SMS API][twilio] will be used to send SMS updates about the shipment to the phone number provided.
[twilio]: https://www.twilio.com/sms

### Google Maps API
[Google Maps API][maps] will provide the shipment's history as markers on a map.
[maps]: https://developers.google.com/maps/

### Auth0
[Auth0][auth] will be used for user authentication.
[auth]:https://auth0.com/

## Implementation Timeline
### Day 1: Setup rails backend to have packages model/controller
* Create packages controller, package model, set up package.json and webpack (Daniel)
* Look into auth0 for authentication (Justin)
* Research shippo and google maps APIs (Calvin)

### Day 2: Get familiar with API's
* Create Twilio client for backend to send SMS messages (Daniel)
* Install auth0 (Justin)
* Successfully retrieve information of shipments from shippo api (Calvin)

### Day 3: Setup webpage
* Create sign up for updates components (Daniel)
* Research React Native (Justin)
* Create package journey component including Google Maps (Calvin)

### Day 4: React Native
* Add styling to components created
* Have clean and bug free navigation throughout pages; test
* Create demo account with multiple past tracked packages 
* Begin porting over app to React Native

### Day 5: Finish up React Native
* Continue working on mobile app
* Create README with screenshots
