import React from 'react';

const Marker = (options) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      const image = 
        new window.google.maps.MarkerImage(
        options.icon,
        null,
        null,
        null,
        new window.google.maps.Size(40,60)
        )
      

      const marker = new window.google.maps.Marker({
        icon: image
      });
      marker.addListener("click", (map) => {
        console.log("CLICK")
        options?.onMarkerClick();

      })
      setMarker(marker);
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

export default Marker;