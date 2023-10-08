type StatusType =
  | "ACTIVE"
  | "INACTIVE"
  | "AWAY"
  | "AVAILABLE"
  | "BUSY"
  | "OFFLINE"
  | "ONLINE"
  | "ON_HOLD"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "PENDING"
  | "PAUSED"
  | "UNDECIDED"
  | "IN_PROCESS"
  | "UNDER_REVIEW"
  | "CANCELED"
  | "BLOCKED"
  | "RELEASED"
  | "UNDER_MAINTENANCE";

type AddressComponentsType = {
  short_name: string;
  long_name: string;
  postcode_localities: string[];
  types: string[];
};

type GeometryType = {
  location: LatLng;
  location_type: GeocoderLocationType;
  viewport: LatLngBounds;
  bounds: LatLngBounds;
};

type GeocoderResultType = {
  types: string[];
  formatted_address: string;
  address_components: AddressComponentsType[];
  partial_match: boolean;
  place_id: string;
  postcode_localities: string[];
  geometry: GeometryType;
};

type GeocoderResponse = {
  results: GeocoderResultType[];
  status: string;
  plus_code: {
    compound_code: string;
  };
};

type PaymentMethodType = "credit_card" | "reference";

type PaymentMethod = {
  name: string;
  type: PaymentMethodType;
  description?: string;
  onPress?(): void;
};
