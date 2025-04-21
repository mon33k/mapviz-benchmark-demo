const NodeInfo = () => {
    return (
        <footer className="w-full h-20 bg-white border-t px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-700 shadow-inner">
            <span className="mb-1 sm:mb-0">Selected Node: Node 123</span>
            <span className="text-green-600 font-medium flex items-center gap-2">
                Online <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">✔</span>
            </span>
        </footer>
    );
};

export default NodeInfo;
