import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { searchPincodes } from '@/app/data/pincodes/search';

function toTitleCase(str: any) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Example query: get all users
    const { type, district, pincode } = req.query;

    const querySnapshot = await getDocs(collection(db, "users"));
    let users = querySnapshot.docs
      .map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }))

    // Filter by type (case-insensitive)
    if (type) {
      users = users.filter((user) => user.jobRole === type);
    }

    if (district) {
      const districtTitle = toTitleCase(district);
      users = users.filter((user) => {
        if (!Array.isArray(user.subDistricts)) return false;
        return (
          user.subDistricts.includes(districtTitle) ||
          user.subDistricts.includes(districtTitle + " Delhi")
        );
      });
    }

    if (pincode) {
      const { results } = searchPincodes(pincode as string);

      if (results && results.length > 0) {
        const districtFromPincode = toTitleCase(results[0].district);

        users = users.filter((user) => {
          if (!Array.isArray(user.subDistricts)) return false;

          return (
            user.subDistricts.includes(districtFromPincode) ||
            user.subDistricts.includes(`${districtFromPincode} Delhi`)
          );
        });
      }
    }

    res.status(200).json({ success: true, len: users.length, users });
  } catch (error: any) {
    console.error("Error in search API:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}
