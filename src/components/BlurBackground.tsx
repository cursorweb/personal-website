import clsx from "clsx";

const count = 15;

function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randChoice<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const MIN_SIZE = 300;
const MAX_SIZE = 500;

export default function BlurBackground({ colors = ["bg-sky-400/80", "bg-purple-700/80"] }: { colors?: string[] }) {
    const divs = Array.from({ length: count }).map((_, i) => {
        const size = random(MIN_SIZE, MAX_SIZE); // random size
        const top = random(-5, 100);
        const left = random(-5, 100);

        const color = randChoice(colors);

        return (
            <div
                className={`absolute opacity-30 rounded-full ${color}`}
                style={{
                    minWidth: `${(size * (MIN_SIZE / MAX_SIZE))}px`,
                    minHeight: `${(size * (MIN_SIZE / MAX_SIZE))}px`,
                    width: `${(size / MAX_SIZE) * 35}vw`,
                    height: `${(size / MAX_SIZE) * 35}vw`,
                    top: `${top}%`,
                    left: `${left}%`
                }}
                key={i}
            />
        );
    });

    return <div className={clsx(
        "absolute",
        "overflow-hidden",
        "w-full h-full",
        "-z-10",
        "blur-[80px]",
        "top-0 left-0",
    )}>
        {divs}
    </div>;
}
