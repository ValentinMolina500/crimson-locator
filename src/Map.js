import React from 'react';

const Map = ({ style, center, zoom }) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
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

  return <div ref={ref} style={style} />
};

export default Map;