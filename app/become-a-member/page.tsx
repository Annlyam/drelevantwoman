"use client";

import Footer from "@/components/shared/Footer";
import Navigation from "@/components/shared/Navigation";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { User, CheckCircle, ArrowRight, AlertCircle } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
}

export default function BecomeAMember() {
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
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error ||
            result?.message ||
            "We could not submit your membership application right now."
        );
      }

      setIsSubmitted(true);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not submit your membership application right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const startAnotherApplication = () => {
    setIsSubmitted(false);
    setSubmitError("");
  };

  return (
    <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2c144c] via-[#3a225c] to-[#5b1364]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Become a <span className="text-[#f9f871]">Member</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Join our community of empowered women. Fill out the form below to
              become a member and unlock exclusive benefits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 md:py-20 bg-[#3a225c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Your Information
              </h2>
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
                <h3 className="text-2xl font-bold text-white mb-2">
                  Application Submitted!
                </h3>
                <p className="text-white/70">
                  Thank you for your interest in becoming a member. We&apos;ll
                  review your application and get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={startAnotherApplication}
                  className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#f9f871]/90 transition-colors"
                >
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-white/80 mb-2"
                    >
                      First Name <span className="text-[#fc98ac]">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      {...register("firstName", {
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "First name must be at least 2 characters",
                        },
                        validate: (value) =>
                          value.trim().length >= 2 ||
                          "First name must be at least 2 characters",
                      })}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                        errors.firstName
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/20 focus:ring-[#f9f871]"
                      }`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-white/80 mb-2"
                    >
                      Last Name <span className="text-[#fc98ac]">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      {...register("lastName", {
                        required: "Last name is required",
                        minLength: {
                          value: 2,
                          message: "Last name must be at least 2 characters",
                        },
                        validate: (value) =>
                          value.trim().length >= 2 ||
                          "Last name must be at least 2 characters",
                      })}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                        errors.lastName
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/20 focus:ring-[#f9f871]"
                      }`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Email Address <span className="text-[#fc98ac]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email address is required",
                      setValueAs: (value) => value.trim(),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/20 focus:ring-[#f9f871]"
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Phone Number <span className="text-[#fc98ac]">*</span>
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: "Phone number is required",
                      validate: (value) => {
                        if (!value) return "Phone number is required";
                        return (
                          isValidPhoneNumber(value) ||
                          "Please enter a valid phone number"
                        );
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <PhoneInput
                        international
                        defaultCountry="NG"
                        value={value || ""}
                        onChange={(phoneValue) => {
                          onChange(phoneValue || "");
                        }}
                        className={`phone-input-wrapper ${
                          errors.phone ? "phone-input-error" : ""
                        }`}
                        numberInputProps={{
                          className: `phone-input ${
                            errors.phone
                              ? "border-red-500 focus:ring-red-500"
                              : "border-white/20 focus:ring-[#f9f871]"
                          }`,
                          placeholder: "Enter your phone number",
                        }}
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.phone.message}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-white/60">
                    Select your country and enter your phone number
                  </p>
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Country <span className="text-[#fc98ac]">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    {...register("country", {
                      required: "Country is required",
                      setValueAs: (value) => value.trim(),
                      minLength: {
                        value: 2,
                        message: "Country must be at least 2 characters",
                      },
                    })}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                      errors.country
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/20 focus:ring-[#f9f871]"
                    }`}
                    placeholder="Enter your country"
                  />
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                {submitError && (
                  <div
                    className="flex items-start gap-3 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-red-100"
                    role="alert"
                  >
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
                    <p className="text-sm">{submitError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#f9f871]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#3a225c]/30 border-t-[#3a225c] rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Custom styles for phone input */}
          <style jsx global>{`
            .phone-input-wrapper {
              width: 100%;
            }

            .phone-input-wrapper .PhoneInput {
              display: flex;
              align-items: center;
              gap: 8px;
            }

            .phone-input-wrapper .PhoneInputInput {
              flex: 1;
              padding: 12px 16px;
              background-color: rgba(255, 255, 255, 0.1);
              border: 1px solid rgba(255, 255, 255, 0.2);
              border-radius: 8px;
              color: white;
              font-size: 16px;
              outline: none;
              transition: all 0.2s;
            }

            .phone-input-wrapper .PhoneInputInput::placeholder {
              color: rgba(255, 255, 255, 0.5);
            }

            .phone-input-wrapper .PhoneInputInput:focus {
              border-color: #f9f871;
              box-shadow: 0 0 0 2px rgba(249, 248, 113, 0.2);
            }

            .phone-input-wrapper .PhoneInputCountry {
              padding: 12px;
              background-color: rgba(255, 255, 255, 0.1);
              border: 1px solid rgba(255, 255, 255, 0.2);
              border-radius: 8px;
              color: white;
            }

            .phone-input-wrapper .PhoneInputCountryIcon {
              width: 20px;
              height: 15px;
              border-radius: 2px;
            }

            .phone-input-wrapper .PhoneInputCountrySelect {
              background-color: rgba(58, 34, 92, 0.95);
              color: white;
              border: 1px solid rgba(255, 255, 255, 0.2);
              border-radius: 8px;
              padding: 8px;
            }

            .phone-input-wrapper .PhoneInputCountrySelectArrow {
              opacity: 0.8;
              color: white;
            }

            .phone-input-error .PhoneInputInput {
              border-color: #ef4444;
            }

            .phone-input-error .PhoneInputInput:focus {
              border-color: #ef4444;
              box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
            }

            .phone-input-error .PhoneInputCountry {
              border-color: #ef4444;
            }
          `}</style>
        </div>
      </section>

      <Footer />
    </main>
  );
}
