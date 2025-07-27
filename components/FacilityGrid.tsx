import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Ensure you have Firebase initialized
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";

interface FacilityCardProps {
  name: string;
  image: string;
  location: string;
  price: string;
  rating?: string;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ name, image, location, price, rating }) => {
  return (
    <Card className="rounded-2xl shadow-lg overflow-hidden bg-white flex flex-col justify-between hover:shadow-2xl transition duration-300 cursor-pointer min-w-[300px] max-w-[400px]">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-t-2xl" />
      <CardContent className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-2xl text-black mb-2 font-extrabold">{name}</h2>
          <p className="text-black text-sm mb-2 flex items-center">
            <span className="font-medium flex"><MapPin className="min-w-3 min-h-3 text-teal-700 mr-2" />{location}</span>
          </p>
          {rating && (
            <p className="text-black text-sm mb-2 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" /> {/* Increased icon size */}
              <span className="font-medium">{rating} / 5</span>
            </p>
          )}
          {/* Commented out the price line */}
          {/* <p className="text-teal-700 font-bold text-lg mb-4">Starting at ₹{price}/month</p> */}
        </div>
        <div className="flex gap-4 mt-4">
          <Button className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-3 rounded-lg shadow-md flex-grow">View Details</Button>
          <Button className="bg-black hover:bg-gray-800 text-white px-4 py-3 rounded-lg shadow-md flex-grow">Enquire Now</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const FacilityGrid: React.FC = () => {
  const [facilities, setFacilities] = useState<FacilityCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "listings"));
        const facilitiesData: FacilityCardProps[] = querySnapshot.docs.map(doc => ({
          name: doc.data().providerName || "Unknown Provider",
          image: "https://images.unsplash.com/photo-1496938461470-aaa34930e2d7?auto=format&fit=crop&w=800&q=60", // Simplified placeholder image URL
          location: doc.data().address || "Location not specified",
          price: doc.data().price || "N/A",
          rating: doc.data().rating || "N/A",
        }));
        setFacilities(facilitiesData);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  if (loading) {
    return <p className="m-10 text-lg font-semibold">Loading Providers...</p>;
  }

  return (
    <div className="flex flex-wrap justify-evenly items-center gap-4 p-6">
      {facilities.map((facility, index) => (
        <FacilityCard key={index} {...facility} />
      ))}
    </div>
  );
};

export default FacilityGrid;
