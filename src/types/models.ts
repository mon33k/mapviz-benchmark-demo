
// ----- OLD NODE STRUCTURE ----
// Structure of each node 
// export interface Node {
//     id: number;: 
//     coordinates: [number, number, number]; // Longitude, Latitude, Elevation
//     requestDate: number;
//     roofAccess: boolean;
//     panoramas: string[];
//     status: string;
//     type: string;
// }

// ---- MESH DB STRUCTURE ----
export interface Node {
    id: string;
    buildings: { id: string }[];
    devices: { id: string }[];
    installs: { id: string; install_number: number }[];
    network_number: number | null;
    name: string | null;
    status: string; // 'Inactive' | 'Active' | 'Planned';
    type: string; // 'Standard' | 'Hub' | 'Supernode' | 'POP' | 'AP' | 'Remote';
    latitude: number;
    longitude: number;
    altitude: number | null;
    install_date: string | null; //ISO date string
    abandon_date: string | null; //ISO date string
    notes: string | null;
}



// ------ OLD LINKS -----
// export interface Link {
//     fromNode: Node;
//     toNode: Node;
//     status: 'vpn' | 'fiber' | 'active';
// }


// --- MESH DB LINKS ----
export interface Link {
    id: string;
    status: string | null; //  'Inactive' | 'Planned' | 'Active';
    type?: string | null;//'5 GHz' | '24 GHz' | '60 GHz' | '70-80 GHz' | 'VPN' | 'Fiber' | 'Ethernet' | null;
    install_date: string | null;//ISO date string
    abandon_date: string | null;//ISO date string
    description: string | null;
    notes: string | null;
    uisp_id: string | null;
    from_device: { id: string };
    to_device: { id: string };
}

export interface Device {
    id: string;
    latitude: number;
    longitude: number;
    altitude: number | null;
    links_from: { id: string }[];
    links_to: { id: string }[];
    name: string | null;
    status: string, // 'Inactive' | 'Active' | 'Potential';
    install_date: string | null;
    abandon_date: string | null;
    notes: string | null;
    uisp_id: string | null;
    node: {
        id: string;
        network_number: number | null;
    };
}

export interface CoordRenderLink extends Link {
    fromDevice: Device;
    toDevice: Device;
    fromNode: Node;
    toNode: Node;
    coordinates: [[number, number], [number, number]];

}

export interface Building {
    id: string;
    installs: {
        id: string;
        install_number: number;
    }[];
    bin: number | null;
    street_address: string | null;
    city: string | null;
    state: string | null;
    zip_code: string | null;
    address_truth_sources: (
        | 'OSMNominatim'
        | 'OSMNominatimZIPOnly'
        | 'NYCPlanningLabs'
        | 'PeliasStringParsing'
        | 'ReverseGeocodeFromCoordinates'
        | 'HumanEntry'
    )[];
    latitude: number;
    longitude: number;
    altitude: number | null;
    notes: string | null;
    panoramas: string[] | null;
    primary_node: {
        id: string;
        network_number: number | null;
    } | null;
    nodes: {
        id: string;
        network_number: number | null;
    }[];
}

export interface Install {
    id: string;
    request_date: string; // ISO date-time string
    install_fee_billing_datum: {
        id: string;
        status: 'ToBeBilled' | 'Billed' | 'NotBillingDuplicate' | 'NotBillingOther';
        billing_date: string | null;
        invoice_number: string | null;
        notes: string | null;
    } | null;
    install_number: number;
    status:
    | 'Request Received'
    | 'Pending'
    | 'Blocked'
    | 'Active'
    | 'Inactive'
    | 'Closed'
    | 'NN Reassigned';
    ticket_number: string | null;
    stripe_subscription_id: string | null;
    install_date: string | null;
    abandon_date: string | null;
    unit: string | null;
    roof_access: boolean;
    referral: string | null;
    notes: string | null;
    diy: boolean | null;
    node: {
        id: string;
        network_number: number | null;
    } | null;
    building: {
        id: string;
    };
    member: {
        id: string;
    };
    additional_members: {
        id: string;
    }[];
}

export interface Sector {
    id: string;
    latitude: number;
    longitude: number;
    altitude: number;
    links_from: { id: string }[];
    links_to: { id: string }[];
    name: string | null;
    status: 'Inactive' | 'Active' | 'Potential';
    install_date: string | null;
    abandon_date: string | null;
    notes: string | null;
    uisp_id: string | null;
    radius: number; // in kilometers
    azimuth: number; // 0–360 degrees
    width: number;   // 0–360 degrees
    node: {
        id: string;
        network_number: number | null;
    };
}

export interface PerformanceMemory {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
}

export interface MemoryCapablePerformance extends Performance {
    memory: PerformanceMemory;
}
