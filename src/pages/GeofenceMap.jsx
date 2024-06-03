import { useState } from "react";
import { MapContainer, TileLayer, Polygon, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const GeofenceMap = () => {
    const [geofences, setGeofences] = useState([]);
    const [currentGeofence, setCurrentGeofence] = useState([]);

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                setCurrentGeofence([...currentGeofence, [e.latlng.lat, e.latlng.lng]]);
            },
        });
        return null;
    };

    const handleSaveGeofence = () => {
        setGeofences([...geofences, currentGeofence]);
        setCurrentGeofence([]);
    };

    const handleClickGeofence = (e) => {
        // hover the geofence
        console.log(e.target.getLatLngs()[0]);
        setCurrentGeofence(e.target.getLatLngs()[0]);
    };

    const handleEditGeofence = () => {
        // edit the geofence
    };

    return (
        <div>
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "80vh", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {geofences.map((geofence, index) => (
                    <Polygon key={index} positions={geofence} onClick={handleClickGeofence} />
                ))}
                <Polygon positions={currentGeofence} />
                <MapEvents />
            </MapContainer>
            <button onClick={handleSaveGeofence}>Save Geofence</button>
            <button onClick={handleEditGeofence}>Edit Geofence</button>
        </div>
    );
};

export default GeofenceMap;
