// components/Loader.tsx
import React from 'react';

interface LoaderProps {
    message?: string;
    spinnerSize?: number;
    spinnerColor?: string;
    backgroundColor?: string;
}

const Loader: React.FC<LoaderProps> = ({
    message = "Loading...",
    spinnerSize = 64,
    spinnerColor = "border-blue-500",
    backgroundColor = "bg-gray-100 dark:bg-gray-900",
}) => {
    return (
        <div className={`fixed inset-0 flex items-center justify-center ${backgroundColor} z-50`}>
            <div className="flex flex-col items-center">
                {/* Spinner */}
                <div
                    className={`w-${spinnerSize} h-${spinnerSize} border-4 ${spinnerColor} border-dashed rounded-full animate-spin mb-4`}
                    style={{ width: spinnerSize, height: spinnerSize }}
                ></div>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{message}</p>
            </div>
        </div>
    );
};

export default Loader;