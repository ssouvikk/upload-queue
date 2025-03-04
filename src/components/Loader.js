// components/Loader.js
const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-gray-700">Loading...</p>
        </div>
    );
};

export default Loader;