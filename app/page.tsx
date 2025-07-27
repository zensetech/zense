"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import { KeyFeatures } from "@/components/KeyFeatures";
import { Steps } from "@/components/Steps";
import { PincodeSearch } from "@/components/PincodeSearch";
import Image from "next/image";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-200">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div
            id="SEARCH"
            className="grid md:grid-cols-2 gap-12 items-center pt-16"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight text-center md:text-left">
                Find the perfect care{" "}
                <div className="text-teal-700"> for your loved ones.</div>
              </h1>
              <p className="mt-6 text-lg text-gray-600 text-center md:text-left">
                Zense connects you with verified, compassionate, and affordable
                senior care solutions, whether at home or in a senior living
                facility.
              </p>

              {/* Search Bar */}
              <div className="mt-8 flex gap-2">
                <PincodeSearch />
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/uploads/hero.jpeg"
                alt="Elderly care"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <WhatsAppFloatingButton />
      <Features />
      <Services />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
