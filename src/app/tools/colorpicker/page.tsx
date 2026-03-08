"use client";
import React, { useEffect, useRef, useState } from "react";
import { ColorInput } from "./ColorInput";
import { hsvtorgb, parseCSSColor, rgbtohsv, hsvtocss } from "./colorutil";

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

    const rgbInputRef = useRef<HTMLInputElement>(null);
    const rgbCommaInputRef = useRef<HTMLInputElement>(null);
    const hexInputRef = useRef<HTMLInputElement>(null);
    const hslInputRef = useRef<HTMLInputElement>(null);

    function drawColor(canvas: HTMLCanvasElement, hue: number) {
        const ctx = canvas.getContext("2d")!;
        const { width, height } = canvas;

        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const s = x / (width - 1);
                const v = (height - 1 - y) / (height - 1);

                const [r, g, b] = hsvtorgb(hue, s, v);
                const index = (y * width + x) * 4;
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
        ctx.arc(sat * (width - 1), (1 - val) * (height - 1), 3, 0, 2 * Math.PI);
        ctx.stroke();
    }

    function drawSlider(canvas: HTMLCanvasElement, hue: number) {
        const ctx = canvas.getContext("2d")!;
        const { width, height } = canvas;

        const gradient = ctx.createLinearGradient(0, 0, width, 0);

        for (let i = 0; i <= 6; i++) {
            const h = (i * 60) % 360;
            gradient.addColorStop(i / 6, `hsl(${h}, 100%, 50%)`);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.strokeRect((hue * width) - 2.5, 0, 5, height);
    }

    function changeHue(e: React.PointerEvent<HTMLCanvasElement>) {
        if (!sliderPressed.current) return;
        const rect = sliderCanvasRef.current!.getBoundingClientRect();
        const offset = Math.max(Math.min(e.clientX - rect.x, rect.width), 0);
        setHue(offset / rect.width);
    }

    function changeSV(e: React.PointerEvent<HTMLCanvasElement>) {
        if (!colorPressed.current) return;
        const rect = colorCanvasRef.current!.getBoundingClientRect();
        const x = Math.max(Math.min(e.clientX - rect.x, rect.width), 0);
        const y = Math.max(Math.min(e.clientY - rect.y, rect.height), 0);
        setSat(x / rect.width);
        setVal(1 - y / rect.height);
    }

    function colorInputChange(value: string, target: HTMLInputElement, originalVal: string) {
        const parsed = parseCSSColor(value);
        if (!parsed) {
            target.value = originalVal;
            return;
        }

        const [h, s, v] = rgbtohsv(...parsed);

        setHue(h);
        setSat(s);
        setVal(v);
    }

    // pointer handlers
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

    const css = hsvtocss(hue, sat, val);

    // when the user picks a color
    useEffect(() => {
        if (!colorCanvasRef.current || !sliderCanvasRef.current) return;
        drawColor(colorCanvasRef.current, hue);
        drawSlider(sliderCanvasRef.current, hue);

        // uncontrolled input, so we have to manually set it
        // this is a performance gain at tradeoff of manual input management
        if (rgbInputRef.current) rgbInputRef.current.value = css.rgb;
        if (rgbCommaInputRef.current) rgbCommaInputRef.current.value = css.rgbComma;
        if (hexInputRef.current) hexInputRef.current.value = css.hex;
        if (hslInputRef.current) hslInputRef.current.value = css.hsl;
    }, [hue, sat, val]);

    return (
        <main>
            <div className="flex flex-row justify-center">
                <div className="p-3 border border-black/30 rounded-xl bg-white/50 dark:bg-black/40">
                    <div className="flex flex-row mb-2">
                        <div
                            style={{ backgroundColor: css.rgb }}
                            className="flex-1 self-stretch"
                        ></div>

                        <canvas
                            ref={colorCanvasRef}
                            onPointerMove={changeSV}
                            onPointerDown={e => {
                                e.currentTarget.setPointerCapture(e.pointerId);
                                colorPressed.current = true;
                                changeSV(e);
                            }}
                            height={SIZE}
                            className="flex-2" />
                    </div>

                    <canvas
                        ref={sliderCanvasRef}
                        onPointerMove={changeHue}
                        onPointerDown={e => {
                            e.currentTarget.setPointerCapture(e.pointerId);
                            sliderPressed.current = true;
                            changeHue(e);
                        }}
                        width={SIZE * 2}
                        height={SLIDER_HEIGHT} />
                </div>
            </div>

            <div className="flex justify-center mt-1">
                <div className="inline-grid grid-cols-2">
                    <ColorInput ref={rgbInputRef} defaultValue={css.rgb} onChange={(v, t) => colorInputChange(v, t, css.rgb)} color={css.rgb} />
                    <ColorInput ref={rgbCommaInputRef} defaultValue={css.rgbComma} onChange={(v, t) => colorInputChange(`rgb(${v})`, t, css.rgbComma)} color={css.rgb} />
                    <ColorInput ref={hexInputRef} defaultValue={css.hex} onChange={(v, t) => colorInputChange(v, t, css.hex)} color={css.rgb} />
                    <ColorInput ref={hslInputRef} defaultValue={css.hsl} onChange={(v, t) => colorInputChange(v, t, css.hsl)} color={css.rgb} />
                </div>
            </div>
        </main>
    );
}
