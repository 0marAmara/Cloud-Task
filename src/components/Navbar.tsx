import { currentPageType } from "../types/types";

interface NavbarProps {
    currentPage: currentPageType;
    setCurrentPage: (destinationPage: currentPageType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
    return (
        <nav className="w-full justify-around flex space-x-4 p-4 bg-gray-800 text-white">
            <button
                onClick={() => setCurrentPage("view")}
                className={`px-4 py-2 rounded ${
                    currentPage === "view" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
                View Groups
            </button>
            <button
                onClick={() => setCurrentPage("add")}
                className={`px-4 py-2 rounded ${
                    currentPage === "add" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
                Add Group
            </button>
        </nav>
    );
};

export default Navbar;