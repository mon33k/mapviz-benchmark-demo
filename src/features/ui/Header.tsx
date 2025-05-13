

const Header = () => {
    return (
        <header className="w-full h-16 bg-white flex items-center justify-between px-4 shadow">
            <div className="flex items-center space-x-2">
                <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                    <g><path id="svg_2" d="m60.96.0h5.52c14.98.66 29.71 6.57 40.72 16.79 12.46 11.23 19.94 27.53 20.8 44.24v5.49c-.72 17.12-8.47 33.83-21.34 45.17-10.96 9.96-25.49 15.67-40.24 16.31h-5.7c-14.21-.91-28.19-6.33-38.86-15.85-13.2-11.39-21.2-28.37-21.86-45.77v-5.64c.96-16.62 8.42-32.8 20.82-43.97 10.87-10.1 25.37-15.94 40.14-16.77z" fill="rgb(255,204,0)"></path><path id="svg_4" d="m57.68 23.75c5.46-3.86 14.14-1.11 16.09 5.37 1.16 2.94.4 6.08-.61 8.93 6.62 8.4 13.18 16.85 19.88 25.19-2.31 1.29-4.47 2.85-6.25 4.82-7.04-7.95-13.26-16.63-19.93-24.91-3.83.34-8.16-.05-10.88-3.11-4.62-4.43-3.75-12.91 1.7-16.29z" fill="#010000"></path><path id="svg_5" d="m28.79 70.15c6.65-8.51 13.39-16.95 20.11-25.4 1.85 1.99 4.06 3.6 6.35 5.05-6.66 8.32-13.22 16.72-19.85 25.06 3.06 5.34 1.14 13.13-4.84 15.44-6.49 3.26-15.18-2-15.09-9.3-.63-6.94 6.74-12.54 13.32-10.85z" fill="#010000"></path><path id="svg_8" d="m96.61 70.62c6.16-3.23 14.66 1.33 15.15 8.31.78 4.93-2.49 9.9-7.17 11.42-3.33.71-6.94.45-9.87-1.4-16.28 8.84-36.28 10.13-53.66 3.86 1.54-2.28 2.81-4.74 3.77-7.32 14.78 5.5 31.76 3.91 45.67-3.34-.62-4.66 1.67-9.65 6.11-11.53z" fill="#010000"></path></g> 
                </svg>
                <a href="https://www.nycmesh.net/" className="text-xl font-semibold text-black">NYC Mesh</a>
            </div>
    
            <ul className="flex items-center space-x-4 text-sm font-medium">
                <li><a href="#" className="text-black hover:text-blue-600">Map</a></li>
                <li><a href="#" className="text-black hover:text-blue-600">FAQ</a></li>
                <li><a href="#" className="text-black hover:text-blue-600">Docs/Wiki</a></li>
                <li><a href="#" className="text-black hover:text-blue-600">Blog</a></li>
                <li><a href="#" className="text-black hover:text-blue-600">Merch</a></li>
                <li><a href="#" className="text-green-600 hover:text-green-700">Get Support</a></li>
                <li><a href="#" className="text-black font-semibold hover:text-black">Donate</a></li>
                <li><a href="#" className="text-blue-600 hover:text-blue-800">Get Connected</a></li>
            </ul>
        

        </header>
    );
};

export default Header;
