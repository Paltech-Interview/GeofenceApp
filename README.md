# Geofence Application

## Setup

1. Clone the repository
2. Run `npm install`
3. Run `npm start` to start the application

## Assumptions

-   Users are familiar with basic map interactions.

## Answers to Concept Questions

1. **Offline Functionality:**

    - To maintain map functionalities offline, I can use browser's local storage or IndexedDB to cache map tiles and user data.

2. **Preventing Frontend Blocking:**
    - I would use asynchronous operations and loading indicators. I can also implement Web Workers if necessary to handle heavy processing in the background without freezing the UI.
