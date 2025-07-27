import React, { useEffect, useState } from "react";
import { db } from "@/firebaseConfig"; // Adjust the path based on your Firebase config
import { collection, getDocs } from "firebase/firestore";
import ProvCard from "@/components/ProvCard";

interface Provider {
  id: string;
  businessName: string;
  businessAddress: string;
  businessHours: string;
  contactNumbers: string;
  yearsInBusiness: number;
  customersServed: string;
  logoUrl: string;
  attendantsAvailable: string;
  nursesAvailable: string;
  semiNursesAvailable: string;
  servicesOffered: string[];
  serviceCities: string[];
}

const ProviderGrid: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "providers"));
        const providersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Provider));
        setProviders(providersList);
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading providers...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-evenly items-center">
        {providers.map(provider => (
          <ProvCard address={""} phone={""} experience={""} key={provider.id} {...provider} />
        ))}
      </div>
    </div>
  );
};

export default ProviderGrid;
