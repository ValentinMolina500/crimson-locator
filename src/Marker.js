import React from 'react';

const Marker = (options) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      // const image = {
      //   url: options.icon,
      //   size: new window.google.maps.Size(22, 40),
      //   scaledSize: new window.google.maps.Size(22, 40),
      //   anchor: new window.google.maps.Point(0, 50)
      // }

      const markerImage = new window.google.maps.MarkerImage(
        options.icon,
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new window.google.maps.Size(24, 24)
      );

      const marker = new window.google.maps.Marker({
        icon: markerImage
      })
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