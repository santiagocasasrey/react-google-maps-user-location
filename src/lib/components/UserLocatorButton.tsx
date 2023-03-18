import React, {useRef, useEffect} from 'react';
import "./UserLocatorButton.css"

interface UserLocatorButtonProps
{
    mapRef: React.RefObject<google.maps.Map>; //map reference
}

const UserLocatorButton = ({mapRef} :UserLocatorButtonProps) => {
    const marker = useRef<google.maps.Marker>();   
    const accuracyCircle = useRef<google.maps.Circle>();   
    useEffect(() => {
      getUserLocation(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    } ,[])

    const blueDot = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "#4285F4",
        fillOpacity: 1,
        scale: 8,
        strokeColor: "rgb(255,255,255)",
        strokeWeight: 2,
      };

      const handleGeolocationError = (error:any) =>{
        if (error.code === 1) { // permissionDenied
            marker.current?.setMap(null);
            accuracyCircle.current?.setMap(null);
        } else if (error.code === 2) { // positionUnavailable
            console.log('positionUnavailable');
        } else if (error.code === 3) {  // timeout
          console.log('timeout');         
        }
      };
      
    const getUserLocation = (panToUser:boolean = true) => { 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              if (panToUser)
              {
                mapRef.current?.panTo(userLocation); 
                if (mapRef.current?.getZoom() ?? 0 < 14)
                {
                    mapRef.current?.setZoom(14);
                }
              }
             
                if (marker.current) {         
                    marker.current.setMap(null); 
                }
                marker.current = new google.maps.Marker({ 
                    icon: blueDot,
                    position: userLocation,
                });
                marker.current.setMap(mapRef.current);

                const errorRange = position.coords.accuracy;
                if (accuracyCircle.current) {
                  accuracyCircle.current.setMap(null);
                }
                accuracyCircle.current = new google.maps.Circle({
                  center: userLocation,
                  fillColor: "#61a0bf",
                  fillOpacity: 0.4,
                  radius: errorRange,
                  strokeColor: "#1bb6ff",
                  strokeOpacity: 0.4,
                  strokeWeight: 1,
                  zIndex: 1,
                });
                accuracyCircle.current.setMap(mapRef.current)
            }, 
            error => {handleGeolocationError(error)}, 
              {maximumAge: 5000}
            );
          } else {
            // code for legacy browsers
          }
      };
      return (
        <div className="center-on-me" onClick={() => getUserLocation}>
            <div className="gmapcontainer">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 48" className="locatemelogo"><path d="M0 0h48v48h-48z" fill="none"></path><path d="M24 16c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm17.88 6c-.92-8.34-7.54-14.96-15.88-15.88v-4.12h-4v4.12c-8.34.92-14.96 7.54-15.88 15.88h-4.12v4h4.12c.92 8.34 7.54 14.96 15.88 15.88v4.12h4v-4.12c8.34-.92 14.96-7.54 15.88-15.88h4.12v-4h-4.12zm-17.88 16c-7.73 0-14-6.27-14-14s6.27-14 14-14 14 6.27 14 14-6.27 14-14 14z"></path>
                </svg>
            </div>
        </div>
      );
}
export default UserLocatorButton;