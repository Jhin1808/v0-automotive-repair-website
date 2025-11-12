"use client"

import { useState } from "react"

type BookingData = {
  service: string | null
  servicePrice: number
  date: string | null
  time: string | null
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  make: string
  model: string
  year: string
  mileage: string
  issues: string
}

const MOBILE_FEE = 35

const SERVICES = [
  {
    id: "oil-change",
    name: "Oil Change",
    desc: "Premium oil and filter service with basic inspection.",
    price: 80,
  },
  {
    id: "brake-service",
    name: "Brake Service",
    desc: "Pads, rotors, and brake inspection for safe stopping.",
    price: 150,
  },
  {
    id: "suspension",
    name: "Suspension Repair",
    desc: "Struts, shocks, and suspension components.",
    price: 200,
  },
  {
    id: "tune-up",
    name: "Tune-Up",
    desc: "Spark plugs, filters, and performance check.",
    price: 120,
  },
  {
    id: "electrical",
    name: "Electrical System",
    desc: "Battery, alternator, starter, and wiring diagnostics.",
    price: 140,
  },
  {
    id: "diagnostics",
    name: "Diagnostics",
    desc: "Check engine light and full system scan.",
    price: 90,
  },
]

const TIME_SLOTS = [
  "9:00–11:00 AM",
  "11:00–1:00 PM",
  "1:00–3:00 PM",
  "3:00–5:00 PM",
  "After 5 PM (flexible)",
]

const MAKES = [
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "Nissan",
  "Subaru",
  "Hyundai",
  "Kia",
  "Volkswagen",
  "Other",
]

export function Contact() {
  const [step, setStep] = useState(1)
  const [booking, setBooking] = useState<BookingData>({
    service: null,
    servicePrice: 0,
    date: null,
    time: null,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
    issues: "",
  })

  const total = (booking.servicePrice || 0) + MOBILE_FEE
  const totalSteps = 4
  const progressPercent = (step / totalSteps) * 100

  function update<K extends keyof BookingData>(key: K, value: BookingData[K]) {
    setBooking((prev) => ({ ...prev, [key]: value }))
  }

  function handleSelectService(id: string, price: number) {
    update("service", id)
    update("servicePrice", price)
  }

  function validateStep(targetStep: number): boolean {
    // validate the step we are *leaving* when we go “Next”
    const current = step
    if (targetStep <= current) return true

    switch (current) {
      case 1: {
        if (!booking.service) {
          alert("Please select a service before continuing.")
          return false
        }
        return true
      }
      case 2: {
        if (!booking.date || !booking.time) {
          alert("Please select a date and time window.")
          return false
        }
        return true
      }
      case 3: {
        const required = [
          ["firstName", booking.firstName],
          ["lastName", booking.lastName],
          ["phone", booking.phone],
          ["email", booking.email],
          ["address", booking.address],
        ] as const

        for (const [label, value] of required) {
          if (!value.trim()) {
            alert(`Please fill in your ${label}.`)
            return false
          }
        }
        return true
      }
      default:
        return true
    }
  }

  function goToStep(target: number) {
    if (target < 1 || target > totalSteps) return
    if (!validateStep(target)) return
    setStep(target)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Only validate final step; if ok, let the browser POST to /api/booking
    if (!validateStep(step) || step !== totalSteps) {
      e.preventDefault()
      if (step !== totalSteps) {
        alert("Please review and confirm your booking before submitting.")
      }
    }
  }

  const selectedService = SERVICES.find((s) => s.id === booking.service)

  return (
    <section id="contact" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
          {/* Left: explainer */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
              Schedule Service
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Book your mobile mechanic in four quick steps.
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Choose what you need, pick a time, share where your vehicle is, and tell
              us about your car. We&apos;ll follow up with confirmation and final
              pricing.
            </p>

            <div className="mt-5 grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">
                  Emergency / same-day?
                </h3>
                <p className="mt-2 text-xs text-slate-500">
                  For urgent issues or a no-start situation, call or text directly.
                </p>
                <a
                  href="tel:+12069229753"
                  className="mt-3 inline-flex text-sm font-semibold text-orange-600 hover:text-orange-700"
                >
                  (206) 922-9753
                </a>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">
                  Service area & hours
                </h3>
                <p className="mt-2 text-xs text-slate-500">
                  Seattle, Burien, Kent & nearby. Flexible evenings and weekends,
                  weather permitting.
                </p>
              </div>
            </div>
          </div>

          {/* Right: multi-step form card */}
          <div className="rounded-3xl bg-white p-6 shadow-md">
            {/* Progress header */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                <span>Step {step} of {totalSteps}</span>
                <span>
                  {Math.round(progressPercent)}% complete
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2 text-[0.65rem] font-semibold uppercase tracking-wide">
                {["Service", "Date & Time", "Contact Info", "Vehicle & Review"].map(
                  (label, idx) => {
                    const stepNumber = idx + 1
                    const isActive = stepNumber === step
                    const isCompleted = stepNumber < step
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => goToStep(stepNumber)}
                        className={
                          "flex items-center justify-center rounded-full px-2 py-1 transition " +
                          (isActive
                            ? "bg-orange-500 text-white"
                            : isCompleted
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-500")
                        }
                      >
                        {stepNumber}. {label}
                      </button>
                    )
                  }
                )}
              </div>
            </div>

            <form
              method="POST"
              action="/api/booking"
              onSubmit={handleSubmit}
              className="space-y-6 text-sm"
            >
              {/* Hidden fields to make sure API receives key values */}
              <input
                type="hidden"
                name="service"
                value={booking.service ?? ""}
              />
              <input
                type="hidden"
                name="servicePrice"
                value={booking.servicePrice || 0}
              />
              <input
                type="hidden"
                name="date"
                value={booking.date ?? ""}
              />
              <input
                type="hidden"
                name="time"
                value={booking.time ?? ""}
              />
              <input
                type="hidden"
                name="mobileFee"
                value={MOBILE_FEE}
              />
              <input
                type="hidden"
                name="totalEstimate"
                value={total}
              />

              {/* STEP 1 – SERVICE */}
              {step === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Step 1: Select your service
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Pick the option that best matches what you need. You can describe
                    details later.
                  </p>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {SERVICES.map((service) => {
                      const selected = booking.service === service.id
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() =>
                            handleSelectService(service.id, service.price)
                          }
                          className={
                            "flex flex-col rounded-2xl border p-4 text-left transition hover:border-orange-400 hover:shadow-sm " +
                            (selected
                              ? "border-orange-500 bg-orange-50"
                              : "border-slate-200 bg-white")
                          }
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-900">
                              {service.name}
                            </span>
                            <span className="text-sm font-bold text-orange-600">
                              ${service.price}+
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-600">
                            {service.desc}
                          </p>
                          {selected && (
                            <span className="mt-2 inline-flex w-fit rounded-full bg-orange-500/10 px-2 py-0.5 text-[0.65rem] font-semibold text-orange-600">
                              Selected
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      Mobile service fee: ${MOBILE_FEE} (applied once per visit)
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      className="rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-orange-600"
                    >
                      Next: Date &amp; Time
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 – DATE & TIME */}
              {step === 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Step 2: Choose date &amp; time
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Pick a preferred day and time window. We&apos;ll confirm exact
                    availability.
                  </p>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">
                        Preferred date *
                      </label>
                      <input
                        type="date"
                        name="preferredDateDisplay"
                        value={booking.date ?? ""}
                        onChange={(e) => update("date", e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">
                        Time window *
                      </label>
                      <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {TIME_SLOTS.map((slot) => {
                          const selected = booking.time === slot
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => update("time", slot)}
                              className={
                                "rounded-full border px-3 py-2 text-xs font-medium transition " +
                                (selected
                                  ? "border-orange-500 bg-orange-50 text-orange-700"
                                  : "border-slate-200 bg-white text-slate-700 hover:border-orange-400")
                              }
                            >
                              {slot}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => goToStep(3)}
                      className="rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-orange-600"
                    >
                      Next: Contact Info
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 – CONTACT INFO */}
              {step === 3 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Step 3: Your contact info &amp; address
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    We&apos;ll use this to confirm your appointment and send updates.
                  </p>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">
                        First name *
                      </label>
                      <input
                        name="firstName"
                        type="text"
                        value={booking.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">
                        Last name *
                      </label>
                      <input
                        name="lastName"
                        type="text"
                        value={booking.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">
                        Phone number *
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={booking.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="(206) 123-4567"
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">
                        Email address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={booking.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700">
                        Service address *
                      </label>
                      <input
                        name="address"
                        type="text"
                        value={booking.address}
                        onChange={(e) => update("address", e.target.value)}
                        placeholder="123 Main St, Seattle, WA"
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => goToStep(4)}
                      className="rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-orange-600"
                    >
                      Next: Vehicle &amp; Review
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4 – VEHICLE DETAILS + REVIEW */}
              {step === 4 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Step 4: Vehicle details &amp; confirm booking
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Share your vehicle info and review your request before sending.
                    </p>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                    {/* Vehicle fields */}
                    <div className="space-y-3">
                      <div className="grid gap-3 md:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700">
                            Vehicle make *
                          </label>
                          <select
                            name="make"
                            value={booking.make}
                            onChange={(e) => update("make", e.target.value)}
                            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            required
                          >
                            <option value="">Select make</option>
                            {MAKES.map((m) => (
                              <option key={m} value={m.toLowerCase()}>
                                {m}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700">
                            Vehicle model *
                          </label>
                          <input
                            name="model"
                            type="text"
                            value={booking.model}
                            onChange={(e) => update("model", e.target.value)}
                            placeholder="e.g., Camry"
                            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700">
                            Year *
                          </label>
                          <input
                            name="year"
                            type="number"
                            value={booking.year}
                            onChange={(e) => update("year", e.target.value)}
                            placeholder="2020"
                            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700">
                            Mileage (approx.)
                          </label>
                          <input
                            name="mileage"
                            type="number"
                            value={booking.mileage}
                            onChange={(e) => update("mileage", e.target.value)}
                            placeholder="50000"
                            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700">
                          Vehicle issues / description
                        </label>
                        <textarea
                          name="issues"
                          rows={4}
                          value={booking.issues}
                          onChange={(e) => update("issues", e.target.value)}
                          placeholder="Describe any noises, warning lights, or recent work. The more detail, the better."
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    {/* Sidebar summary */}
                    <aside className="space-y-4 rounded-2xl bg-slate-50 p-4 text-xs text-slate-700">
                      <h4 className="text-sm font-semibold text-slate-900">
                        Request summary
                      </h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Service</span>
                          <span className="font-medium text-slate-900">
                            {selectedService ? selectedService.name : "-"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Date</span>
                          <span className="font-medium text-slate-900">
                            {booking.date || "-"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Time window</span>
                          <span className="font-medium text-slate-900">
                            {booking.time || "-"}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2">
                          <span className="text-slate-500">Service estimate</span>
                          <span className="font-medium text-slate-900">
                            {booking.servicePrice ? `$${booking.servicePrice}+` : "-"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Mobile fee</span>
                          <span className="font-medium text-slate-900">
                            ${MOBILE_FEE}
                          </span>
                        </div>
                        <div className="mt-2 border-t border-slate-200 pt-2 flex justify-between text-sm font-semibold">
                          <span>Estimated total</span>
                          <span className="text-orange-600">
                            {booking.service
                              ? `$${total}+`
                              : "-"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                        <p className="text-[0.7rem] font-semibold text-yellow-800">
                          Important notes:
                        </p>
                        <ul className="mt-1 space-y-1 text-[0.7rem] text-yellow-800">
                          <li>• Please ensure the vehicle is accessible at the scheduled time.</li>
                          <li>• Final pricing may vary based on diagnosis and parts.</li>
                          <li>• You&apos;ll receive a confirmation message with details.</li>
                        </ul>
                      </div>
                    </aside>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => goToStep(3)}
                      className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-orange-500 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-600"
                    >
                      Confirm booking
                    </button>
                  </div>
                </div>
              )}

              <p className="pt-1 text-[0.65rem] text-slate-500">
                By submitting, you agree to be contacted about your appointment by
                phone, text, or email. No spam — ever.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
