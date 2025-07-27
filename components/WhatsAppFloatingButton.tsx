import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloatingButton = () => {
  return (
    <a
      href="https://wa.me/+919220249040?text=Hi!%20I'm%20looking%20for%20at%20home%20elder%20care%20services%20and%20I%20would%20like%20to%20know%20more%20about%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
    >
      <FaWhatsapp size={24} />
    </a>
  );
};

export default WhatsAppFloatingButton;
