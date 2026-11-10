"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import { useForm } from "react-hook-form";
import { User, CheckCircle, ArrowRight, AlertCircle, Calendar, Clock, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { getEventsQuery } from "@/sanity/lib/queries";
import eventData from "@/lib/data/eventData.json";
import { Event } from "@/components/events/EventCard";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface FoundersTableFormData {
  name: string;
  sex: string;
  email: string;
  country: string;
  state: string;
  whatYouDo: string;
  expectations: string;
  category: string;
}

interface GenericFormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}

export default function EventRegisterPage({ params }: PageProps) {
  const { id } = use(params);

  const [event, setEvent] = useState<Event | null>(null);
  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isFoundersTable = id === "the-founders-table";

  /* ---- Founder's Table form ---- */
  const foundersForm = useForm<FoundersTableFormData>({
    defaultValues: {
      name: "",
      sex: "",
      email: "",
      country: "",
      state: "",
      whatYouDo: "",
      expectations: "",
      category: "",
    },
    mode: "onChange",
  });

  /* ---- Generic event form ---- */
  const genericForm = useForm<GenericFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
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

  /* ---- Submit handler for Founder's Table ---- */
  const onSubmitFounders = async (data: FoundersTableFormData) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "founders-table",
          name: data.name,
          sex: data.sex,
          email: data.email,
          country: data.country,
          state: data.state,
          whatYouDo: data.whatYouDo,
          expectations: data.expectations,
          category: data.category,
          eventId: event?.id,
          eventTitle: event?.title,
          eventDate: (event as any)?.displayDate || event?.date,
          eventTime: event?.time,
          eventEndTime: event?.endTime,
          eventVenue: event?.venue,
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.error || "Registration failed. Please try again.");
      }
      setIsSubmitted(true);
      foundersForm.reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---- Submit handler for generic events ---- */
  const onSubmitGeneric = async (data: GenericFormData) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "generic",
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          country: data.country,
          eventId: event?.id,
          eventTitle: event?.title,
          eventDate: (event as any)?.displayDate || event?.date,
          eventTime: event?.time,
          eventEndTime: event?.endTime,
          eventVenue: event?.venue,
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.error || "Registration failed. Please try again.");
      }
      setIsSubmitted(true);
      genericForm.reset();
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

  const whatsappLink = (event as any)?.whatsappGroup as string | undefined;
  const displayDate = (event as any)?.displayDate as string | undefined;

  /* ---- Success screen (shared) ---- */
  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
        <Navigation />
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2c144c] via-[#3a225c] to-[#5b1364]" />
          <div className="max-w-2xl mx-auto px-4 relative z-10">
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-white/10 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-20 h-20 bg-[#f9f871]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-[#f9f871]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">You&apos;re Registered! 🎉</h2>
              <p className="text-white/70 mb-2">
                Thank you for registering for{" "}
                <strong className="text-[#fc98ac]">{event!.title}</strong>.
              </p>
              <p className="text-white/60 text-sm mb-8">
                A confirmation email with event details has been sent to your inbox.
              </p>

              {whatsappLink && (
                <div className="mb-8 p-6 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                    <h3 className="text-white font-bold text-lg">Join Our WhatsApp Group</h3>
                  </div>
                  <p className="text-white/70 text-sm mb-4">
                    Stay updated with event details, reminders, and connect with fellow attendees.
                  </p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#1ebe5d] transition-colors shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Join WhatsApp Group →
                  </a>
                </div>
              )}

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
          </div>
        </section>
        <Footer />
      </main>
    );
  }

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
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-white/70 text-sm">
              {(displayDate || event!.date) && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#fc98ac]" />
                  {displayDate || formatDate(event!.date)}
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

            {isFoundersTable ? (
              /* ===== FOUNDER'S TABLE FORM ===== */
              <form onSubmit={foundersForm.handleSubmit(onSubmitFounders)} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="ft-name" className="block text-sm font-medium text-white/80 mb-2">
                    Full Name <span className="text-[#fc98ac]">*</span>
                  </label>
                  <input
                    type="text"
                    id="ft-name"
                    {...foundersForm.register("name", {
                      required: "Full name is required",
                      minLength: { value: 2, message: "At least 2 characters" },
                    })}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                      foundersForm.formState.errors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/20 focus:ring-[#f9f871]"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {foundersForm.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-400">{foundersForm.formState.errors.name.message}</p>
                  )}
                </div>

                {/* Sex */}
                <div>
                  <label htmlFor="ft-sex" className="block text-sm font-medium text-white/80 mb-2">
                    Sex <span className="text-[#fc98ac]">*</span>
                  </label>
                  <select
                    id="ft-sex"
                    {...foundersForm.register("sex", { required: "Please select your sex" })}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all appearance-none ${
                      foundersForm.formState.errors.sex
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/20 focus:ring-[#f9f871]"
                    }`}
                  >
                    <option value="" className="bg-[#3a225c]">Select…</option>
                    <option value="Male" className="bg-[#3a225c]">Male</option>
                    <option value="Female" className="bg-[#3a225c]">Female</option>
                    <option value="Prefer not to say" className="bg-[#3a225c]">Prefer not to say</option>
                  </select>
                  {foundersForm.formState.errors.sex && (
                    <p className="mt-1 text-sm text-red-400">{foundersForm.formState.errors.sex.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="ft-email" className="block text-sm font-medium text-white/80 mb-2">
                    Email Address <span className="text-[#fc98ac]">*</span>
                  </label>
                  <input
                    type="email"
                    id="ft-email"
                    {...foundersForm.register("email", {
                      required: "Email address is required",
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" },
                    })}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                      foundersForm.formState.errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/20 focus:ring-[#f9f871]"
                    }`}
                    placeholder="Enter your email address"
                  />
                  {foundersForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-400">{foundersForm.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Country & State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ft-country" className="block text-sm font-medium text-white/80 mb-2">
                      Country <span className="text-[#fc98ac]">*</span>
                    </label>
                    <input
                      type="text"
                      id="ft-country"
                      {...foundersForm.register("country", {
                        required: "Country is required",
                        minLength: { value: 2, message: "At least 2 characters" },
                      })}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                        foundersForm.formState.errors.country
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/20 focus:ring-[#f9f871]"
                      }`}
                      placeholder="Enter your country"
                    />
                    {foundersForm.formState.errors.country && (
                      <p className="mt-1 text-sm text-red-400">{foundersForm.formState.errors.country.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="ft-state" className="block text-sm font-medium text-white/80 mb-2">
                      State <span className="text-[#fc98ac]">*</span>
                    </label>
                    <input
                      type="text"
                      id="ft-state"
                      {...foundersForm.register("state", {
                        required: "State is required",
                        minLength: { value: 2, message: "At least 2 characters" },
                      })}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                        foundersForm.formState.errors.state
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/20 focus:ring-[#f9f871]"
                      }`}
                      placeholder="Enter your state"
                    />
                    {foundersForm.formState.errors.state && (
                      <p className="mt-1 text-sm text-red-400">{foundersForm.formState.errors.state.message}</p>
                    )}
                  </div>
                </div>

                {/* What do you do? */}
                <div>
                  <label htmlFor="ft-whatYouDo" className="block text-sm font-medium text-white/80 mb-2">
                    What do you do? <span className="text-[#fc98ac]">*</span>
                  </label>
                  <input
                    type="text"
                    id="ft-whatYouDo"
                    {...foundersForm.register("whatYouDo", {
                      required: "This field is required",
                      minLength: { value: 2, message: "At least 2 characters" },
                    })}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                      foundersForm.formState.errors.whatYouDo
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/20 focus:ring-[#f9f871]"
                    }`}
                    placeholder="e.g. Founder of a tech startup, Social media manager…"
                  />
                  {foundersForm.formState.errors.whatYouDo && (
                    <p className="mt-1 text-sm text-red-400">{foundersForm.formState.errors.whatYouDo.message}</p>
                  )}
                </div>

                {/* What are your expectations? */}
                <div>
                  <label htmlFor="ft-expectations" className="block text-sm font-medium text-white/80 mb-2">
                    What are your expectations? <span className="text-[#fc98ac]">*</span>
                  </label>
                  <textarea
                    id="ft-expectations"
                    rows={4}
                    {...foundersForm.register("expectations", {
                      required: "Please share your expectations",
                      minLength: { value: 10, message: "At least 10 characters" },
                    })}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all resize-none ${
                      foundersForm.formState.errors.expectations
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/20 focus:ring-[#f9f871]"
                    }`}
                    placeholder="Share what you hope to gain or achieve from The Founder's Table…"
                  />
                  {foundersForm.formState.errors.expectations && (
                    <p className="mt-1 text-sm text-red-400">{foundersForm.formState.errors.expectations.message}</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    Which of these categories do you fall into? <span className="text-[#fc98ac]">*</span>
                  </label>
                  <div className="space-y-3">
                    {[
                      "Career Professional",
                      "Social Impact Individual",
                      "Business Owner",
                      "Other",
                    ].map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          value={cat}
                          {...foundersForm.register("category", { required: "Please select a category" })}
                          className="w-4 h-4 accent-[#f9f871] cursor-pointer"
                        />
                        <span className="text-white/80 group-hover:text-white transition-colors">{cat}</span>
                      </label>
                    ))}
                  </div>
                  {foundersForm.formState.errors.category && (
                    <p className="mt-2 text-sm text-red-400">{foundersForm.formState.errors.category.message}</p>
                  )}
                </div>

                {submitError && (
                  <div className="flex items-start gap-3 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-red-100" role="alert">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
                    <p className="text-sm">{submitError}</p>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting || !foundersForm.formState.isValid}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#f9f871]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#3a225c]/30 border-t-[#3a225c] rounded-full animate-spin" />
                      Registering…
                    </>
                  ) : (
                    <>
                      Secure My Seat at The Founder&apos;s Table
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              /* ===== GENERIC EVENT FORM ===== */
              <form onSubmit={genericForm.handleSubmit(onSubmitGeneric)} className="space-y-5">
                {/* First & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="reg-firstName" className="block text-sm font-medium text-white/80 mb-2">
                      First Name <span className="text-[#fc98ac]">*</span>
                    </label>
                    <input
                      type="text"
                      id="reg-firstName"
                      {...genericForm.register("firstName", {
                        required: "First name is required",
                        minLength: { value: 2, message: "At least 2 characters" },
                      })}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                        genericForm.formState.errors.firstName ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-[#f9f871]"
                      }`}
                      placeholder="Enter your first name"
                    />
                    {genericForm.formState.errors.firstName && (
                      <p className="mt-1 text-sm text-red-400">{genericForm.formState.errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="reg-lastName" className="block text-sm font-medium text-white/80 mb-2">
                      Last Name <span className="text-[#fc98ac]">*</span>
                    </label>
                    <input
                      type="text"
                      id="reg-lastName"
                      {...genericForm.register("lastName", {
                        required: "Last name is required",
                        minLength: { value: 2, message: "At least 2 characters" },
                      })}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                        genericForm.formState.errors.lastName ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-[#f9f871]"
                      }`}
                      placeholder="Enter your last name"
                    />
                    {genericForm.formState.errors.lastName && (
                      <p className="mt-1 text-sm text-red-400">{genericForm.formState.errors.lastName.message}</p>
                    )}
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
                    {...genericForm.register("email", {
                      required: "Email address is required",
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" },
                    })}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                      genericForm.formState.errors.email ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-[#f9f871]"
                    }`}
                    placeholder="Enter your email address"
                  />
                  {genericForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-400">{genericForm.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="reg-country" className="block text-sm font-medium text-white/80 mb-2">
                    Country <span className="text-[#fc98ac]">*</span>
                  </label>
                  <input
                    type="text"
                    id="reg-country"
                    {...genericForm.register("country", {
                      required: "Country is required",
                      minLength: { value: 2, message: "At least 2 characters" },
                    })}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                      genericForm.formState.errors.country ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-[#f9f871]"
                    }`}
                    placeholder="Enter your country"
                  />
                  {genericForm.formState.errors.country && (
                    <p className="mt-1 text-sm text-red-400">{genericForm.formState.errors.country.message}</p>
                  )}
                </div>

                {submitError && (
                  <div className="flex items-start gap-3 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-red-100" role="alert">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
                    <p className="text-sm">{submitError}</p>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting || !genericForm.formState.isValid}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#f9f871]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#3a225c]/30 border-t-[#3a225c] rounded-full animate-spin" />
                      Registering…
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

      <Footer />
    </main>
  );
}
