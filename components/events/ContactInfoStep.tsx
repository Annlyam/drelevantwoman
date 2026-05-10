"use client";

import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { User, ArrowLeft, ArrowRight } from "lucide-react";
import { Event } from "./EventCard";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
};

interface ContactInfoStepProps {
  event: Event;
  formData: FormDataType;
  onFormDataChange: (data: FormDataType) => void;
  onPrevious: () => void;
  onSubmit: (data: FormDataType) => void;
  total: number;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
}

export default function ContactInfoStep({
  event,
  formData: initialFormData,
  onFormDataChange,
  onPrevious,
  onSubmit,
  total,
}: ContactInfoStepProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      ...initialFormData,
      phone: initialFormData.phone || "",
    },
    mode: "onChange",
  });

  const watchedData = watch();

  // Update parent component when form data changes
  const handleFormChange = (data: FormData) => {
    // Convert FormData to match the expected format
    const formattedData: FormDataType = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || "",
      countryCode: data.countryCode || "+234",
    };
    onFormDataChange(formattedData);
  };

  const onFormSubmit = (data: FormData) => {
    handleFormChange(data);
    // Convert FormData to match the expected format for onSubmit
    const formattedData: FormDataType = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || "",
      countryCode: data.countryCode || "+234",
    };
    onSubmit(formattedData);
  };

  const totalDisplay =
    total === 0 ? "FREE" : `${event.currency}${total.toLocaleString()}.00`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl py-6 px-4 md:p-8 border border-white/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-[#fc98ac] flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Your Information
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        onChange={() => handleFormChange(watchedData)}
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
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
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
                // Basic validation - react-phone-number-input handles format validation
                return true;
              },
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                international
                defaultCountry="NG"
                value={value || ""}
                onChange={(phoneValue) => {
                  onChange(phoneValue || "");
                  // Update form data immediately
                  const updatedData = {
                    ...watchedData,
                    phone: phoneValue || "",
                  };
                  handleFormChange(updatedData as FormData);
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
            <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
          )}
          <p className="mt-1 text-sm text-white/60">
            Select your country and enter your phone number
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="button"
            onClick={onPrevious}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#f9f871] text-[#3a225c] font-bold rounded-lg hover:bg-[#f9f871]/90 transition-colors"
          >
            Secure a Slot {totalDisplay !== "FREE" && totalDisplay}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </form>

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
    </motion.div>
  );
}
