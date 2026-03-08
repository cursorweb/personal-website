/**
 * Range from [0-1] source https://stackoverflow.com/a/17243070/13759058
 */
export function hsvtorgb(h: number, s: number, v: number): [number, number, number] {
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

/**
 * rgb [0-255]
 */
export function rgbtohsv(r: number, g: number, b: number): [number, number, number] {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const d = max - min;

    let h = 0;
    const s = max == 0 ? 0 : d / max;
    const v = max;

    if (max != min) {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, v];
}

export function hsvtohsl(h: number, s: number, v: number): [number, number, number] {
    const l = v * (1 - s / 2);
    const hslS = l == 0 || l == 1 ? 0 : (v - l) / Math.min(l, 1 - l);
    return [h, hslS, l];
}

/**
 * Return user-friendly formatted color codes
 */
export function hsvtocss(h: number, s: number, v: number) {
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
export function parseCSSColor(input: string): [number, number, number] | null {
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
