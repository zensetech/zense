import React from "react";
import Link from "next/link";
import { User, Heart, Users, Calendar, Cross, Ambulance } from "lucide-react";

interface ProviderCardProps {
  id: string;
  logoUrl: string;
  businessName: string; // Changed from businessName
  address: string; // Changed from businessAddress
  phone: string; // Changed from contactNumbers
  experience: string; // Changed from yearsInBusiness
  yearsInBusiness: number;
  customersServed: string;
  attendantsAvailable: string;
  nursesAvailable: string;
  semiNursesAvailable: string;
  servicesOffered: string[];
  serviceCities: string[];
}

const ProvCard: React.FC<ProviderCardProps> = ({
  id,
  businessName,
  yearsInBusiness,
  attendantsAvailable,
  nursesAvailable,
  semiNursesAvailable,
  customersServed,
  servicesOffered,
  serviceCities,
  logoUrl,
}) => {
  return (
    <div className="bg-white shadow-2xl rounded-lg p-6 max-w-sm mb-8">
      {" "}
      {/* Changed max-w-lg to max-w-sm */}
      {/* Header Section */}
      <div className="flex items-center space-x-4">
        <img
          src={logoUrl || "/uploads/icon.png"}
          alt={`${businessName} logo`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold">{businessName}</h2>
          <div className="flex items-center space-x-2">
            <Calendar className="text-gray-500" />
            <p className="text-sm text-gray-500">
              {yearsInBusiness} years in business
            </p>
          </div>
        </div>
      </div>
      {/* Info Tiles */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <InfoTile
          label={attendantsAvailable}
          icon={<User className="text-teal-500" />}
          title="Attendants"
        />
        <InfoTile
          label={nursesAvailable}
          icon={<Heart className="text-teal-500" />}
          title="Nurses"
        />
        <InfoTile
          label={semiNursesAvailable}
          icon={<Cross className="text-teal-500" />}
          title="Semi-Nurses"
        />
        <InfoTile
          label={customersServed}
          icon={<Users className="text-teal-500" />}
          title="Customers Served"
        />
      </div>
      {/* Cities Served */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Cities Served</h3>
        <div className="flex flex-wrap gap-4">
          {serviceCities.slice(0, 2).map((city, index) => (
            <div
              key={index}
              className="bg-teal-100 text-teal-700 px-6 py-2 rounded-full text-sm font-semibold"
            >
              {city}
            </div>
          ))}
          {serviceCities.length > 2 && (
            <div className="text-teal-700 py-2 text-sm font-semibold">
              +{serviceCities.length - 2} more
            </div>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-4 mt-6">
        <button className="bg-teal-700 text-white py-2 px-4 rounded-sm w-full">
          <Link href={"/provider/" + id}>View Details</Link>
        </button>
        <button className="bg-black text-white py-2 px-4 rounded-sm w-full">
          <Link
            href={
              "https://wa.me/+919220249040?text=Hi I'm looking for at home elder care services and I would like to know more about " +
              businessName
            }
          >
            Enquire Now
          </Link>
        </button>
      </div>
    </div>
  );
};

// Info Tile Component
const InfoTile: React.FC<{
  label: string;
  icon: React.ReactNode;
  title: string;
}> = ({ label, icon, title }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
      <div className="text-blue-500">{icon}</div>
      <div>
        <h4 className="text-sm font-semibold">{title}</h4>
        <span className="text-lg font-medium">{label}</span>
      </div>
    </div>
  );
};

export default ProvCard;
