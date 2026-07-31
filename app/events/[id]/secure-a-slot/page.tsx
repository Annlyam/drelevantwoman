"use client";

import ContactInfoStep from "@/components/events/ContactInfoStep";
import { Event } from "@/components/events/EventCard";
import OrderSummary from "@/components/events/OrderSummary";
import SelectTicketsStep from "@/components/events/SelectTicketsStep";
import Footer from "@/components/shared/Footer";
import Navigation from "@/components/shared/Navigation";
import eventData from "@/lib/data/eventData.json";
import { CheckCircle, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { getEventsQuery } from "@/sanity/lib/queries";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SecureASlotPage({ params }: PageProps) {
  const { id } = use(params);
  
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const sanityEvents = await client.fetch(getEventsQuery);
        if (sanityEvents && sanityEvents.length > 0) {
          const mappedEvents = sanityEvents.map((e: any) => ({
            ...e,
            date: e.date ? e.date.split("T")[0] : "",
            time: e.date ? e.date.split("T")[1]?.slice(0, 5) : "",
            registered: e.registeredCount,
            id: e.slug || e.id,
          }));
          const sanityEvent = mappedEvents.find((e: Event) => e.id === id);
          if (sanityEvent) {
            setEvent(sanityEvent);
            setIsLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error("Failed to fetch events from Sanity:", error);
      }
      
      const staticEvents = eventData as Event[];
      const foundEvent = staticEvents.find((e) => e.id === id);
      if (foundEvent) setEvent(foundEvent);
      setIsLoading(false);
    };
    fetchEvent();
  }, [id]);

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [slotQuantity, setSlotQuantity] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+234", // Default to Nigeria
  });

  if (isLoading) {
    return <div className="min-h-screen bg-[#3a225c] flex items-center justify-center text-white">Loading...</div>;
  }

  if (!event) {
    notFound();
  }

  // Calculate pricing
  const slotPrice = event.price;
  const serviceFee = slotPrice > 0 ? Math.round(slotPrice * 0.02) : 0; // 2% service fee
  const insuranceFee = slotPrice > 0 ? 1 : 0; // Fixed insurance fee (only for paid events)
  const subtotal = slotPrice * slotQuantity;
  const total = subtotal + serviceFee + insuranceFee;

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = (data: typeof formData) => {
    // Handle form submission
    console.log("Registration data:", {
      event: event.id,
      slots: slotQuantity,
      contact: data,
      total: total,
    });
    // Here you would typically send this to your API
    alert(
      "Registration successful! You will receive a confirmation email shortly.",
    );
  };

  return (
    <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
      <Navigation />

      {/* Header */}
      <section className="pt-24 pb-8 bg-[#3a225c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link
                href={`/events/${event.id}`}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Secure a Slot
              </h1>
            </div>
            <Link
              href={`/events/${event.id}`}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </Link>
          </div>

          {/* Wizard Progress */}
          <div className="flex items-center gap-4 mb-8">
            {/* Step 1 */}
            <div className="flex items-center gap-3 flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  currentStep >= 1
                    ? "bg-[#f9f871] text-[#3a225c]"
                    : "bg-white/10 text-white/50"
                }`}
              >
                {currentStep > 1 ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span>1</span>
                )}
              </div>
              <div className="flex-1">
                <div
                  className={`text-xs font-semibold ${
                    currentStep >= 1 ? "text-white/70" : "text-white/40"
                  }`}
                >
                  STEP 1
                </div>
                <div
                  className={`font-bold ${
                    currentStep >= 1 ? "text-white" : "text-white/50"
                  }`}
                >
                  Select Slots
                </div>
              </div>
            </div>

            {/* Connector Line */}
            <div
              className={`h-1 flex-1 transition-all ${
                currentStep >= 2 ? "bg-[#f9f871]" : "bg-white/20"
              }`}
            />

            {/* Step 2 */}
            <div className="flex items-center gap-3 flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  currentStep >= 2
                    ? "bg-[#f9f871] text-[#3a225c]"
                    : "bg-white/10 text-white/50"
                }`}
              >
                2
              </div>
              <div className="flex-1">
                <div
                  className={`text-xs font-semibold ${
                    currentStep >= 2 ? "text-white/70" : "text-white/40"
                  }`}
                >
                  STEP 2
                </div>
                <div
                  className={`font-bold ${
                    currentStep >= 2 ? "text-white" : "text-white/50"
                  }`}
                >
                  Contact Info
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 md:pt-9 bg-white/5">
        <div className="max-w-7xl mx-auto md:px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Form Steps */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <SelectTicketsStep
                  event={event}
                  quantity={slotQuantity}
                  onQuantityChange={setSlotQuantity}
                  onNext={handleNextStep}
                />
              )}

              {currentStep === 2 && (
                <ContactInfoStep
                  event={event}
                  formData={formData}
                  onFormDataChange={setFormData}
                  onPrevious={handlePreviousStep}
                  onSubmit={handleSubmit}
                  total={total}
                />
              )}
            </div>

            {/* Right Panel - Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                event={event}
                quantity={slotQuantity}
                ticketPrice={slotPrice}
                serviceFee={serviceFee}
                insuranceFee={insuranceFee}
                total={total}
                currentStep={currentStep}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
