"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineContentCopy, MdCheck } from "react-icons/md";

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

/**
 * DefaultValue: On mount, this is the initial value (it won't be read again)
 */
function ColorInput({ ref, defaultValue, onChange, color }: {
    ref: React.RefObject<HTMLInputElement | null>;
    defaultValue: string;
    onChange: (value: string, target: HTMLInputElement) => void;
    color: string;
}) {
    const [copied, setCopied] = useState(false);

    function copy() {
        navigator.clipboard.writeText(ref.current?.value ?? "");
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    }

    return (
        <div className="relative m-1">
            <input
                ref={ref}
                defaultValue={defaultValue}
                onBlur={e => onChange(e.target.value, e.target)}
                onKeyDown={e => e.key == "Enter" && onChange(e.currentTarget.value, e.currentTarget)}
                className="w-full p-2 dark:bg-black/40 bg-white/30 border border-black/15 rounded-lg pr-8 outline-0 focus:ring-2 font-mono"
                style={{ "--tw-ring-color": color } as React.CSSProperties}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
            />
            <button
                onClick={copy}
                className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2"
            >{copied ? <MdCheck /> : <MdOutlineContentCopy />}</button>
        </div>
    );
}


/**
 * Range from [0-1] source https://stackoverflow.com/a/17243070/13759058
 */
function hsvtorgb(h: number, s: number, v: number): [number, number, number] {
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

function rgbtohsv(r: number, g: number, b: number): [number, number, number] {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    const s = max == 0 ? 0 : d / max;
    const v = max;
    if (max !== min) {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, v];
}

function hsvtohsl(h: number, s: number, v: number): [number, number, number] {
    const l = v * (1 - s / 2);
    const hslS = l == 0 || l == 1 ? 0 : (v - l) / Math.min(l, 1 - l);
    return [h, hslS, l];
}

function hsvtocss(h: number, s: number, v: number) {
    const [r, g, b] = hsvtorgb(h, s, v);
    const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    const [hslH, hslS, hslL] = hsvtohsl(h, s, v);
    return {
        rgb: `rgb(${r}, ${g}, ${b})`,
        rgbComma: `${r}, ${g}, ${b}`,
        hex,
        hsl: `hsl(${Math.round(hslH * 360)}, ${Math.round(hslS * 100)}%, ${Math.round(hslL * 100)}%)`,
    };
}

/**
 * Parses any valid CSS color string and returns [r, g, b] in 0-255 range.
 */
function parseCSSColor(input: string): [number, number, number] | null {
    const ctx = document.createElement("canvas").getContext("2d")!;

    // Two sentinels in case it is exactly the color
    for (const sentinel of ["#fe9ac8", "#12d45e"]) {
        ctx.fillStyle = sentinel;
        ctx.fillStyle = input;

        // ctx.fillStyle won't do anything if it wasn't a valid value
        if (ctx.fillStyle != sentinel) {
            const normalized = ctx.fillStyle;

            // might be hex value
            if (normalized.startsWith("#") && normalized.length == 7) {
                return [
                    parseInt(normalized.slice(1, 3), 16),
                    parseInt(normalized.slice(3, 5), 16),
                    parseInt(normalized.slice(5, 7), 16),
                ];
            }

            // might be rgb value
            const m = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(normalized);
            if (m) return [Number(m[1]), Number(m[2]), Number(m[3])];

            return null;
        }
    }

    return null;
}
