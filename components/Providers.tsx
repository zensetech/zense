import React, { useState } from 'react'
import { doc, collection, getDocs } from "firebase/firestore";
import FacilityGrid from './FacilityGrid';
import { db } from "@/firebaseConfig";

async function getAllProviders() {
    return await getDocs(collection(db, 'listings'))
}

export default function Providers() {
    const [providers, setProviders] = useState( getAllProviders())
    return (
        <div>
        </div>
    )
}
