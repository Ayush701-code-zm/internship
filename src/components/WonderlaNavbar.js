"use client"; // Important for Next.js client components that use interactivity

import { useState, useRef, forwardRef } from "react";
import {
  ChevronDown,
  MapPin,
  Tag,
  Ticket,
  Utensils,
  Calendar,
  Zap,
  ChevronRight,
  Menu,
  X,
  Home,
} from "lucide-react";

export default function WonderlaNavbar() {
  const [showLocations, setShowLocations] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const locationNavRef = useRef(null);

  return (
    <div className="px-12 py-6 mx-auto">
      <div className="bg-white w-full rounded-xl px-7 py-4 border shadow-sm relative">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 w-1/4">
            <div className="font-bold text-yellow-500 text-xl flex items-center">
              <span className="text-2xl">WONDERLA</span>
            </div>
            <div className="text-xs text-gray-700">PARKS AND RESORTS</div>
          </div>

          {/* Navigation Items - Centered */}
          <div className="flex items-center justify-center space-x-6 w-1/2">
            <NavItem
              icon={<MapPin size={18} />}
              text="LOCATIONS"
              hasDropdown
              onMouseEnter={() => setShowLocations(true)}
              onMouseLeave={() => setShowLocations(false)}
              isActive={showLocations}
              ref={locationNavRef}
            />
            <NavItem icon={<Tag size={18} />} text="OFFERS" />
            <NavItem icon={<Ticket size={18} />} text="RIDES" />
            <NavItem icon={<Utensils size={18} />} text="RESTAURANTS" />
            <NavItem icon={<Calendar size={18} />} text="EVENTS" />
          </div>

          {/* Book Tickets Button and Menu Button */}
          <div className="w-1/4 flex justify-end items-center space-x-4">
            <button className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-md font-bold flex items-center">
              BOOK TICKETS <Zap className="ml-1" size={16} />
            </button>

            {/* Burger Menu Icon */}
            <button
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
              onClick={() => setShowMenu(!showMenu)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Locations Dropdown */}
        {showLocations && (
          <div
            className="absolute bg-white rounded-3xl shadow-lg z-10 w-64"
            style={{
              left: locationNavRef.current
                ? locationNavRef.current.offsetLeft - 20
                : "20%",
              top: "100%",
            }}
            onMouseEnter={() => setShowLocations(true)}
            onMouseLeave={() => setShowLocations(false)}
          >
            <div className="p-2 overflow-hidden rounded-3xl">
              <div className="grid grid-cols-1">
                <LocationItem name="KOCHI" imageSrc="/api/placeholder/40/40" />
                <LocationItem
                  name="BENGALURU"
                  imageSrc="/api/placeholder/40/40"
                  hasArrow
                />
                <LocationItem
                  name="HYDERABAD"
                  imageSrc="/api/placeholder/40/40"
                />
                <LocationItem
                  name="BHUBANESHWAR"
                  imageSrc="/api/placeholder/40/40"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Menu Sidebar with Overlay */}
      <div
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ease-in-out ${
          showMenu ? "bg-opacity-50 visible" : "bg-opacity-0 invisible"
        }`}
        onClick={() => setShowMenu(false)}
      >
        {/* The menu itself shouldn't close when clicked */}
        <div
          className={`absolute top-0 right-0 h-full bg-white w-96 shadow-lg transition-transform duration-300 ease-in-out transform ${
            showMenu ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <MenuBar onClose={() => setShowMenu(false)} />
        </div>
      </div>
    </div>
  );
}

const NavItem = forwardRef(function NavItem(
  {
    icon,
    text,
    hasDropdown = false,
    onMouseEnter,
    onMouseLeave,
    isActive = false,
  },
  ref
) {
  return (
    <div
      className={`flex items-center cursor-pointer hover:text-gray-900 ${
        isActive ? "text-gray-900" : "text-gray-600"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref}
    >
      <div className={`mr-1 ${isActive ? "text-gray-900" : "text-gray-500"}`}>
        {icon}
      </div>
      <div className="font-medium text-sm">{text}</div>
      {hasDropdown && (
        <ChevronDown
          size={16}
          className={`ml-1 transition-transform ${
            isActive ? "rotate-180" : ""
          }`}
        />
      )}
    </div>
  );
});

function LocationItem({ name, imageSrc, hasArrow = false }) {
  return (
    <div className="flex items-center py-2 px-3 hover:bg-gray-50 cursor-pointer">
      <div className="rounded-md overflow-hidden mr-3">
        <img
          src={imageSrc}
          alt={name}
          className="w-10 h-10 object-cover rounded-md"
        />
      </div>
      <div className="font-medium text-gray-800">{name}</div>
      {hasArrow && <ChevronRight size={16} className="ml-auto text-gray-400" />}
    </div>
  );
}

function MenuBar({ onClose }) {
  const [expandedSection, setExpandedSection] = useState("Parks");

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <>
      {/* Header with close button */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center">
          <img
            src="/api/placeholder/40/40"
            alt="Wonderla Logo"
            className="h-10"
          />
          <div className="ml-2">
            <div className="font-bold text-yellow-500 text-lg">WONDERLA</div>
            <div className="text-xs text-gray-700">PARKS AND RESORTS</div>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      {/* Menu Content */}
      <div className="py-4 h-full overflow-y-auto">
        {/* Parks Section */}
        <MenuSection
          title="Parks"
          subtitle="Explore Your favourite Wonderla Park"
          icon={<Home className="text-blue-600" size={20} />}
          isExpanded={expandedSection === "Parks"}
          onClick={() => toggleSection("Parks")}
        >
          <div className="grid grid-cols-2 gap-4 p-4">
            <ParkItem name="Kochi" imageSrc="/api/placeholder/60/60" />
            <ParkItem name="Bengaluru" imageSrc="/api/placeholder/60/60" />
            <ParkItem name="Hyderabad" imageSrc="/api/placeholder/60/60" />
            <ParkItem name="Bhubaneshwar" imageSrc="/api/placeholder/60/60" />
          </div>
        </MenuSection>

        {/* Resorts Section */}
        <MenuSection
          title="Resorts"
          subtitle="Get a rejuvenating experience at Wonderla Resort"
          icon={<Home className="text-blue-600" size={20} />}
          isExpanded={expandedSection === "Resorts"}
          onClick={() => toggleSection("Resorts")}
        />

        {/* Offers Section */}
        <MenuSection
          title="Offers & Combos"
          subtitle="Plan the perfect day with exciting offers"
          icon={<Tag className="text-blue-600" size={20} />}
          isExpanded={expandedSection === "Offers"}
          onClick={() => toggleSection("Offers")}
        />

        {/* Timings Section */}
        <MenuSection
          title="Timings And Guidelines"
          subtitle="Know the timings and other guidelines"
          icon={<Calendar className="text-blue-600" size={20} />}
          isExpanded={expandedSection === "Timings"}
          onClick={() => toggleSection("Timings")}
        />

        {/* Action Buttons */}
        <div className="px-4 py-2 mt-4 space-y-4">
          <ActionButton
            text="Group Booking"
            subtext="Reach Out To Wonderla Team"
            color="bg-yellow-400"
          />
          <ActionButton
            text="Tour Operator Portal"
            subtext="Reach Out To Wonderla Team"
            color="bg-blue-500"
            textColor="text-white"
          />
          <ActionButton
            text="Partner With Us"
            subtext="Reach Out To Wonderla Team"
            color="bg-yellow-400"
          />
        </div>
      </div>
    </>
  );
}

function MenuSection({ title, subtitle, icon, isExpanded, onClick, children }) {
  return (
    <div className="border-b border-gray-100">
      <div className="flex items-center p-4 cursor-pointer" onClick={onClick}>
        <div className="mr-3">{icon}</div>
        <div className="flex-1">
          <div className="font-medium text-gray-900">{title}</div>
          <div className="text-xs text-gray-600">{subtitle}</div>
        </div>
        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function ParkItem({ name, imageSrc }) {
  return (
    <div className="flex flex-col items-center bg-white rounded-lg p-3">
      <img
        src={imageSrc}
        alt={name}
        className="w-16 h-16 rounded-full object-cover mb-2"
      />
      <div className="text-sm font-medium text-center">{name}</div>
    </div>
  );
}

function ActionButton({ text, subtext, color, textColor = "text-blue-900" }) {
  return (
    <div
      className={`${color} rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex items-center">
        <div className="mr-3">
          <img src="/api/placeholder/24/24" alt="" className="w-6 h-6" />
        </div>
        <div>
          <div className={`font-bold ${textColor}`}>{text}</div>
          <div className={`text-xs ${textColor} opacity-80`}>{subtext}</div>
        </div>
      </div>
    </div>
  );
}
