import React from "react";
import {
  User,
  MapPin,
  Clock,
  Languages,
  Star,
  ChevronRight,
  Heart,
} from "lucide-react";

const getAttendantIcon = (jobRole: string, gender?: string): string => {
  const lowerCaseJobRole = jobRole.toLowerCase();
  const lowerCaseGender = gender?.toLowerCase();

  if (lowerCaseJobRole.includes("nurse")) {
    return lowerCaseGender === "female"
      ? "/uploads/nurse_female.png"
      : "/uploads/nurse_male.png";
  } else if (lowerCaseJobRole.includes("attendant")) {
    return lowerCaseGender === "female"
      ? "/uploads/attendant_female.png"
      : "/uploads/attendant_male.png";
  }
  // Default icon if jobRole doesn't match or is not provided
  return "/place.png";
};

interface Attendant {
  fullName: string;
  jobRole: string;
  experienceYears: number | string; // Allow both number and string for flexibility
  languagesKnown: string[];
  location: string;
  preferredShifts: string[];
  extraServicesOffered: string[];
  rating?: number;
  gender?: string;
  expectedWages?: {};
  onViewProfile: () => void;
}

const AttendantCard: React.FC<{ attendant: Attendant }> = ({ attendant }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row w-full hover:shadow-xl transition-all duration-200 border border-gray-100 hover:border-teal-200 cursor-pointer"
      onClick={attendant.onViewProfile}
    >
      {/* Top Row - Mobile Layout */}
      <div className="flex sm:hidden items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={getAttendantIcon(attendant.jobRole, attendant.gender)}
              alt={attendant.fullName}
              className="w-16 h-16 rounded-lg object-cover border-2 border-teal-100"
            />
            <button
              className="absolute -top-1 -right-1 p-1 rounded-full bg-white shadow-sm hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                // Handle favorite action
              }}
            >
              <Heart size={14} className="text-gray-400 hover:text-red-500" />
            </button>
          </div>
          <div>
            <div className="text-base font-bold text-gray-800">
              {attendant.fullName}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <User size={12} className="text-teal-600" />
              <p className="text-xs text-gray-600">
                {attendant.gender} • {attendant.experienceYears}+ yrs
              </p>
            </div>
          </div>
        </div>
        {attendant.rating && (
          <div className="flex items-center bg-amber-50 px-2 py-0.5 rounded-full">
            <Star size={12} className="text-amber-500 fill-amber-500" />
            <span className="ml-1 text-xs font-medium text-amber-700">
              {attendant.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Left Column - Profile Image (Desktop) */}
      <div className="hidden sm:block flex-shrink-0 mr-4 sm:mr-6 relative">
        <div className="relative">
          <img
            src={getAttendantIcon(attendant.jobRole, attendant.gender)}
            alt={attendant.fullName}
            width={128}
            height={128}
            className="w-20 h-20 sm:w-32 sm:h-32 rounded-lg sm:rounded-xl object-contain border-2 sm:border-4 border-teal-100"
          />
        </div>
        <div className="absolute top-2 right-2">
          <button
            className="p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              // Handle favorite action
            }}
          >
            <Heart size={16} className="text-gray-400 hover:text-red-500" />
          </button>
        </div>
      </div>

      {/* Middle Column - Details */}
      <div className="flex-grow">
        {/* Desktop Header */}
        <div className="hidden sm:flex justify-between items-start">
          <div>
            <div className="text-base sm:text-base font-bold text-gray-800">
              {attendant.fullName}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <User size={14} className="text-teal-600" />
              <p className="text-sm sm:text-sm text-gray-600">
                {attendant.gender?.toUpperCase()} • {attendant.experienceYears}+ yrs
              </p>
              {attendant.rating && (
                <div className="flex items-center ml-2 bg-amber-50 px-2 py-0.5 rounded-full">
                  <Star size={12} className="text-amber-500 fill-amber-500" />
                  <span className="ml-1 text-xs font-medium text-amber-700">
                    {attendant.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-3 text-sm sm:text-base text-gray-700">
          <MapPin size={14} className="text-teal-600 flex-shrink-0" />
          <p className="truncate">{attendant.location}</p>
        </div>

        <div className="mt-3 sm:mt-4">
          <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
            Services offered:
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {attendant.extraServicesOffered
              .slice(0, 3)
              .map((service, index) => (
                <span
                  key={index}
                  className="text-[10px] sm:text-xs bg-amber-50 text-amber-700 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full"
                >
                  {service}
                </span>
              ))}
            {attendant.extraServicesOffered.length > 3 && (
              <span className="text-[10px] sm:text-xs bg-gray-50 text-gray-500 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                +{attendant.extraServicesOffered.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Mobile Bottom Row */}
        <div className="sm:hidden flex justify-between items-center mt-4">
          <div>
            <div className="text-xs text-gray-500">Starting from</div>
            <div className="text-base font-bold text-teal-900">₹1000</div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              attendant.onViewProfile();
            }}
            className="text-teal-600 hover:text-teal-800 flex items-center text-sm font-medium"
          >
            View <ChevronRight size={14} className="ml-0.5" />
          </button>
        </div>
      </div>

      {/* Right Column - Quick Info (Desktop) */}
      <div className="hidden sm:flex flex-shrink-0 ml-4 sm:ml-6 flex-col justify-between w-40">
        <div>
          <div className="text-xs sm:text-sm text-gray-500">Starting from</div>
          <div className="text-lg sm:text-xl font-bold text-teal-900">
            ₹1000
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
            <Languages size={12} className="flex-shrink-0" />
            <span>Languages</span>
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {attendant.languagesKnown.slice(0, 2).map((lang, index) => (
              <span
                key={index}
                className="text-[10px] sm:text-xs bg-teal-50 text-teal-700 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            attendant.onViewProfile();
          }}
          className="mt-2 sm:mt-4 text-teal-600 hover:text-teal-800 flex items-center justify-end text-sm font-medium"
        >
          View <ChevronRight size={14} className="ml-0.5" />
        </button>
      </div>
    </div>
  );
};

export default AttendantCard;
