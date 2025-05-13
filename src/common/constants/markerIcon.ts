const svgTemplate = (fill: string) => `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="8" fill="${fill}" stroke="white" stroke-width="2" />
</svg>
`;

// NOT using this anymore using pngs as sprites instead

// Define SVGs by network role or status (uniform hex colors)
const svgByStatus: Record<string, string> = {
    'active': svgTemplate('#ff2d55'),            // Legacy 'active', 'remote', 'kiosk' pink-red
    'remote': svgTemplate('#ff2d55'),
    'kiosk': svgTemplate('#ff2d55'),
    'NN assigned': svgTemplate('#ffa6c9'),       // Light pink
    'dead': svgTemplate('#aaaaaa'),              // Gray
    'hub': svgTemplate('#5ac8fa'),               // Light blue
    'omni': svgTemplate('#5ac8fa'),              // Same as hub
    'supernode': svgTemplate('#007aff'),         // Blue
    'sector': svgTemplate('#007aff'),            // Also blue
    'backbone': svgTemplate('#007aff'),          // Also blue
    'linkNYC': svgTemplate('#01a2eb'),           // Sky blue
    'pop': svgTemplate('#f6be00'),               // Yellow
    'ap': svgTemplate('#00ff00'),                // Green
    'sn': svgTemplate('#000000'),                // Black
    'non-hub': svgTemplate('#ff2d55'),           // Same pink-red as active
    'potential': svgTemplate('#777777'),         // Mid-gray
    'potential-hub': svgTemplate('#777777'),
    'potential-supernode': svgTemplate('#777777'),
    'vpn': svgTemplate('#cc99ff'),               // Purple
    'fiber': svgTemplate('#f6be00'),             // Yellow
    'default': svgTemplate('#aaaaaa'),  // fallback gray
};


export function getMarkerSvgByStatus(status: string = ''): string {
    const key = status.toLowerCase();
    return svgByStatus[key] || svgTemplate('#aaa'); // Default gray
}
