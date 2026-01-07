import { Nav } from "@/components/Nav";
import { HeroPage } from "./home/HeroPage";
import { Overview } from "./home/Overview";

export default function Main() {
    return (
        <>
            <Nav />
            <HeroPage />
            <Overview />
        </>
    );
}
