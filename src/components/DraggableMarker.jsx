import { Marker } from "react-leaflet";
import { useState, useMemo, useRef } from "react";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

const center = {
    lat: 51.505,
    lng: -0.09,
};

function DraggableMarker({ index, position, setPosition = () => {}, draggable = true, directClick = null }) {
    const [_draggable, setDraggable] = useState(draggable);
    const [pos, setPos] = useState(position ?? center);

    const markerRef = useRef(null);

    const eventHandlers = useMemo(
        () => ({
            click(event) {
                if (event.originalEvent) {
                    event.originalEvent.stopPropagation();
                }
                directClick && (directClick.current = false);
            },
            dragstart(event) {
                if (event.originalEvent) {
                    directClick && (directClick.current = false);
                    event.originalEvent.stopPropagation();
                }
            },
            dragend(event) {
                directClick && (directClick.current = true);
                const marker = markerRef.current;
                if (marker != null) {
                    setPos(marker.getLatLng());
                    setPosition((oldPositions) => {
                        const newPositions = [...oldPositions];
                        newPositions[index] = marker.getLatLng();
                        return newPositions;
                    });
                }
            },
        }),
        [setPosition, index, directClick]
    );

    return (
        <Marker
            eventHandlers={eventHandlers}
            draggable={_draggable}
            position={pos}
            ref={markerRef}
            icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}></Marker>
    );
}

export default DraggableMarker;
