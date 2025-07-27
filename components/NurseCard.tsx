
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";


// Define the type for an attendant
export interface Attendant {
    id: string; // Optional if you want to include the document ID
    organizationName: string;
    serviceType: string;
    yearsInBusiness: number;
    avgRating: number;
    skills: string[];
    price: number;
    imageUrl: string;
    numberOfRatings: number;
    customersServed: number;
  }


export function NurseCard({ attendant }: { attendant: Attendant }) {
    return (
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer p-5 w-[26rem]">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 overflow-hidden rounded-full relative">
            <Image
              src={attendant.imageUrl || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt={attendant.organizationName}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{attendant.organizationName}</h2>
            <p className="text-teal-700 text-sm">{attendant.serviceType}</p>
            <div className="flex items-center text-gray-500 text-sm">
              <span>{attendant.yearsInBusiness} years experience</span>
            </div>
          </div>
        </div>
  
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="ml-1 text-sm font-medium">{attendant.avgRating} ({attendant.numberOfRatings})</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {attendant.skills?.map((skill, index) => (
            <span key={index} className="bg-teal-100 text-teal-700 text-xs font-medium px-2 py-1 rounded-lg">
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-600">Starting at</div>
        <div className="text-lg font-bold">₹{attendant.price || 2000}/day</div>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 border border-teal-700 text-teal-700 rounded-lg px-3 py-2 text-sm font-medium hover:bg-teal-50">
            <Link href={`/attendant/${encodeURIComponent(attendant.id)}`}>View Profile</Link>
          </button>
          <button className="flex-1 bg-teal-700 text-white rounded-lg px-3 py-2 text-sm font-medium hover:bg-teal-800">
            Hire Now
          </button>
        </div>
      </div>
    );
  }