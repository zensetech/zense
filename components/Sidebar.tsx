import { useState } from "react";
import { Home, Users, Settings, LogOut, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <Home />, route: "/admin/dashboard" },
    { name: "Users", icon: <Users />, route: "/admin/users" },
    { name: "Settings", icon: <Settings />, route: "/admin/settings" },
    { name: "Logout", icon: <LogOut />, route: "/admin/logout" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed z-20 h-full bg-white border-r border-gray-200 flex flex-col transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} w-64`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-teal-700 ml-10">Zense</h1>
          <button
            className="p-2 rounded-md bg-gray-200 text-black md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-grow">
          <ul className="space-y-2 p-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.route}
                  className={`flex items-center gap-3 p-3 rounded-lg text-base font-medium transition-colors
                    ${
                      active === item.name
                        ? "bg-teal-700 text-white"
                        : "text-black hover:bg-gray-100"
                    }
                  `}
                  onClick={() => setActive(item.name)}
                >
                  <div
                    className={`w-6 h-6 flex-shrink-0 ${
                      active === item.name ? "text-white" : "text-teal-700"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {isOpen && <span>{item.name}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">&copy; 2025 Zense. All rights reserved.</p>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className="fixed z-30 top-4 left-4 p-2 rounded-lg bg-gray-200 text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Main Content */}
      <div className={`flex-grow transition-all duration-300 ${isOpen ? "ml-64" : "ml-16"} p-6`}>
        <h2 className="text-xl font-bold">Welcome to Zense Admin Panel</h2>
        {/* Add your main content here */}
      </div>
    </div>
  );
};

export default Sidebar;
