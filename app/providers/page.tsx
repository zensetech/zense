"use client";

import { useState, useEffect, Suspense } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePincodeSearch } from "@/app/hooks/usePincodeSearch";
import { useRouter, useSearchParams } from "next/navigation";
import type { PincodeData } from "@/app/data/pincodes/types";
import { Search, MapPin, Star, Loader2 } from "lucide-react"; // Added Loader2 for loading animation
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { db } from "@/firebaseConfig"; // Adjust the path based on your Firebase config
import { collection, getDocs } from "firebase/firestore";
import React from "react";
import ProvCard from "@/components/ProvCard";
import AttendantCard from "@/components/AttendantCard";
export const dynamic = "force-dynamic";

// Match the exact props expected by ProvCard
interface ProviderCardProps {
  id: string;
  logoUrl: string;
  businessName: string; // Changed from businessName
  address: string; // Changed from businessAddress
  phone: string; // Changed from yearsInBusiness
  yearsInBusiness: number;
  customersServed: string;
  attendantsAvailable: string;
  nursesAvailable: string;
  semiNursesAvailable: string;
  servicesOffered: string[];
  serviceCities: string[];
}

interface ProviderGridProps {
  providers: ProviderCardProps[];
}

interface Provider {
  // Homes-specific properties (Required)
  providerName?: string;
  address?: string;
  phone?: string;
  countryCode?: string;
  experience?: string;
  norooms?: string;
  staff?: string;
  trusted?: string;
  verified?: string;
  recentEnquiries?: string;
  description?: string;
  amenities?: string[];
  rooms?: Array<{
    name: string;
    price: number;
    space: number;
    people: number;
  }>;

  // Home-care-specific properties (Required)
  businessName?: string;
  ownerName?: string;
  yearsInBusiness?: number;
  businessAddress?: string;
  contactNumbers?: string;
  emergencyContactNumbers?: string;
  emailId?: string;
  panNumber?: string;
  gstNumber?: string;
  businessHours?: string;
  serviceCities?: string[];
  attendantsAvailable?: string;
  nursesAvailable?: string;
  semiNursesAvailable?: string;
  customersServed?: string;
  attendant24HourShift?: string;
  nurse24HourShift?: string;
  nurse12HourShift?: string;
  nurse6HourShift?: string;
  nurseDuration?: string;
  attendant12HourShift?: string;
  attendant6HourShift?: string;
  attendantDuration?: string;
  servicesOffered?: string[];
  timeToReplace?: string;
  semiNurse24HourShift?: string;
  semiNurse12HourShift?: string;
  semiNurse6HourShift?: string;
  semiNurseDuration?: string;

  // Common properties (Optional)
  rating?: string;
  ratings?: string;
  responseTime?: string;
  id: string;
  logoUrl: string;
}

interface Attendant {
  id: string;
  fullName: string;
  name: string;
  jobRole: string;
  experienceYears: number | string;
  languagesKnown: string[];
  district: string[];
  location?: string;
  subDistricts: string[];
  preferredShifts: string[];
  extraServicesOffered: string[];
  agency?: string;
  gender?: string;
  status?: string;
  expectedWages?: {
    "5hrs"?: number;
    "12hrs"?: number;
    "24hrs"?: number;
  };
  currentAddress?: {
    zip?: string;
  };
  // Add other fields as needed
}

const nurseServicesList = [
  "Assist with bathing, dressing, grooming",
  "Oral care & Skincare",
  "Assist with mobility, transfers and positioning",
  "Administer prescribed medication",
  "Monitor medication schedule, dosage and side effects",
  "Checking & recording vitals (BP, Sugar, Pulse, Temperature)",
  "Dressing and managing wounds",
  "Manage catheter, feeding tubes, colostomy bags",
  "Assist with physiotherapy/passive exercises",
  "Assist with meal planning as per doctors recommendations",
  "Assist with feeding",
  "Ensure adequate hydration",
  "Recognize early sign of emergency",
  "Perform basis first-aid & CPR",
  "Engage patient in light conversation and activity",
  "Educate family members on patient care",
  "Maintain record of patients condition, treatment and medication",
  "Communicating with doctors, physiotherapists, nutritionists",
  "Assisting in follow-ups, hospital visits, or diagnostic tests",
];

const districtsToCheck = [
  "New Delhi",
  "Central Delhi",
  "North",
  "South",
  "East",
  "West",
  "North East",
  "North West",
  "South East",
  "South West",
];

const serveIn = [
  // Delhi Districts
  "Central Delhi",
  "East Delhi",
  "New Delhi",
  "North Delhi",
  "North East Delhi",
  "North West Delhi",
  "Shahdara",
  "South Delhi",
  "South East Delhi",
  "South West Delhi",
  "West Delhi",

  // NCR - Uttar Pradesh
  "Ghaziabad",
  "Gautam Buddha Nagar",
  "Hapur",
  "Meerut",
  "Bulandshahr",
  "Baghpat",
  "Muzaffarnagar",
  "Shamli",

  // NCR - Haryana
  "Gurugram",
  "Faridabad",
  "Rohtak",
  "Jhajjar",
  "Sonipat",
  "Panipat",
  "Rewari",
  "Palwal",
  "Mahendragarh",
  "Karnal",
  "Mewat",

  // NCR - Rajasthan
  "Alwar",
  "Bharatpur",
];

const attendantServicesList = [
  "Assist with bathing, dressing, grooming",
  "Oral care & Skincare",
  "Assist with mobility, transfers and positioning",
  "Medication reminders to patient",
  "Checking & recording vitals (BP, Sugar, Pulse, Temperature)",
  "Assist with feeding",
  "Ensure adequate hydration",
  "Recognize early sign of emergency",
  "Engage patient in light conversation and activity",
  "Keeping the patient’s room clean, ventilated, and clutter-free",
  "Change bed linens and maintaining hygiene",
  "Assist with laundry and light housekeeping",
];

function getPincodesByDistrict(district: string, pincodesByState: any) {
  const result: string[] = [];
  for (const state in pincodesByState) {
    if (pincodesByState.hasOwnProperty(state)) {
      const pincodeDataArray = pincodesByState[state];
      for (const pincodeData of pincodeDataArray) {
        if (pincodeData.district === district) {
          result.push(pincodeData.pincode);
        }
      }
    }
  }
  return result;
}

interface FacilityCardProps {
  facilityPincode: string | undefined;
  id: string;
  providerName: string;
  image: string;
  address: string;
  price: string;
  rating?: string;
}

const ProviderGrid: React.FC<ProviderGridProps> = ({ providers }) => {
  if (!providers || providers.length === 0) return null;

  const transformedProviders = providers.map((provider) => ({
    id: provider.id || "unknown-id",
    logoUrl: provider.logoUrl || "/uploads/icon.png",
    businessName: provider.businessName || "Unknown Business",
    address: provider.address || "Address not available",
    phone: provider.phone || "NA",
    yearsInBusiness: provider.yearsInBusiness || 0,
    customersServed: provider.customersServed || "NA",
    attendantsAvailable: provider.attendantsAvailable || "0",
    nursesAvailable: provider.nursesAvailable || "0",
    semiNursesAvailable: provider.semiNursesAvailable || "0",
    servicesOffered: provider.servicesOffered || [],
    serviceCities: provider.serviceCities || [],
  }));

  return (
    <div className="container mx-auto p-4 w-full">
      <div className="flex flex-wrap justify-evenly items-center w-full">
        {transformedProviders.map((provider) => (
          <ProvCard key={provider.id} experience={""} {...provider} />
        ))}
      </div>
    </div>
  );
};

const FacilityCard: React.FC<FacilityCardProps> = ({
  providerName,
  image,
  address,
  price,
  rating,
  id,
}) => {
  return (
    <Card className="rounded-2xl shadow-lg overflow-hidden bg-white flex flex-col justify-between hover:shadow-2xl transition duration-300 cursor-pointer min-w-[280px] max-w-[400px]">
      <img
        src="https://images.unsplash.com/photo-1496938461470-aaa34930e2d7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt={providerName}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <CardContent className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-2xl text-black mb-2 font-extrabold normal-case">
            {providerName}
          </h2>
          <p className="text-black text-sm mb-2 flex items-center">
            <span className="font-medium flex">
              <MapPin className="min-w-3 min-h-3 text-teal-700 mr-2" />
              {address}
            </span>
          </p>
          {rating && (
            <p className="text-black text-sm mb-2 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />{" "}
              {/* Increased icon size */}
              <span className="font-medium">{rating} / 5</span>
            </p>
          )}
        </div>
        <div className="flex gap-4 mt-4">
          <Button className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-3 rounded-lg shadow-md flex-grow">
            <Link href={`/homes/${encodeURIComponent(id)}`}>View Details</Link>
          </Button>
          <Button className="bg-black hover:bg-gray-800 text-white px-4 py-3 rounded-lg shadow-md flex-grow">
            Enquire Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const FacilityGrid = ({ facilities }: { facilities: any[] }) => {
  if (!facilities || facilities.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-evenly items-center gap-4 p-6">
      {facilities.map((facility: any) => (
        <FacilityCard
          key={facility.id || Math.random()}
          providerName={facility.providerName || "Unknown Facility"}
          address={facility.address || "Address not available"}
          price={facility.price || "Price not available"}
          rating={facility.rating || "Not rated"}
          id={facility.id || "unknown-id"}
          image={facility.image || "/default-image.png"}
          {...facility}
        />
      ))}
    </div>
  );
};

function ProvidersContent() {
  const searchParams = useSearchParams();
  const currentLocation = searchParams?.get("location") || "";
  const district = searchParams?.get("district") || "";
  const router = useRouter();
  const [query, setQuery] = useState(currentLocation);
  const [selectedLocation, setSelectedLocation] = useState<PincodeData>();
  const { results, isLoading, error } = usePincodeSearch(query);
  const type = searchParams?.get("subCategory") || "nurse"; // Default selection
  const [listings, setListings] = useState<Attendant[]>([]);
  const [filteredListings, setFilteredListings] = useState<Attendant[]>([]);
  const [minRating, setMinRating] = useState<number[]>([1]); // Default value inside an array
  const [minYears, setMinYears] = useState<number[]>([1]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceCategory, setPriceCategory] = useState("attendant");
  const [duration, setDuration] = useState(6);
  const [gender, setGender] = useState(""); // "" | "Male" | "Female" | "Other"
  const [selectedShifts, setSelectedShifts] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sortOption, setSortOption] = useState("price-low-high");
  const [isLoadingListings, setIsLoadingListings] = useState(false); // Added for loading state

  const toTitleCase = (str: any) => {
    if (!str) return str;
    return str.replace(
      /\w\S*/g,
      (txt: any) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  // console.log("runnning")

  const getProviders = async () => {
    setIsLoadingListings(true);
    if (type === "attendant" || type === "nurse") {
      const querySnapshot = await getDocs(collection(db, "users"));
      let fetchedListings = querySnapshot.docs.map((doc: any) => {
        const data = doc.data();
        let services: string[] = [];
        if (
          data.extraServicesOffered &&
          typeof data.extraServicesOffered === "object"
        ) {
          services = Object.values(
            data.extraServicesOffered
          ).flat() as string[];
        }
        return {
          id: doc.id,
          ...data,
          extraServicesOffered: services,
        };
      });
      setListings(fetchedListings);
    }
    setIsLoadingListings(false);
  };

  const handleTypeChange = (event: any) => {
    const newType = event.target.value;
    router.push(
      "/providers/?location=" +
        currentLocation +
        "&subCategory=" +
        newType +
        "&district=" +
        district
    );
  };

  const isValidPincode = (pin: any) => /^\d{6}$/.test(pin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPincode(selectedLocation?.pincode)) {
      alert("Please enter a valid 6-digit pincode");
      return;
    }
    router.push(
      "/providers/?location=" +
        selectedLocation?.pincode +
        "&subCategory=" +
        type +
        "&district=" +
        selectedLocation?.district
    );
  };

  const handleSelect = (result: PincodeData) => {
    setSelectedLocation(result);
    setQuery(`${result.officeName}, ${result.district}`);
    router.push(
      "/providers/?location=" +
        result.pincode +
        "&subCategory=" +
        type +
        "&district=" +
        result?.district
    );
  };

  useEffect(() => {
    setFilteredListings([]); // Reset filtered listings when type changes
    getProviders();
  }, [type, currentLocation]);

  // useEffect(() => {
  //   if (!listings) return;

  //   // Step 1: Apply all filters
  //   const filtered = listings.filter(listing => {
  //     // 1. Role filter
  //     const roleMatch = !type || listing.jobRole === type;

  //     // 2. Location filter
  //     const locationMatch = !district ||
  //       listing.subDistricts.includes(toTitleCase(district)) || listing.subDistricts.includes(toTitleCase(district) + " Delhi");

  //     // 3. Years of experience filter
  //     const experienceMatch = listing.experienceYears >= minYears[0];

  //     // 4. Rating filter
  //     // const ratingMatch = !minRating ||
  //     //                   listing.rating >= minRating;

  //     // 5. Services filter
  //     const servicesMatch = !selectedServices?.length ||
  //       selectedServices.every((service: string) =>
  //         listing.extraServicesOffered.includes(service));

  //     return roleMatch && locationMatch && experienceMatch && servicesMatch;
  //   }, [listings, minYears[0]]);

  // // Step 2: Sort the filtered results (example: by rating descending)
  // const sorted = [...filtered].sort((a, b) => b.rating - a.rating);

  //   setFilteredListings(filtered);

  // }, [listings]); // Re-run when these dependencies change

  useEffect(() => {
    if (!listings) return;

    const applyFilters = (listing: Attendant) => {
      const statusMatch = !listing.status || listing.status !== "unregistered";
      if (!statusMatch) return false;

      const roleMatch =
        !type ||
        (listing.jobRole &&
          listing.jobRole.toLowerCase() === type.toLowerCase());
      const genderMatch =
        !gender ||
        (listing.gender &&
          listing.gender.toLowerCase() === gender.toLowerCase());
      const shiftMatch =
        selectedShifts.length === 0 ||
        (Array.isArray(listing.preferredShifts) &&
          listing.preferredShifts.some((shift: string) =>
            selectedShifts
              .map((s) => s.toLowerCase().trim())
              .includes(shift.toLowerCase().trim())
          ));
      const experienceMatch =
        typeof listing.experienceYears === "string" &&
        parseInt(listing.experienceYears?.split("-")[0]) >= minYears[0];
      const servicesMatch =
        selectedServices.length === 0 ||
        (Array.isArray(listing.extraServicesOffered) &&
          selectedServices.every((service: string) =>
            listing.extraServicesOffered.includes(service)
          ));

      return (
        roleMatch &&
        genderMatch &&
        shiftMatch &&
        experienceMatch &&
        servicesMatch
      );
    };

    const locationMatch = (listing: Attendant) => {
      const districtName = toTitleCase(district);
      const pincode = currentLocation;
      return (
        (Array.isArray(listing.district) &&
          listing.district.includes(districtName.toLowerCase())) ||
        (listing.currentAddress && listing.currentAddress.zip === pincode)
      );
    };

    const filtered = listings.filter(applyFilters);

    const topListings = filtered.filter(locationMatch);
    const otherListings = filtered.filter((listing) => !locationMatch(listing));

    setFilteredListings([...topListings, ...otherListings]);
  }, [
    listings,
    type,
    district,
    currentLocation,
    minYears,
    selectedServices,
    gender,
    selectedShifts,
  ]);

  const ContentSection: React.FC = () => {
    const locationMatch = (listing: Attendant) => {
      const districtName = toTitleCase(district);
      const pincode = currentLocation;
      return (
        (Array.isArray(listing.district) &&
          listing.district.includes(districtName.toLowerCase())) ||
        (listing.currentAddress && listing.currentAddress.zip === pincode)
      );
    };
    const topListings = filteredListings.filter(locationMatch);
    const otherListings = filteredListings.filter(
      (listing) => !locationMatch(listing)
    );
    console.log(otherListings)
    if (!currentLocation || !district) {
      return (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Please select a location and service to continue.
          </h2>
        </div>
      );
    }

    if (isLoadingListings) {
      return (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <Loader2 className="w-12 h-12 animate-spin text-teal-700" />
          <p className="mt-4 text-gray-600">Loading providers...</p>
        </div>
      );
    }

    if (filteredListings.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            No providers found for your search. Try different filters or
            location.
          </h2>
        </div>
      );
    }

    // console.log(listings)

    // console.log(serveIn)
    // console.log(toTitleCase(district))
    // console.log(toTitleCase(district)+" Delhi")
    // console.log(toTitleCase(district)+" Delhi" in serveIn)
    // console.log( toTitleCase(district) in serveIn )

    return (
      <div>
        {topListings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Best Finds</h2>
            <div className="flex flex-wrap justify-center gap-5 p-5">
              {topListings.map((attendant) => (
                <AttendantCard
                  key={attendant.id}
                  attendant={{
                    fullName: attendant?.name,
                    jobRole: attendant.jobRole,
                    experienceYears: attendant.experienceYears,
                    languagesKnown: attendant.languagesKnown,
                    // location: `${attendant.district}`,
                    // location: `${attendant.currentAddress?.state}`,
                    location: "Delhi NCR",
                    preferredShifts: attendant.preferredShifts,
                    extraServicesOffered: attendant.extraServicesOffered,
                    gender: attendant.gender,
                    expectedWages: attendant.expectedWages,
                    onViewProfile: () =>
                      router.push(
                        "/attendant/" + encodeURIComponent(attendant.id)
                      ),
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {otherListings.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              All Providers in Delhi NCR
            </h2>
            <div className="flex flex-wrap justify-center gap-5 p-5">
              {otherListings.map((attendant) => 

               (

                <AttendantCard
                  key={attendant.id}
                  attendant={{
                    fullName: attendant?.name.toUpperCase(),
                    jobRole: attendant.jobRole,
                    experienceYears: attendant.experienceYears,
                    languagesKnown: attendant.languagesKnown,
                    // location: `${attendant.district}`,
                    // location: `${attendant.currentAddress?.state}`,
                    location: "Delhi NCR",
                    preferredShifts: attendant.preferredShifts,
                    extraServicesOffered: attendant.extraServicesOffered,
                    gender: attendant.gender,
                    expectedWages: attendant.expectedWages,
                    onViewProfile: () =>
                      router.push(
                        "/attendant/" + encodeURIComponent(attendant.id)
                      ),
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );

    // else{
    //   return(
    //     <div className="flex flex-col items-center justify-center h-[50vh]">
    //       <h2 className="text-2xl font-semibold text-gray-600 mb-4">
    //       Currently, we only serve Delhi NCR. Stay tuned for updates!
    //       </h2>
    //     </div>
    //   )
    // }
  };

  return (
    <main className="container px-4 pt-8">
      <div className="flex flex-col md:flex-row gap-6 bg-white">
        {/* Filters */}
        <Button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden fixed bottom-6 right-6 z-50 shadow-xl px-6 py-3 rounded-full bg-teal-700 hover:bg-teal-800 text-white"
        >
          <Search className="w-5 h-5 mr-2" /> Filters
        </Button>

        {/* Filters Panel with Animation */}
        {/* FILTER PANEL */}
        <div
          className={cn(`
    w-full md:max-w-[300px] p-6 border rounded-lg shadow-sm bg-white z-40 md:z-auto
    fixed md:sticky inset-0 md:inset-auto
    md:top-20 md:h-[calc(100vh-150px)]
    transform transition-transform duration-300 ease-in-out
    overflow-y-auto
    ${showFilters ? "translate-x-0" : "translate-x-full md:translate-x-0"}
    md:block
  `)}
        >
          {/* Mobile Header with Close Button */}
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h2 className="text-xl font-bold">Filters</h2>
            <Button
              variant="ghost"
              onClick={() => setShowFilters(false)}
              className="text-gray-600 hover:text-gray-800 text-3xl p-0 leading-none"
            >
              &times;
            </Button>
          </div>

          {/* Desktop Header */}
          <h2 className="text-xl my-4 font-bold hidden md:block">Filters</h2>

          {/* Minimum Rating Filter */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm">Minimum Rating:</label>
              <span className="text-sm font-medium text-teal-700">
                {minRating[0]} ★
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>1</span>
              <span>5</span>
            </div>
            <Slider
              min={1}
              max={5}
              step={0.1}
              className="mt-2 h-2"
              value={minRating}
              onValueChange={setMinRating}
            />
          </div>

          {/* Work Experience Filter */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm">Work Experience:</label>
              <span className="text-sm font-medium text-teal-700">
                {minYears[0]}+ years
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>1</span>
              <span>20</span>
            </div>
            <Slider
              min={1}
              max={20}
              step={1}
              className="mt-2 h-2"
              value={minYears}
              onValueChange={setMinYears}
            />
          </div>

          {/* Gender Filter */}
          <div className="space-y-2 mb-4">
            <h3 className="text-sm font-semibold mb-2">Gender</h3>
            <div className="flex flex-wrap gap-2">
              {["Male", "Female", "Other"].map((g) => (
                <Button
                  key={g}
                  onClick={() => setGender(g === gender ? "" : g)}
                  className={cn(
                    "px-3 py-[2px] rounded-full text-xs transition-colors",
                    gender === g
                      ? "bg-teal-200 text-teal-700 hover:bg-teal-300"
                      : "bg-gray-100 text-gray-600 hover:bg-teal-100"
                  )}
                >
                  {g}
                </Button>
              ))}
            </div>
          </div>

          {/* Shift Filter */}
          <div className="space-y-2 mb-4">
            <h3 className="text-sm font-semibold mb-2">Select Shifts</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Morning Shift (6 AM - 2 PM)",
                "Afternoon Shift (2 PM - 10 PM)",
                "Night Shift (10 PM - 6 AM)",
                "Part Time",
                "Full Day (9 AM - 6 PM)",
              ].map((shift) => (
                <Button
                  key={shift}
                  onClick={() =>
                    setSelectedShifts((prev) =>
                      prev.includes(shift)
                        ? prev.filter((s) => s !== shift)
                        : [...prev, shift]
                    )
                  }
                  className={cn(
                    "px-3 py-[2px] rounded-full text-xs transition-colors",
                    selectedShifts.includes(shift)
                      ? "bg-teal-200 text-teal-700 hover:bg-teal-300"
                      : "bg-gray-100 text-gray-600 hover:bg-teal-100"
                  )}
                >
                  {shift}
                </Button>
              ))}
            </div>
          </div>

          {/* Services or Amenities Filter */}
          {type === "nurse" && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Services</h3>
              <div className="flex flex-wrap gap-2">
                {nurseServicesList.map((service) => (
                  <Button
                    key={service}
                    onClick={() =>
                      setSelectedServices((prev) =>
                        prev.includes(service)
                          ? prev.filter((a) => a !== service)
                          : [...prev, service]
                      )
                    }
                    className={cn(
                      "px-3 py-[2px] rounded-full text-xs transition-colors",
                      selectedServices.includes(service)
                        ? "bg-teal-200 text-teal-700 hover:bg-teal-300"
                        : "bg-gray-100 text-gray-600 hover:bg-teal-100"
                    )}
                  >
                    {service}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {type === "attendant" && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {attendantServicesList.map((amenity) => (
                  <Button
                    key={amenity}
                    onClick={() =>
                      setSelectedAmenities((prev) =>
                        prev.includes(amenity)
                          ? prev.filter((a) => a !== amenity)
                          : [...prev, amenity]
                      )
                    }
                    className={cn(
                      "px-3 py-[2px] rounded-full text-xs transition-colors",
                      selectedAmenities.includes(amenity)
                        ? "bg-teal-200 text-teal-700 hover:bg-teal-300"
                        : "bg-gray-100 text-gray-600 hover:bg-teal-100"
                    )}
                  >
                    {amenity}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* MOBILE BACKDROP */}
        <div
          className={cn(`
    fixed inset-0 bg-black/50 z-30 transition-opacity md:hidden
    ${showFilters ? "opacity-100" : "opacity-0 pointer-events-none"}
  `)}
          onClick={() => setShowFilters(false)}
        />

        {/* Results */}
        <div className="w-full">
          <div className="w-full mx-auto mb-8 bg-white md:px-20 pt-10">
            <h1 className="text-3xl font-bold mb-4">Find Care Providers</h1>
            <p className="text-muted-foreground mb-6">
              Browse our network of trusted elderly care providers and find the
              perfect match for your needs.
            </p>
            <div className="relative max-w-2xl bg-white">
              <form
                onSubmit={handleSubmit}
                className="relative flex flex-col md:flex-row items-center gap-2 w-full bg-white"
              >
                {/* Search Bar Container */}
                <div className="relative flex flex-grow w-full md:w-auto">
                  {/* Pincode Input */}
                  <Input
                    type="text"
                    placeholder="Enter pincode or area name..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                    className={cn(
                      "w-full md:w-[300px] lg:w-[400px] xl:w-[665px] h-12 pl-10 pr-12 text-lg shadow-sm rounded-md",
                      selectedLocation && "bg-green-50"
                    )}
                  />
                  {/* Map Pin Icon */}
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

                  {/* Search Button */}
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="absolute right-0 top-0 h-full"
                    disabled={!selectedLocation}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>

                {/* Dropdown Container */}
                <div className="w-full md:w-auto bg-white">
                  <select
                    className="w-full md:w-[250px] h-12 px-3 text-lg shadow-sm border rounded-md"
                    value={type}
                    onChange={handleTypeChange}
                  >
                    <option value="nurse">Nurse</option>
                    <option value="attendant">Attendant</option>
                  </select>
                </div>
              </form>

              {query.length >= 3 &&
                results.length > 0 &&
                query !== currentLocation && (
                  <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg border z-50">
                    <ScrollArea className="max-h-64 overflow-y-scroll">
                      {results.map((result, index) => (
                        <button
                          key={`${result.pincode}-${result.officeName}-${index}`}
                          onClick={() => handleSelect(result)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b last:border-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">
                                {result.officeName}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {result.district}, {result.state}
                              </div>
                            </div>
                            <div className="text-sm font-mono text-muted-foreground">
                              {result.pincode}
                            </div>
                          </div>
                        </button>
                      ))}
                    </ScrollArea>
                  </div>
                )}
            </div>
          </div>
          <ContentSection />
        </div>
      </div>
    </main>
  );
}

export default function ProvidersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main>
        <Navbar />
        <br />
        <ProvidersContent />
        <br />
        <br />
        <br />
        <Footer />
      </main>
    </Suspense>
  );
}
