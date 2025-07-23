export default function Menu() {

    return (
        <div className="fixed inset-0 bg-white z-50 pt-20 px-4 overflow-y-auto">
            <nav className="flex flex-col space-y-4 py-4">
                <a href="#" className="py-2 text-lg hover:text-blue-500">
                    Home
                </a>
                <a href="#" className="py-2 text-lg hover:text-blue-500">
                    Features
                </a>
                <a href="#" className="py-2 text-lg hover:text-blue-500">
                    About
                </a>
            </nav>
        </div>
    );
}