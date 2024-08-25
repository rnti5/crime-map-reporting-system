import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet.heat";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";

const HeatmapLayer = ({ map, showHeatmap, showTooltip }) => {
  const heatLayerRef = useRef(null);
  const markersLayerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const heatmapPoints = [];
      const markers = [];
      const querySnapshot = await getDocs(collection(db, "Reported Cases"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.incidentLocation) {
          const point = [
            data.incidentLocation.latitude,
            data.incidentLocation.longitude,
            1, // intensity of the point
          ];
          heatmapPoints.push(point);

          if (showTooltip) {
            markers.push(
              L.marker([
                data.incidentLocation.latitude,
                data.incidentLocation.longitude,
              ]).bindTooltip(`Incident: ${data.incident}`, {
                permanent: false,
                direction: "top",
              })
            );
          }
        }
      });

      if (heatLayerRef.current) {
        heatLayerRef.current.setLatLngs(heatmapPoints); // Update existing heatmap points
      } else {
        heatLayerRef.current = L.heatLayer(heatmapPoints, {
          radius: 10, // adjust the radius of influence for each point
          blur: 5, // adjust the blur for smoother heatmap appearance
          maxZoom: 12,
        }).addTo(map); // Add the heatmap layer to the map
      }

      // Add markers with tooltips if needed
      if (showTooltip && map) {
        markersLayerRef.current = L.layerGroup(markers).addTo(map);
      }
    };

    if (map && showHeatmap) {
      fetchData();
    } else if (map && heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
      heatLayerRef.current = null; // Reset the reference
    }

    // Cleanup on unmount
    return () => {
      if (map && heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current);
      }
      if (map && markersLayerRef.current) {
        map.removeLayer(markersLayerRef.current);
        markersLayerRef.current = null;
      }
    };
  }, [map, showHeatmap, showTooltip]);

  return null; // This component doesn't render anything directly
};

export default HeatmapLayer;
