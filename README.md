# react-google-maps-user-location
User location button library for Google maps

<img width="50" alt="user_location_button" src="https://user-images.githubusercontent.com/9527475/226462851-5b965fbc-dd9a-41e7-9604-5e96843af064.png">
<img width="111" alt="user_location" src="https://user-images.githubusercontent.com/9527475/226462890-7d4ecbf0-60a7-408c-833e-d129439ba04b.png">

## Description
Add a user location button to google maps on React.
Click on the button and navigator will ask for location permission to the user. If the user accepts the map will pan and zoom to center the user location.
Button and user location image look like google maps ones.

## Installation
```bash
npm install --save react-google-maps-user-location
```
or:
```bash
yarn add react-google-maps-user-location
```

## Usage
Tested with google-map-react
```jsx static

import GoogleMap from 'google-map-react';
import { UserLocatorButton } from 'react-google-maps-user-location';
...

const mapRef = useRef();
...

<GoogleMap
    bootstrapURLKeys={{ key:YOUR_GOOGLE_MAPS_API_KEY }}
    defaultCenter={DEFAULT_CENTER}
    defaultZoom={DEFAULT_ZOOM}
    yesIWantToUseGoogleMapApiInternals
    onGoogleApiLoaded={({ map, maps }) => {
        mapRef.current = map;
        const controlPosition = document.createElement("div");
        ReactDOM.render(<UserLocatorButton mapRef={mapRef} maps={maps}/>, controlPosition)
        map.controls[maps.ControlPosition.RIGHT_TOP].push(controlPosition)
    }}>
</GoogleMap>
```

## Caveats
### Required React Version
React [16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) or above is required because we use [hooks](https://reactjs.org/docs/hooks-intro.html).

## License
Creative Commons