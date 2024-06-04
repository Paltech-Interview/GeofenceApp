# Geofence Application

## Setup

1. Clone the repository
2. Run `npm install`
3. Run `npm start` to start the application

## Assumptions

-   Users are familiar with basic map interactions.

## Usage of the application

<li>Click on "Start Creating Geofence" each time to start creating geofences on the map</li>
<li>After clicking "Start Creating Geofence", click different points on map to create geofences </li>
<li>Click on selected geofences to deselect it </li>
<li>Click on "Save Geofence" to save the current geofence</li>
<li>
    Click on a saved geofence to select it. You can select multiple to delete multiple geofences; however, you can only edit 1 geofence at
    the same time
</li>
<li>Click on "Edit Geofence" to edit the selected geofence</li>
<li>During edit mode, if you click on the map, new marker will be added to expand the geofence</li>
<li>During edit mode, if you move the Map Markers, it will change the location of the corner</li>
<li>Click on "Delete Geofence(s)" to delete all the selected geofences</li>
<li>
    <span style={{ color: "red" }}>Red</span> color indicates added geofences, <span style={{ color: "blue" }}>Blue</span> color indicates
    selected geofences, and <span style={{ color: "green" }}>Green</span> color indicates geofences currently being created
</li>

## Answers to Concept Questions

1. **Offline Functionality:**

    - To maintain map functionalities offline, I can use browser's local storage or IndexedDB to cache map tiles and user data.

2. **Preventing Frontend Blocking:**
    - I would use asynchronous operations and loading indicators. I can also implement Web Workers if necessary to handle heavy processing in the background without freezing the UI.
