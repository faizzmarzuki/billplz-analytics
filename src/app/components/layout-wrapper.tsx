import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col">
                <Header />
                {children}
            </div>
        </div>
    );
}