import { Loading } from "@/components/ui/loading";

export default function GlobalLoading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-50">
            <Loading className="scale-150" />
        </div>
    );
}
