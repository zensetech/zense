import PatientForm from "./PatientForm";
import { Mail, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="form" className="text-black bg-white">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
          Get in Touch
        </h2>
        <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-6 text-center">
          <p className="font-light text-gray-600 text-xl flex items-center gap-2">
            {" "}
            {/* Added flex and gap */}
            <Mail size={20} /> {/* Added Mail icon */}
            <a
              href="mailto:Hello@zense.in"
              className="text-blue-600 hover:underline"
            >
              Hello@zense.in
            </a>
          </p>
          <p className="font-light text-gray-600 text-xl flex items-center gap-2">
            {" "}
            {/* Added flex and gap */}
            <Phone size={20} /> {/* Added Phone icon */}
            <a
              href="tel:‪+919220249040‬"
              className="text-blue-600 hover:underline"
            >
              ‪+91 9220249040‬
            </a>
          </p>
        </div>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-6 00 sm:text-xl">
          Let's explore how we can support you and your loved ones. <br />
          Fill in the form to reach out to us!
        </p>
        <PatientForm />
      </div>
    </section>
  );
}

export default Contact;
