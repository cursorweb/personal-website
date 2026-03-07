"use client";
import React, { useEffect, useRef, useState } from "react";

const SIZE = 200;
const SLIDER_HEIGHT = 20;

export default function Colorpicker() {
    const colorCanvasRef = useRef<HTMLCanvasElement>(null);
    const sliderCanvasRef = useRef<HTMLCanvasElement>(null);

    const [hue, setHue] = useState(0);
    const [sat, setSat] = useState(1);
    const [val, setVal] = useState(1);

    const sliderPressed = useRef(false);
    const colorPressed = useRef(false);

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

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(sat * SIZE, (1 - val) * SIZE, 3, 0, 2 * Math.PI);
        ctx.stroke();
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

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.strokeRect((hue * SIZE) - 2.5, 0, 5, SLIDER_HEIGHT);
    }

    function changeHue(e: React.PointerEvent<HTMLCanvasElement>) {
        if (!sliderPressed.current) return;
        const xStart = sliderCanvasRef.current!.getBoundingClientRect().x;
        const offset = Math.max(Math.min(e.clientX - xStart, SIZE), 0);
        setHue(offset / SIZE);
    }

    function changeSV(e: React.PointerEvent<HTMLCanvasElement>) {
        if (!colorPressed.current) return;
        const rect = colorCanvasRef.current!.getBoundingClientRect();
        const x = Math.max(Math.min(e.clientX - rect.x, SIZE), 0);
        const y = Math.max(Math.min(e.clientY - rect.y, SIZE), 0);
        setSat(x / SIZE);
        setVal(1 - y / SIZE);
    }

    useEffect(() => {
        if (!colorCanvasRef.current) return;
        if (!sliderCanvasRef.current) return;
        drawColor(colorCanvasRef.current, hue);
        drawSlider(sliderCanvasRef.current, hue);
    }, [hue, sat, val]);

    useEffect(() => {
        function handler() {
            sliderPressed.current = false;
            colorPressed.current = false;
        }

        window.addEventListener("pointerup", handler);
        return () => {
            window.removeEventListener("pointerup", handler);
        }
    }, []);

    const [r, g, b] = hsvtorgb(hue, sat, val);
    const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    const l = val * (1 - sat / 2);
    const hslS = l === 0 || l === 1 ? 0 : (val - l) / Math.min(l, 1 - l);
    const css = {
        rgb: `rgb(${r}, ${g}, ${b})`,
        rgbComma: `${r}, ${g}, ${b}`,
        hex,
        hsl: `hsl(${Math.round(hue * 360)}, ${Math.round(hslS * 100)}%, ${Math.round(l * 100)}%)`,
    };

    return (
        <main>
            <div className="flex flex-row justify-center">
                <div style={{
                    backgroundColor: css.rgb,
                    width: SIZE,
                    height: SIZE
                }}></div>
                <div>
                    <canvas
                        ref={colorCanvasRef}
                        onPointerMove={changeSV}
                        onPointerDown={e => {
                            e.currentTarget.setPointerCapture(e.pointerId);
                            colorPressed.current = true;
                            changeSV(e);
                        }}
                        width={SIZE}
                        height={SIZE} />

                    <canvas
                        ref={sliderCanvasRef}
                        onPointerMove={changeHue}
                        onPointerDown={e => {
                            e.currentTarget.setPointerCapture(e.pointerId);
                            sliderPressed.current = true;
                            changeHue(e);
                        }}
                        width={SIZE}
                        height={SLIDER_HEIGHT} />
                </div>
            </div>

            <code>
                <div>{css.rgb}</div>
                <div>{css.rgbComma}</div>
                <div>{css.hex}</div>
                <div>{css.hsl}</div>
            </code>
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