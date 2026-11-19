import React, { useState } from 'react';
import { api } from '../api/client';

// Options must match backend choices
const SERVICE_OPTIONS = [
  'Website Development',
  'AI Automation',
  'Mobile App Development',
  'UI / UX Design',
  'SEO Optimization',
  'Digital Marketing',
  'Cloud Solutions',
  'E-Commerce Development',
];

const BUDGET_OPTIONS = [
  'Under ₹25,000',
  '₹25,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  'Above ₹1,00,000',
];

export default function ContactForm() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    state: '',
    country: '',
    city: '',
    message: '',
  });

  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });
    try {
      const { ok, error } = await api.submitContact(form);
      if (!ok) throw new Error(error || 'Submission failed');
      setStatus({ submitting: false, success: true, error: null });
      // Reset form fields
      setForm({
        full_name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        state: '',
        country: '',
        city: '',
        message: '',
      });
    } catch (err) {
      setStatus({ submitting: false, success: false, error: err.message });
    }
  };

  return (
    <section id="contact" className="py-12 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        {status.success && (
          <div className="rounded-md bg-green-50 p-4 mb-6 text-center">
            <p className="text-sm font-medium text-green-800">
              🎉 Your request has been submitted successfully!
            </p>
          </div>
        )}
        {status.error && (
          <div className="rounded-md bg-red-50 p-4 mb-6 text-center">
            <p className="text-sm text-red-700">{status.error}</p>
          </div>
        )}
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
              Full name *
            </label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              required
              value={form.full_name}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />
          </div>
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone *
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />
          </div>
          {/* Company (optional) */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company (optional)
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={form.company}
              onChange={handleChange}
              placeholder="Acme Corp."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />
          </div>
          {/* Service */}
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">
              Service *
            </label>
            <select
              id="service"
              name="service"
              required
              value={form.service}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            >
              <option value="">— Select a service —</option>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          {/* Budget */}
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
              Estimated budget *
            </label>
            <select
              id="budget"
              name="budget"
              required
              value={form.budget}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            >
              <option value="">— Select a budget —</option>
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          {/* State (optional) */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State (optional)
            </label>
            <input
              id="state"
              name="state"
              type="text"
              value={form.state}
              onChange={handleChange}
              placeholder="Maharashtra"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />
          </div>
          {/* Country (optional) */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country (optional)
            </label>
            <input
              id="country"
              name="country"
              type="text"
              value={form.country}
              onChange={handleChange}
              placeholder="India"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />
          </div>
          {/* City (optional) */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City (optional)
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              placeholder="Mumbai"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />
          </div>
          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Project description *
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />
          </div>
          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={status.submitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {status.submitting ? 'Sending…' : 'Send Request'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
