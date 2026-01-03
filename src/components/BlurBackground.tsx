const count = 10;

function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randChoice<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export default function BlurBackground() {
    const divs = Array.from({ length: count }).map((_, i) => {
        const size = random(300, 500); // random size
        const top = random(-5, 100);
        const left = random(-5, 100);

        const color = randChoice(["bg-sky-400", "bg-purple-700"]);

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
        shadow-[inset_0_0_36px_rgba(0,0,0,0.5)]
        blur-[80px]
        top-0
        left-0">
        {divs}
    </div>;
}
