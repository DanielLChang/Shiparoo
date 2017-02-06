#Shiparoo

It's always tough waiting for a package. It's even tougher not knowing when it will arrive. With Shiparoo, users can find out where their package is at all times. By inputting a phone number along with their tracking number, users can easily receive realtime updates on the status of their packages from delivery to arrival. Never lose track of another package again!

Shiparoo is the web version of [Shiparoo-iOS][shiparoo-ios].
[shiparoo-ios]:[https://github.com/justinsuen/shiparoo-ios]

Shiparoo and Shiparoo-iOS are personal projects by Calvin Yau, Daniel Chang, and Justin Suen.

## Features

#### Enter in a phone number and receive text updates for your package until it is delivered
![home][home]
[home]: ./docs/images/home.png

![text][text]
[text]: ./docs/images/text.png

#### Enter in a tracking number and see tracking history
![details][details]
[details]: ./docs/images/package_details.png

#### View tracking history on a Google Map
![map][map]
[map]: ./docs/images/map.png

#### Receive a PIN when signing up for text updates for verification
![pin_modal][pin_modal]
[pin_modal]: ./docs/images/pin_modal.png

#### Can log in as a user
![logged_in][logged_in]
[logged_in]: ./docs/images/home_logged_in.png

![user][user]
[user]: ./docs/images/user_modal.png

## Architecture & Technology

### Backend
The project is built on Ruby on Rails with PostgreSQL.

### Frontend
- React with Redux

- Shippo API
  - Request data passed to Shippo API by POSTing JSON objects with the appropriate key/value-pairs to the corresponding resource.
  - Response data returns JSON object with details on specific package including current status and status history.

- Twilio API
  - PIN factor authentication to verify users and their package.
  - Sends realtime updates every time the status on their package is changed.
  - Updates stop once package has status of `DELIVERED`.

- Auth0
  - Allows signing up with Facebook or Google accounts, or personal emails

- Google Maps API
  - Visualize package shipping routes

## Original Design

Our initial ideas and wireframe designs can be found here.
[Docs] (./docs)
