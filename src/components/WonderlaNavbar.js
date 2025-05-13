"use client"; // Important for Next.js client components that use interactivity

import {
  ChevronDown,
  MapPin,
  Tag,
  Ticket,
  Utensils,
  Calendar,
  Zap,
} from "lucide-react";

export default function WonderlaNavbar() {
  return (
    <div className="bg-white w-full px-4 py-3 border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="font-bold text-yellow-500 text-xl flex items-center">
            <span className="text-2xl">WONDERLA</span>
          </div>
          <div className="text-xs text-gray-700">PARKS AND RESORTS</div>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-6">
          <NavItem icon={<MapPin size={18} />} text="LOCATIONS" hasDropdown />
          <NavItem icon={<Tag size={18} />} text="OFFERS" />
          <NavItem icon={<Ticket size={18} />} text="RIDES" />
          <NavItem icon={<Utensils size={18} />} text="RESTAURANTS" />
          <NavItem icon={<Calendar size={18} />} text="EVENTS" />

          <button className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-md font-bold flex items-center">
            BOOK TICKETS <Zap className="ml-1" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, text, hasDropdown = false }) {
  return (
    <div className="flex items-center cursor-pointer text-gray-600 hover:text-gray-900">
      <div className="mr-1 text-gray-500">{icon}</div>
      <div className="font-medium text-sm">{text}</div>
      {hasDropdown && <ChevronDown size={16} className="ml-1" />}
    </div>
  );
}
