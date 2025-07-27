import React from "react";
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Adjust the import path for Firebase config
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function addMessage(title: string, email: string, message: string): Promise<void> {
  try {
    const docRef = doc(collection(db, "callbacks"));
    await setDoc(docRef, { email, title, message });
  } catch (error) {
    console.error("Error writing document:", error);
    throw error;
  }
}

const CallbackForm: React.FC = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const title = (form.elements.namedItem("subject") as HTMLInputElement)?.value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value;

    if (!email || !title || !message) {
      console.error("All fields are required!");
      return;
    }

    try {
      await addMessage(title, email, message);
      toast.success("We have received your message and will get back to you!");
      form.reset(); // Clear the form fields
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        action="#"
        id="callbackForm"
        className="space-y-8"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="shadow-sm outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            placeholder="Email Address"
            required
          />
        </div>
        <div>
          <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="block outline-none p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
            placeholder="Let us know how we can help you"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
            Your message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className="block p-2.5 outline-none w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Leave a comment..."
            required
          />
        </div>
        <button
          type="submit"
          className="py-3 outline-none px-5 text-sm font-medium text-center text-white rounded-lg bg-teal-700 sm:w-fit hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-primary-300"
        >
          Send message
        </button>
      </form>
    </>
  );
};

export default CallbackForm;