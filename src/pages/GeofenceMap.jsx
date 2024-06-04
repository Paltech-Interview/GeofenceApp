import { useRef, useState } from "react";
import { MapContainer, TileLayer, Polygon, useMapEvents } from "react-leaflet";
import DraggableMarker from "../components/DraggableMarker";
import "leaflet/dist/leaflet.css";
import "./GeofenceMap.css";

const GeofenceMap = () => {
    const [geofences, setGeofences] = useState([]);
    const [selectedGeofences, setSelectedGeofences] = useState([]);
    const [selectedGeofenceIndexes, setSelectedGeofenceIndexes] = useState([]);
    const [currentGeofence, setCurrentGeofence] = useState([]);
    const [isCreatingGeofence, setIsCreatingGeofence] = useState(false);
    const [isEditingGeofence, setIsEditingGeofence] = useState(false);
    const directClick = useRef(true);

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                isCreatingGeofence && directClick && setCurrentGeofence([...currentGeofence, [e.latlng.lat, e.latlng.lng]]);
            },
        });
        return null;
    };

    const handleSaveGeofence = () => {
        if (currentGeofence.length > 0) {
            setGeofences((geofences) => [...geofences, currentGeofence]);
            setCurrentGeofence([]);
            setSelectedGeofences([]);
            setSelectedGeofenceIndexes([]);
            isEditingGeofence && setIsEditingGeofence(false);
            isCreatingGeofence && setIsCreatingGeofence(false);
        }
    };

    const handlePolygonClick = (index) => {
        if (selectedGeofences.includes(geofences[index])) {
            setSelectedGeofenceIndexes((oldIndexes) => oldIndexes.filter((oldIndex) => oldIndex !== index));
            setSelectedGeofences((selectedGeofences) => selectedGeofences.filter((geofence) => geofence !== geofences[index]));
        } else {
            setSelectedGeofenceIndexes((oldIndexes) => [...oldIndexes, index]);
            setSelectedGeofences((selectedGeofences) => [...selectedGeofences, geofences[index]]);
        }
    };

    const startCreatingGeofence = () => {
        setIsCreatingGeofence(true);
    };

    const handleEditGeofence = () => {
        if (isEditingGeofence || selectedGeofences.length !== 1) {
            setIsEditingGeofence(false);
            return;
        }
        setIsEditingGeofence(true);
        setIsCreatingGeofence(true);
        setCurrentGeofence(selectedGeofences[0]);
        setSelectedGeofenceIndexes([]);
        setGeofences((oldGeofences) => oldGeofences.filter((_, index) => !selectedGeofenceIndexes.includes(index)));
    };

    const handleDeleteGeofences = () => {
        if (selectedGeofences.length === 0) return;
        setGeofences((oldGeofences) => oldGeofences.filter((_, index) => !selectedGeofenceIndexes.includes(index)));
        setSelectedGeofences([]);
        setSelectedGeofenceIndexes([]);
    };

    return (
        <div>
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "70vh", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {geofences.map((geofence, index) => (
                    <Polygon
                        key={index}
                        positions={geofence}
                        pathOptions={{
                            color: selectedGeofenceIndexes.includes(index) ? "blue" : "red",
                        }}
                        eventHandlers={{
                            click: (e) => {
                                console.log("Clicked on geofence", index);
                                !isCreatingGeofence && handlePolygonClick(index);
                            },
                        }}
                    />
                ))}
                {currentGeofence.map((corner, index) => (
                    <DraggableMarker key={index} index={index} position={corner} setPosition={setCurrentGeofence} directClick={directClick} />
                ))}
                {(isCreatingGeofence || isEditingGeofence) && <Polygon positions={currentGeofence} pathOptions={{ color: "green" }} />}
                <MapEvents />
            </MapContainer>
            <div style={{ marginBlock: "2vh", marginInline: "2vw" }}>
                {!isCreatingGeofence && !isEditingGeofence && (
                    <button style={StyleSheet.button} onClick={startCreatingGeofence}>
                        Start Marking Geofence
                    </button>
                )}
                {(isCreatingGeofence || isEditingGeofence) && (
                    <button style={StyleSheet.saveButton} onClick={handleSaveGeofence}>
                        Save Geofence
                    </button>
                )}
                {selectedGeofences.length === 1 && !isEditingGeofence && (
                    <button style={StyleSheet.button} onClick={handleEditGeofence}>
                        Edit Geofence
                    </button>
                )}
                {!isCreatingGeofence && selectedGeofences.length > 0 && (
                    <button style={StyleSheet.deleteButton} onClick={handleDeleteGeofences}>
                        Delete Geofence(s)
                    </button>
                )}
            </div>
            <div style={{ marginBlock: "2vh", marginInline: "2vw" }}>
                <p>Notes on usage: </p>
                <ul>
                    <li>Click on "Start Marking Geofence" each time to start creating geofences on the map</li>
                    <li>After clicking "Start Marking Geofence", click different points on map to create geofences </li>
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
                </ul>
            </div>
        </div>
    );
};

const StyleSheet = {
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#008CBA",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginInline: "10px",
    },
    deleteButton: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#ff0000",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginInline: "10px",
    },
    saveButton: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginInline: "10px",
    },
};

export default GeofenceMap;
