import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const footerLinks = [
  { name: 'Find Care', href: '/providers' },
  // { name: 'Resources', href: '/' },
  // { name: 'Privacy Policy', href: '/' },
];

const socialLinks = [
  // { name: 'Facebook', icon: Facebook, href: '/' },
  // { name: 'Twitter', icon: Twitter, href: '/' },
  // { name: 'Instagram', icon: Instagram, href: '/' },
  // { name: 'LinkedIn', icon: Linkedin, href: '/' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold text-teal-500">
              Zense
            </Link>
            <p className="mt-4 text-gray-400">
              Providing compassionate care for your loved ones.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-teal-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {/* {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-teal-500 transition-colors"
                >
                  <social.icon size={24} />
                </a>
              ))} */}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Zense. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}