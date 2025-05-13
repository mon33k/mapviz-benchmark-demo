import { usePerformanceTracker } from './usePerformanceTracker';

const getBrowser = () => {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome') && !ua.includes('Edg') && !ua.includes('OPR')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('OPR') || ua.includes('Opera')) return 'Opera';
    return 'Unknown';
};

const BenchmarkTable = () => {
    const {
        fps,
        renderTime,
        memory,
        cpuUsage,
        latency,
        frameDrops,
        interactionDelay
    } = usePerformanceTracker();

    const browser = getBrowser();

    return (
        <footer style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            background: '#fff',
            borderTop: '1px solid #ccc',
            fontSize: '12px',
            zIndex: 1000,
            padding: '4px 8px',
            overflowX: 'auto',
            boxShadow: '0 -1px 3px rgba(0,0,0,0.1)'
        }}>
            <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {[
                            'Method', 'Browser', 'FPS', 'Render', 'Latency', 'Memory',
                            'CPU', 'Drops', 'Delay', 'Score'
                        ].map((h, i) => (
                            <th key={i} style={{
                                borderBottom: '1px solid #ddd',
                                padding: '2px 6px',
                                width: '80px',
                                textAlign: 'left'
                            }}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>MapLibre</td>
                        <td>{browser}</td>
                        <td>{fps.toFixed(0)}</td>
                        <td>{renderTime.toFixed(1)}ms</td>
                        <td>{latency.toFixed(1)}ms</td>
                        <td>{memory} MB</td>
                        <td>{cpuUsage.toFixed(0)}%</td>
                        <td>{frameDrops}</td>
                        <td>{interactionDelay.toFixed(1)}ms</td>
                        <td style={{ fontWeight: 'bold' }}>
                            {fps > 50 ? 'Fast' : fps > 30 ? 'Okay' : 'Slow'}
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>Deck GL</td>
                        <td>TBA</td>
                        <td>TBA</td>
                        <td>TBA ms</td>
                        <td>TBA ms</td>
                        <td>TBA MB</td>
                        <td>TBA %</td>
                        <td>TBA</td>
                        <td>TBA ms</td>
                        <td style={{ fontWeight: 'bold' }}>
                            TBA
                        </td>
                    </tr>
                </tbody>
            </table>
        </footer>
    );
};

export default BenchmarkTable;
