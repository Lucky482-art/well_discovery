import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export function useWells() {
  const [wells, setWells] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/wells`)
      .then(res => {
        setWells(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch wells:", err);
        setLoading(false);
      });
  }, []);

  return { wells, loading };
}

export function useNearbyWells(lat: number, lon: number, radiusKm: number) {
  const [nearbyWells, setNearbyWells] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/nearby-wells`, { params: { lat, lon, radius_km: radiusKm } })
      .then(res => {
        setNearbyWells(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch nearby wells:", err);
        setLoading(false);
      });
  }, [lat, lon, radiusKm]);

  return { nearbyWells, loading };
}

export function useTelemetry(wellId: string) {
  const [telemetry, setTelemetry] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!wellId) return;
    axios.get(`${API_BASE_URL}/wells/${wellId}/telemetry`)
      .then(res => {
        setTelemetry(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch telemetry:", err);
        setLoading(false);
      });
  }, [wellId]);

  return { telemetry, loading };
}
