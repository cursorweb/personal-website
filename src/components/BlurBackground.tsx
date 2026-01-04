const count = 15;

function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randChoice<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export default function BlurBackground({ colors = ["bg-sky-400/80", "bg-purple-700/80"] }: { colors?: string[] }) {
    const divs = Array.from({ length: count }).map((_, i) => {
        const size = random(300, 500); // random size
        const top = random(-5, 100);
        const left = random(-5, 100);

        const color = randChoice(colors);

        return (
            <div
                className={`absolute opacity-30 rounded-full ${color}`}
                style={{
                    width: size,
                    height: size,
                    top: `${top}%`,
                    left: `${left}%`
                }}
                key={i}
            />
        );
    });

    return <div className="
        absolute
        overflow-hidden
        w-full
        h-full
        -z-10
        blur-[80px]
        top-0
        left-0">
        {divs}
    </div>;
}
