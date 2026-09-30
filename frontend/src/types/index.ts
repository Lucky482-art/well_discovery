export interface Well {
  well_id: string;
  well_name: string;
  field: string;
  latitude: number;
  longitude: number;
  spud_date?: string;
  total_depth: number;
  status: string;
}

export interface Telemetry {
  timestamp: string;
  measured_depth: number;
  rop: number;
  wob: number;
  rpm: number;
  torque: number;
  hookload: number;
  mud_weight: number;
  standpipe_pressure: number;
  flow_rate: number;
}

export interface Event {
  event_id: number;
  well_id: string;
  timestamp: string;
  depth: number;
  event_type: string;
  severity: 'High' | 'Medium' | 'Low';
  formation?: string;
  cause?: string;
  mitigation?: string;
}

export interface Formation {
  formation_name: string;
  top_depth: number;
  bottom_depth: number;
  lithology: string;
}

export interface Alert {
  id: string;
  timestamp: string;
  well_id: string;
  severity: 'High' | 'Medium' | 'Low';
  alert_type: string;
  description: string;
  action_recommended: string;
}
