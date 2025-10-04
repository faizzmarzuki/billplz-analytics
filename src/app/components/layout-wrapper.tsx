import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-screen">
            <Sidebar />
            <div className="flex flex-col w-full">
                <Header />
                {children}
            </div>
        </div>
    );
}