import ToolBar from "./ToolBar/ToolBar.tsx";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <>
            <header>
                <ToolBar/>
            </header>
            <main className="container mt-5">
                {children}
            </main>
        </>
    );
};

export default Layout;