'use client';

import React, { useEffect, useState } from 'react';
import { db } from "@/firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { NurseCard, Attendant } from '@/components/NurseCard';

function AttendantGrid() {
    const [attendants, setAttendants] = useState<Attendant[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state
  
    useEffect(() => {
      const fetchAttendants = async () => {
        try {
          const attendantsCollection = collection(db, "attendants");
          const attendantsSnapshot = await getDocs(attendantsCollection);
          const attendantsList = attendantsSnapshot.docs.map(doc => ({
            id: doc.id, // Include the document ID if needed
            ...doc.data(),
          } as Attendant));
          setAttendants(attendantsList);
        } catch (error) {
          console.error("Error fetching attendants: ", error);
        } finally {
          setLoading(false); // Set loading to false after fetching data
        }
      };
  
      fetchAttendants();
    }, []);
  return (
    <div>
        {loading ? ( // Display loading message or spinner
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-600">Loading attendants...</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-evenly items-center gap-4 p-4">
          {attendants.map((attendant, index) => (
            <NurseCard key={attendant.id || index} attendant={attendant} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AttendantGrid