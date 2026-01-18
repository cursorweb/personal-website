"use client";
import React, { useEffect, useRef, useState } from "react";

const SIZE = 200;
const SLIDER_HEIGHT = 20;

export default function Colorpicker() {
    const colorCanvasRef = useRef<HTMLCanvasElement>(null);
    const sliderCanvasRef = useRef<HTMLCanvasElement>(null);

    const [hue, setHue] = useState(0);

    const sliderPressed = useRef(false);

    function drawColor(canvas: HTMLCanvasElement, hue: number) {
        const ctx = canvas.getContext("2d")!;

        const imageData = ctx.createImageData(SIZE, SIZE);
        const data = imageData.data;

        for (let y = 0; y < SIZE; y++) {
            for (let x = 0; x < SIZE; x++) {
                const s = x / (SIZE - 1);
                const v = (SIZE - 1 - y) / (SIZE - 1);

                const [r, g, b] = hsvtorgb(hue, s, v);
                const index = (y * SIZE + x) * 4;
                data[index] = r;
                data[index + 1] = g;
                data[index + 2] = b;
                data[index + 3] = 255;
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    function drawSlider(canvas: HTMLCanvasElement, hue: number) {
        const ctx = canvas.getContext("2d")!;

        const gradient = ctx.createLinearGradient(0, 0, SIZE, 0);

        for (let i = 0; i <= 6; i++) {
            const h = (i * 60) % 360;
            gradient.addColorStop(i / 6, `hsl(${h}, 100%, 50%)`);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, SIZE, SLIDER_HEIGHT);

        ctx.strokeStyle = "1px white";
        ctx.strokeRect((hue * SIZE) - 1, 0, 2, SLIDER_HEIGHT);
    }

    function changeHue(e: React.MouseEvent<HTMLCanvasElement>) {
        console.log('called');
        if (!sliderPressed.current) return;
        const xStart = sliderCanvasRef.current!.getBoundingClientRect().x;
        const offset = e.clientX - xStart;
        setHue(offset / SIZE);
    }

    useEffect(() => {
        if (!colorCanvasRef.current) return;
        if (!sliderCanvasRef.current) return;
        drawColor(colorCanvasRef.current, hue);
        drawSlider(sliderCanvasRef.current, hue);
    }, [hue]);

    useEffect(() => {
        function handler() {
            sliderPressed.current = false;
        }
        window.addEventListener("mouseup", handler);
        return () => {
            window.removeEventListener("mouseup", handler);
        }
    }, []);

    return (
        <main>
            <canvas
                ref={colorCanvasRef}
                width={SIZE}
                height={SIZE} />

            <canvas
                ref={sliderCanvasRef}
                onPointerMove={changeHue}
                onMouseDown={() => { console.log('yes'); sliderPressed.current = true }}
                width={SIZE}
                height={SLIDER_HEIGHT} />

            <code>{hue}</code>
        </main>
    );
}

/**
 * Range from [0-1] source https://stackoverflow.com/a/17243070/13759058
 */
function hsvtorgb(h: number, s: number, v: number) {
    let r = 0, g = 0, b = 0;

    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
    ];
}