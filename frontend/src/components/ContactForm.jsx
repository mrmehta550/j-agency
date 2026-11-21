import React, { useState } from 'react';
import { api } from '../api/client';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    state: '',
    country: '',
    city: '',
    service: 'Website Development',
    budget: 'Under ₹25,000',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setToast(null);
    const res = await api.submitContact(formData);
    setIsSubmitting(false);
    if (res.ok && res.data?.success) {
      setToast({ type: 'success', title: 'Success', message: res.data.message || 'Message sent.' });
      setFormData({
        full_name: '', email: '', phone: '', company: '', state: '', country: '', city: '',
        service: 'Website Development', budget: 'Under ₹25,000', message: '',
      });
    } else {
      let errMsg = res.data?.message || 'Please correct errors.';
      if (res.data?.errors) {
        const list = Object.entries(res.data.errors)
          .map(([f, e]) => `${f.replace('_', ' ').toUpperCase()}: ${Array.isArray(e) ? e.join(', ') : e}`)
          .join(' | ');
        errMsg = `${errMsg} (${list})`;
      }
      setToast({ type: res.status === 429 ? 'warning' : 'error', title: res.status === 429 ? 'Warning' : 'Error', message: errMsg });
    }
    setTimeout(() => setToast(null), 6000);
  };

  return (
    <div className="contact-form-card">
      {toast && (
        <div className="contact-toast-container" style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 999999 }}>
          <div className={`contact-toast contact-toast--${toast.type}`} role="alert" aria-live="polite">
            <div className="contact-toast-icon">
              {toast.type === 'success' && <i className="fa-solid fa-circle-check"></i>}
              {toast.type === 'error' && <i className="fa-solid fa-circle-exclamation"></i>}
              {toast.type === 'warning' && <i className="fa-solid fa-triangle-exclamation"></i>}
            </div>
            <div className="contact-toast-content">
              <span className="contact-toast-title">{toast.title}</span>
              <p className="contact-toast-msg">{toast.message}</p>
            </div>
            <button type="button" className="contact-toast-close" aria-label="Close" onClick={() => setToast(null)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="contact-toast-progress"></div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} id="contactForm">
        <div className="contact-input-grid">
          <div className="contact-input-group"><label>State</label><input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required /></div>
          <div className="contact-input-group"><label>Country</label><input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required /></div>
          <div className="contact-input-group"><label>City</label><input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required /></div>
          <div className="contact-input-group"><label>Full Name</label><input type="text" name="full_name" placeholder="Enter your full name" value={formData.full_name} onChange={handleChange} required /></div>
          <div className="contact-input-group"><label>Email Address</label><input type="email" name="email" placeholder="example@gmail.com" value={formData.email} onChange={handleChange} required /></div>
        </div>
        <div className="contact-input-grid">
          <div className="contact-input-group"><label>Phone Number</label><input type="text" name="phone" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} required /></div>
          <div className="contact-input-group"><label>Company Name</label><input type="text" name="company" placeholder="Your Company" value={formData.company} onChange={handleChange} /></div>
          <div className="contact-input-group"><label>Select Service</label><select name="service" value={formData.service} onChange={handleChange} required>
            <option value="Website Development">Website Development</option>
            <option value="AI Automation">AI Automation</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="UI / UX Design">UI / UX Design</option>
            <option value="SEO Optimization">SEO Optimization</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Cloud Solutions">Cloud Solutions</option>
            <option value="E-Commerce Development">E-Commerce Development</option>
          </select></div>
          <div className="contact-input-group"><label>Estimated Budget</label><select name="budget" value={formData.budget} onChange={handleChange} required>
            <option value="Under ₹25,000">Under ₹25,000</option>
            <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
            <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
            <option value="Above ₹1,00,000">Above ₹1,00,000</option>
          </select></div>
          <div className="contact-input-group"><label>Project Details</label><textarea rows="6" name="message" placeholder="Tell us about your project..." value={formData.message} onChange={handleChange} required></textarea></div>
        </div>
        <button type="submit" className={`contact-submit-btn ${isSubmitting ? 'is-loading' : ''}`} disabled={isSubmitting}>
          {isSubmitting ? (<><span className="contact-spinner" aria-hidden="true"></span><span>Sending…</span></>) : 'Send Message →'}
        </button>
      </form>
    </div>
  );
}
