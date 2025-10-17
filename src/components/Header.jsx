import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const profileRef = useRef(null);

    // Banner images array - you can add more images here
    const bannerImages = [
        { src: "b1.jpg", alt: "Banner 1" },
        { src: "b2.jpg", alt: "Banner 2" },
        { src: "b3.jpg", alt: "Banner 3" },
        { src: "b4.jpg", alt: "Banner 4" },
        { src: "b5.jpg", alt: "Banner 5" },
        { src: "b6.jpg", alt: "Banner 6" },
        { src: "b7.jpg", alt: "Banner 7" },
        { src: "b8.jpg", alt: "Banner 8" },
        { src: "b9.jpg", alt: "Banner 9" },
        { src: "b10.jpg", alt: "Banner 10" },
        { src: "b11.jpg", alt: "Banner 11" },
        { src: "b12.jpg", alt: "Banner 12" }
    ];

    // Banner navigation functions
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
    };

    // Auto-slide functionality
    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
        return () => clearInterval(slideInterval);
    }, []);

    const toggleMenu = (e) => {
        e.stopPropagation(); // Prevent closing when clicking the button
        setIsOpen(!isOpen);
    };

    const toggleProfileDropdown = (e) => {
        e.stopPropagation();
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    const closeMenu = (e) => {
        if (!e.target.closest('#sidebar') && !e.target.closest('#menu-button')) {
            setIsOpen(false);
        }
    };

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full" onClick={closeMenu}>
            <nav className="absolute top-0 left-0 w-full bg-transparent z-10 mt-2">
                <div className=" flex flex-wrap items-center justify-between mx-auto px-3">
                    <a href="https://www.hayleysfentons.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    </a>

                    {/* Search Bar */}

                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <div className="relative" ref={profileRef}>
                            <button
                                type="button"
                                onClick={toggleProfileDropdown}
                                className="md:flex hidden items-center text-sm bg-[#ecedef7a] shadow-lg rounded-full md:me-0 focus:ring-2 focus:ring-[#ffffff65]"
                                id="user-menu-button"
                                aria-expanded={profileDropdownOpen}
                            >
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 rounded-full object-cover" src="sithara.jpeg" alt="user photo" />
                            </button>

                            {/* Profile Dropdown menu */}
                            {profileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg z-50">
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900">Sithara Pramodini</span>
                                        <span className="block text-sm text-gray-500 truncate">sithara@fentons.com</span>
                                    </div>
                                    <ul className="py-2" aria-labelledby="user-menu-button">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My account</a>
                                        </li>
                                        <li>
                                            <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <button data-collapse-toggle="navbar-user" id="menu-button" onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white font-bold rounded-lg md:hidden hover:bg-[#e784477e] focus:outline-none ">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>

                    <div className="hidden md:flex items-center max-w-[25%] flex-grow px-4 ml-auto">
                        <label htmlFor="voice-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <input type="text" id="voice-search" className="bg-[#f9fafbb2] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-orange-100 focus:border-orange-100 block w-full ps-10 p-[0.4rem]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="What are you looking for ..." required />
                        </div>
                    </div>

                </div>
            </nav>

            <div className={`fixed z-10 top-0 left-0 h-full w-60 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`} id="sidebar">
                <ul className="p-6 space-y-4">
                    <li><img className='w-28 mx-auto' src='logo.png' /></li>
                    <li><button type="button" className="flex mx-auto items-center text-sm bg-[#ecedef7a] shadow-lg rounded-full md:me-0 focus:ring-4 focus:ring-gray-300" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <p className='px-4 font-semibold'>Sithara Pramodini</p>
                        <img className="w-8 h-8 rounded-full" src="emp.jpg" alt="user photo" />
                    </button></li>
                    <li><a href="#" className="block py-2 text-gray-700 hover:text-orange-500">Home</a></li>
                    <li className="relative group">
                        <a href="#" className="block py-2 text-gray-700 hover:text-orange-500">Services</a>
                        <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 transform scale-95 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100">
                            <li><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Sub Service 1</a></li>
                            <li><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Sub Service 2</a></li>
                            <li><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Sub Service 3</a></li>
                        </ul>
                    </li>

                </ul>
            </div>

            {/* Static + Sliding Banner Layout with Layered Design */}
            <div className="relative w-full min-h-[134px] overflow-hidden">
                {/* Sliding Background Section (Back Layer) */}
                <div className="absolute inset-0 w-full overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out h-full"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {bannerImages.map((banner, index) => (
                            <img
                                key={index}
                                src={banner.src}
                                className="w-full h-full object-cover flex-shrink-0 min-h-[134px]"
                                alt={banner.alt}
                            />
                        ))}
                    </div>

                    {/* Navigation Dots */}
                    {/* <div className="absolute bottom-4 right-1/4 transform translate-x-1/2 flex space-x-2 z-20">
                        {bannerImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    currentSlide === index 
                                        ? 'bg-white scale-110' 
                                        : 'bg-white/50 hover:bg-white/75'
                                }`}
                            />
                        ))}
                    </div> */}
                </div>

                {/* Static Top Layer with Angled Cut */}
                <div
                    className="relative z-10 w-1/3 bg-[#ffffff] border-b-4 border-[#f05424] flex items-center justify-center h-full min-h-[134px] overflow-hidden"
                    style={{
                        clipPath: 'polygon(0 0, 70% 0, 100% 100%, 0 100%)'
                    }}
                >
                    <div className="relative">
                        <img src="logo.webp" className="max-w-[200px] ml-[-6rem] h-auto" alt="Hayleys Fentons Logo" />

                        {/* Shining effect specifically on the logo */}
                        <div
                            className="absolute top-0 left-0 w-[15rem] h-full overflow-hidden"
                            style={{
                                transform: 'translateX(-6rem)' // Match the logo's ml-[-6rem]
                            }}
                        >
                            <div
                                className="shine-sweep absolute top-0 left-0 w-full h-full"
                                style={{
                                    background: 'linear-gradient(120deg, transparent 20%, rgba(255, 255, 255, 0.9) 50%, transparent 80%)',
                                    transform: 'translateX(-100%)',
                                    animation: 'logoShine 2.5s ease-in-out infinite 1.5s',
                                    mixBlendMode: 'overlay'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;