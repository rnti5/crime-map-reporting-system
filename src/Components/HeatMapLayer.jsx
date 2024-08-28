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
      try {
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

        // Update or create heatmap layer
        if (heatLayerRef.current) {
          heatLayerRef.current.setLatLngs(heatmapPoints);
        } else {
          heatLayerRef.current = L.heatLayer(heatmapPoints, {
            radius: 10,
            blur: 5,
            maxZoom: 12,
          }).addTo(map);
        }

        // Update or create markers layer
        if (markersLayerRef.current) {
          markersLayerRef.current.clearLayers();
          markersLayerRef.current.addLayers(markers);
        } else if (showTooltip && map) {
          markersLayerRef.current = L.layerGroup(markers).addTo(map);
        }
      } catch (error) {
        console.error("Error fetching data for heatmap:", error);
      }
    };

    if (map && showHeatmap) {
      fetchData();
    } else if (map && heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
      heatLayerRef.current = null;
    }

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

  return null;
};

export default HeatmapLayer;
