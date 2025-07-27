/* eslint-disable @next/next/no-img-element */
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StaffProfile from "../../components/staff/StaffProfile";
import { getGroupedDutiesByRole } from "../../../app/constants/duties";

export const dynamic = "force-dynamic";

interface AttendantPageProps {
  params: Promise<{ name: string }>;
}

const fetchDocument = async (name: string) => {
  const docRef = doc(db, "users", name);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    return docSnapshot.data();
  } else {
    console.log("No such document!");
  }
};

export default async function AttendantPage({ params }: AttendantPageProps) {
  const { name } = await params;
  const attendant = await fetchDocument(name);

  // Dummy reviews for now (replace with real fetch if needed)
  const reviews = [
    {
      name: "Bhajan Sharma",
      rating: 5,
      text: "Absolutely wonderful caregiver! He has been so compassionate and attentive to my father's needs, making a huge difference in his daily comfort and happiness. I'm grateful for the peace of mind knowing my dad is in such caring hands.",
    },
    {
      name: "Mohan Yadav",
      rating: 5,
      text: "Kuldeep ek bohot acche caregiver hai, hamesha muskurate rehte hai aur pyar se kaam karte hai. 😊 Mere har kaam mein madad karte hai, chai se lekar dawa tak sab yaad rakhte hai. He is very patient and understands my needs without me even saying.",
    },
  ];

  if (!attendant) {
    return <div>Attendant not found</div>;
  }

  // Use jobRole for grouping, fallback to "attendant"
  const groupedDuties = getGroupedDutiesByRole(
    attendant.jobRole || "attendant"
  );

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 md:p-6 pt-24">
        <StaffProfile
          staff={attendant}
          // reviews={reviews}
          groupedDuties={groupedDuties}
        />
      </div>
      <Footer />
    </main>
  );
}
