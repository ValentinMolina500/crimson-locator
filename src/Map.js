import React from 'react';

import DRAWING from "./EEME1.png";
const Map = ({ style, center, zoom, children }) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      const gMap = new window.google.maps.Map(ref.current, {});

      const bounds = new window.google.maps.LatLngBounds
      (
        new window.google.maps.LatLng(46.73008, -117.16980),

        new window.google.maps.LatLng(46.73084, -117.16870),
      );

      let image = DRAWING;

      class FloorPlanOverlay extends window.google.maps.OverlayView {
        bounds;
        image;
        div;
        constructor(bounds, image) {
          super();

          this.bounds = bounds;
          this.image = image;
        }

        onAdd() {
              this.div = document.createElement("div");
          this.div.style.borderStyle = "none";
          this.div.style.borderWidth = "0px";
          this.div.style.position = "absolute";

          // Create the img element and attach it to the div.
          const img = document.createElement("img");

          img.src = this.image;
          img.style.width = "100%";
          img.style.height = "100%";
          img.style.position = "absolute";
          img.style.transform = "rotate(94deg)"
          this.div.appendChild(img);

          // Add the element to the "overlayLayer" pane.
          const panes = this.getPanes();

          panes.overlayLayer.appendChild(this.div);
        }

        draw() {
          // We use the south-west and north-east
          // coordinates of the overlay to peg it to the correct position and size.
          // To do this, we need to retrieve the projection from the overlay.
          const overlayProjection = this.getProjection();
          // Retrieve the south-west and north-east coordinates of this overlay
          // in LatLngs and convert them to pixel coordinates.
          // We'll use these coordinates to resize the div.
          const sw = overlayProjection.fromLatLngToDivPixel(
            this.bounds.getSouthWest()
          );
          const ne = overlayProjection.fromLatLngToDivPixel(
            this.bounds.getNorthEast()
          );
    
          // Resize the image's div to fit the indicated dimensions.
          if (this.div) {
            this.div.style.left = sw.x + "px";
            this.div.style.top = ne.y + "px";
            this.div.style.width = ne.x - sw.x + "px";
            this.div.style.height = sw.y - ne.y + "px";
          }
        }
        /**
         * The onRemove() method will be called automatically from the API if
         * we ever set the overlay's map property to 'null'.
         */
        onRemove() {
          if (this.div) {
            this.div.parentNode.removeChild(this.div);
            delete this.div;
          }
        }
      }

      const overlay = new FloorPlanOverlay(bounds, image);

      overlay.setMap(gMap);

      setMap(gMap);

    }
  }, [ref, map]);

React.useEffect(() => {
  if (map) {
    map.setOptions({
      center,
      zoom
    });
  }
}, [map, center, zoom])

  return (
    <>
    <div ref={ref} style={style} />
    {
      React.Children.map(children, (child) => {
        return React.cloneElement(child, { map });
      })
    }
  </>
  )
 
};

export default Map;