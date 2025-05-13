import { useEffect, useState } from 'react';
import { MemoryCapablePerformance } from '../../types/models';

// using this https://nodejs.org/docs/latest-v22.x/api/perf_hooks.html#perf_hooksperformance

export function usePerformanceTracker() {
    const [fps, setFps] = useState(0);
    const [renderTime, setRenderTime] = useState(0);
    const [memory, setMemory] = useState(0);
    const [cpuUsage, setCpuUsage] = useState(0);
    const [latency, setLatency] = useState(0);
    const [frameDrops, setFrameDrops] = useState(0);
    const [interactionDelay, setInteractionDelay] = useState(0);

    useEffect(() => {
        const start = performance.now();
        let lastFrame = start;
        let drops = 0;

        const loop = () => {
            const now = performance.now();
            const frameTime = now - lastFrame;
            lastFrame = now;

            if (frameTime > 50) drops++;

            setFps(Math.min(60, Math.round(1000 / frameTime)));
            setCpuUsage(Math.round((frameTime / 16.67) * 100)); // ideal frame: 16.67ms @ 60fps
            setRenderTime(now - start);
            setFrameDrops(drops);

            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);

        const latencyTimer = setInterval(() => {
            const t0 = performance.now();
            setTimeout(() => {
                const l = performance.now() - t0;
                setLatency(l);
            }, 0);
        }, 1000);

        const interactionTimer = setInterval(() => {
            const t1 = performance.now();
            requestIdleCallback(() => {
                const delay = performance.now() - t1;
                setInteractionDelay(delay);
            });
        }, 1000);

        const memoryTimer =
            'memory' in performance
                ? setInterval(() => {
                    const used = (performance as MemoryCapablePerformance).memory.usedJSHeapSize;
                    setMemory(used / 1_000_000);
                }, 1000)
                : null;

        return () => {
            clearInterval(latencyTimer);
            clearInterval(interactionTimer);
            if (memoryTimer) clearInterval(memoryTimer);
        };
    }, []);

    return {
        fps,
        renderTime,
        memory: memory.toFixed(1),
        cpuUsage,
        latency,
        frameDrops,
        interactionDelay
    };
}
