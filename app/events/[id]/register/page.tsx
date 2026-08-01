"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { User, CheckCircle, ArrowRight, AlertCircle, Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { getEventsQuery } from "@/sanity/lib/queries";
import eventData from "@/lib/data/eventData.json";
import { Event } from "@/components/events/EventCard";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  age: string;
}

export default function EventRegisterPage({ params }: PageProps) {
  const { id } = use(params);

  const [event, setEvent] = useState<Event | null>(null);
  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      age: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const sanityEvents = await client.fetch(getEventsQuery);
        if (sanityEvents && sanityEvents.length > 0) {
          const mapped = sanityEvents.map((e: any) => ({
            ...e,
            date: e.date ? e.date.split("T")[0] : "",
            time: e.date ? e.date.split("T")[1]?.slice(0, 5) : "",
            registered: e.registeredCount,
            id: e.slug || e.id,
          }));
          const found = mapped.find((e: Event) => e.id === id);
          if (found) {
            setEvent(found);
            setIsLoadingEvent(false);
            return;
          }
        }
      } catch {}

      const staticEvents = eventData as Event[];
      const found = staticEvents.find((e) => e.id === id);
      setEvent(found || null);
      setIsLoadingEvent(false);
    };
    fetchEvent();
  }, [id]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          eventId: event?.id,
          eventTitle: event?.title,
          eventDate: event?.date,
          eventTime: event?.time,
          eventEndTime: event?.endTime,
          eventZoomLink: (event as any)?.zoomLink || (event as any)?.registrationLink,
          eventVenue: event?.venue,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Registration failed. Please try again.");
      }

      setIsSubmitted(true);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingEvent) {
    return (
      <main className="min-h-screen bg-[#3a225c] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/20 border-t-[#f9f871] rounded-full animate-spin" />
      </main>
    );
  }

  if (!event) {
    notFound();
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "TBA";
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (t?: string) => {
    if (!t) return "";
    const [h, m] = t.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${hour % 12 || 12}:${m} ${ampm}`;
  };

  return (
    <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2c144c] via-[#3a225c] to-[#5b1364]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-[#fc98ac]/20 border border-[#fc98ac]/40 text-[#fc98ac] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Event Registration
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Register for{" "}
              <span className="text-[#f9f871]">{event!.title}</span>
            </h1>
            {/* Event meta */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-white/70 text-sm">
              {event!.date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#fc98ac]" />
                  {formatDate(event!.date)}
                </span>
              )}
              {event!.time && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#fc98ac]" />
                  {formatTime(event!.time)}
                  {event!.endTime ? ` – ${formatTime(event!.endTime)}` : ""}
                </span>
              )}
              {event!.venue && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#fc98ac]" />
                  {event!.venue}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-10 md:py-16 bg-[#3a225c]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#fc98ac] flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Your Information</h2>
                <p className="text-white/60 text-sm">All fields are required</p>
              </div>
            </div>

            {isSubmitted ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-20 h-20 bg-[#f9f871]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-[#f9f871]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">You're Registered! 🎉</h3>
                <p className="text-white/70 mb-2">
                  Thank you for registering for <strong className="text-[#fc98ac]">{event!.title}</strong>.
                </p>
                <p className="text-white/60 text-sm mb-8">
                  A confirmation email with event details has been sent to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href={`/events/${id}`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white border border-white/20 font-semibold rounded-lg hover:bg-white/20 transition-colors"
                  >
                    View Event Details
                  </Link>
                  <Link
                    href="/events"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#f9f871]/90 transition-colors"
                  >
                    Browse More Events
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* First & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="reg-firstName" className="block text-sm font-medium text-white/80 mb-2">
                      First Name <span className="text-[#fc98ac]">*</span>
                    </label>
                    <input
                      type="text"
                      id="reg-firstName"
                      {...register("firstName", {
                        required: "First name is required",
                        minLength: { value: 2, message: "At least 2 characters" },
                        validate: (v) => v.trim().length >= 2 || "At least 2 characters",
                      })}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                        errors.firstName ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-[#f9f871]"
                      }`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="reg-lastName" className="block text-sm font-medium text-white/80 mb-2">
                      Last Name <span className="text-[#fc98ac]">*</span>
                    </label>
                    <input
                      type="text"
                      id="reg-lastName"
                      {...register("lastName", {
                        required: "Last name is required",
                        minLength: { value: 2, message: "At least 2 characters" },
                        validate: (v) => v.trim().length >= 2 || "At least 2 characters",
                      })}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                        errors.lastName ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-[#f9f871]"
                      }`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="reg-email" className="block text-sm font-medium text-white/80 mb-2">
                    Email Address <span className="text-[#fc98ac]">*</span>
                  </label>
                  <input
                    type="email"
                    id="reg-email"
                    {...register("email", {
                      required: "Email address is required",
                      setValueAs: (v) => v.trim(),
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" },
                    })}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                      errors.email ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-[#f9f871]"
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="reg-phone" className="block text-sm font-medium text-white/80 mb-2">
                    Phone Number <span className="text-[#fc98ac]">*</span>
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: "Phone number is required",
                      validate: (v) => {
                        if (!v) return "Phone number is required";
                        return isValidPhoneNumber(v) || "Please enter a valid phone number";
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <PhoneInput
                        international
                        defaultCountry="NG"
                        value={value || ""}
                        onChange={(phoneValue) => onChange(phoneValue || "")}
                        className={`phone-input-wrapper ${errors.phone ? "phone-input-error" : ""}`}
                        numberInputProps={{
                          className: `phone-input ${
                            errors.phone ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-[#f9f871]"
                          }`,
                          placeholder: "Enter your phone number",
                        }}
                      />
                    )}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>}
                </div>

                {/* Country & Age */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="reg-country" className="block text-sm font-medium text-white/80 mb-2">
                      Country <span className="text-[#fc98ac]">*</span>
                    </label>
                    <input
                      type="text"
                      id="reg-country"
                      {...register("country", {
                        required: "Country is required",
                        setValueAs: (v) => v.trim(),
                        minLength: { value: 2, message: "At least 2 characters" },
                      })}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                        errors.country ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-[#f9f871]"
                      }`}
                      placeholder="Enter your country"
                    />
                    {errors.country && <p className="mt-1 text-sm text-red-400">{errors.country.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="reg-age" className="block text-sm font-medium text-white/80 mb-2">
                      Age <span className="text-[#fc98ac]">*</span>
                    </label>
                    <input
                      type="number"
                      id="reg-age"
                      min={10}
                      max={120}
                      {...register("age", {
                        required: "Age is required",
                        min: { value: 10, message: "Age must be at least 10" },
                        max: { value: 120, message: "Please enter a valid age" },
                      })}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                        errors.age ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-[#f9f871]"
                      }`}
                      placeholder="Enter your age"
                    />
                    {errors.age && <p className="mt-1 text-sm text-red-400">{errors.age.message}</p>}
                  </div>
                </div>

                {submitError && (
                  <div className="flex items-start gap-3 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-red-100" role="alert">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
                    <p className="text-sm">{submitError}</p>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#f9f871]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#3a225c]/30 border-t-[#3a225c] rounded-full animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      Secure My Spot
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Back link */}
          <div className="text-center mt-6">
            <Link href={`/events/${id}`} className="text-white/50 hover:text-white/80 text-sm transition-colors">
              ← Back to Event Details
            </Link>
          </div>
        </div>
      </section>

      {/* Phone input styles */}
      <style jsx global>{`
        .phone-input-wrapper { width: 100%; }
        .phone-input-wrapper .PhoneInput { display: flex; align-items: center; gap: 8px; }
        .phone-input-wrapper .PhoneInputInput {
          flex: 1; padding: 12px 16px;
          background-color: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px; color: white; font-size: 16px; outline: none; transition: all 0.2s;
        }
        .phone-input-wrapper .PhoneInputInput::placeholder { color: rgba(255,255,255,0.5); }
        .phone-input-wrapper .PhoneInputInput:focus { border-color: #f9f871; box-shadow: 0 0 0 2px rgba(249,248,113,0.2); }
        .phone-input-wrapper .PhoneInputCountry {
          padding: 12px; background-color: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; color: white;
        }
        .phone-input-wrapper .PhoneInputCountrySelect {
          background-color: rgba(58,34,92,0.95); color: white;
          border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 8px;
        }
        .phone-input-wrapper .PhoneInputCountrySelectArrow { opacity: 0.8; color: white; }
        .phone-input-error .PhoneInputInput { border-color: #ef4444; }
        .phone-input-error .PhoneInputInput:focus { border-color: #ef4444; box-shadow: 0 0 0 2px rgba(239,68,68,0.2); }
        .phone-input-error .PhoneInputCountry { border-color: #ef4444; }
      `}</style>

      <Footer />
    </main>
  );
}
