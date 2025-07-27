import { useState } from 'react';
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

async function addDoc(formData: object) {
  try {
    const docRef = doc(collection(db, "attendants"));
    await setDoc(docRef, formData);
    return true; 
  } catch (error) {
    console.error("Error writing document:", error);
    return false;
  }
}

const AttendantForm = () => {
  const initialFormState = {
    organizationName: '',
    yearsInBusiness: '',
    image: null,
    serviceType: '',
    customersServed: '',
    avgRating: '',
    numberOfRatings: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await addDoc(formData);
    if (success) {
      toast.success("Data added successfully!");
      setFormData(initialFormState);
    } else {
      toast.error("Error adding data. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="organizationName" className="block text-gray-700">Name of the Organization</label>
            <input
              type="text"
              id="organizationName"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="yearsInBusiness" className="block text-gray-700">Years in Business</label>
            <input
              type="number"
              id="yearsInBusiness"
              name="yearsInBusiness"
              value={formData.yearsInBusiness}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="serviceType" className="block text-gray-700">Type of Service</label>
            <input
              type="text"
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="customersServed" className="block text-gray-700">No. of Customers Served</label>
            <input
              type="number"
              id="customersServed"
              name="customersServed"
              value={formData.customersServed}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="avgRating" className="block text-gray-700">Avg Rating</label>
            <input
              type="number"
              step={0.1}
              min="1"
              max="5"
              id="avgRating"
              name="avgRating"
              value={formData.avgRating}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="numberOfRatings" className="block text-gray-700">No. of Ratings</label>
            <input
              type="number"
              id="numberOfRatings"
              name="numberOfRatings"
              value={formData.numberOfRatings}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="flex justify-items-center mt-6 flex-wrap">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-teal-700 text-white rounded-lg hover:bg-teal-800 mt-6 max-w-sm mx-auto text-center transition duration-300"
          >
            Submit
          </button>
        </div>
        <br />
      </form>
      <ToastContainer />
    </>
  );
};

export default AttendantForm;