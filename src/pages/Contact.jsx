import React, { useState, useEffect } from "react";
import { HiArrowRight, HiMail, HiPhone, HiLocationMarker, HiCheckCircle } from "react-icons/hi";

export default function Contact({ setNotification }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setNotification("Your message has been sent! We'll get back to you soon.");
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);

      // Reset success state after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <div className="bg-paper text-ink-2 min-h-screen relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700;900&display=swap');

        .glass-effect {
          background: rgba(14, 47, 40, 0.7);
          backdrop-filter: blur(20px) saturate(150%);
          border: 1px solid rgba(200, 162, 77, 0.2);
        }

        .glow-effect {
          box-shadow: 0 0 40px rgba(200, 162, 77, 0.3), inset 0 0 40px rgba(200, 162, 77, 0.1);
        }

        .neon-border {
          border: 2px solid #C8A24D;
          box-shadow: 0 0 20px rgba(200, 162, 77, 0.4), inset 0 0 20px rgba(200, 162, 77, 0.1);
        }

        .floating {
          animation: floating 6s ease-in-out infinite;
        }

        .floating-slow {
          animation: floating 8s ease-in-out infinite;
        }

        .floating-slower {
          animation: floating 10s ease-in-out infinite;
        }

        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .gradient-text {
          background: linear-gradient(135deg, #C8A24D 0%, #E6D8A3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .blur-in {
          animation: blur-in 0.8s ease-out forwards;
        }

        @keyframes blur-in {
          from {
            filter: blur(10px);
            opacity: 0;
          }
          to {
            filter: blur(0);
            opacity: 1;
          }
        }

        .reveal {
          animation: reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        }

        @keyframes reveal {
          0% {
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
        }

        .bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(40px);
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0);
          }
        }

        .stagger-item {
          animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
        }

        .form-input {
          position: relative;
          overflow: hidden;
        }

        .form-input::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(200, 162, 77, 0.1), transparent);
          transition: left 0.5s ease;
          pointer-events: none;
        }

        .form-input:focus::before {
          left: 100%;
        }

        .form-input input,
        .form-input textarea,
        .form-input select {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid rgba(200, 162, 77, 0.2);
          background: rgba(14, 47, 40, 0.5);
          border-radius: 0.5rem;
          color: #F6F4EE;
          font-family: inherit;
          transition: all 0.3s ease;
          resize: none;
        }

        .form-input input::placeholder,
        .form-input textarea::placeholder {
          color: rgba(159, 180, 173, 0.6);
        }

        .form-input input:focus,
        .form-input textarea:focus,
        .form-input select:focus {
          outline: none;
          border-color: #C8A24D;
          background: rgba(14, 47, 40, 0.8);
          box-shadow: 0 0 20px rgba(200, 162, 77, 0.3), inset 0 0 20px rgba(200, 162, 77, 0.1);
        }

        .success-animation {
          animation: success-pop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes success-pop {
          0% {
            opacity: 0;
            transform: scale(0.3) rotate(-180deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        .contact-card {
          transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .contact-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45);
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(200, 162, 77, 0.3); }
          50% { box-shadow: 0 0 40px rgba(200, 162, 77, 0.6); }
        }

        .fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* ===================== */}
      {/* ANIMATED BACKGROUND */}
      {/* ===================== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl floating"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div 
          className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl floating-slow delay-700"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-accent/3 blur-3xl floating-slower opacity-50"
          style={{ transform: `translate(calc(-50% + ${mousePos.x * 0.02}px), calc(-50% + ${mousePos.y * 0.02}px))` }}
        />
      </div>

      <div className="relative z-10">
        {/* ===================== */}
        {/* HEADER SECTION */}
        {/* ===================== */}
        <section className="px-6 lg:px-24 pt-20 pb-12 text-center">
          <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="eyebrow justify-center mb-6">Get in Touch</p>
            <h1 className="text-6xl lg:text-8xl font-display font-black leading-tight mb-8">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-xl text-ink-6 max-w-2xl mx-auto leading-relaxed">
              Have questions about our collections? Want to collaborate? We'd love to hear from you. Reach out anytime — we respond within 24 hours.
            </p>
          </div>
        </section>

        {/* ===================== */}
        {/* CONTACT INFO CARDS */}
        {/* ===================== */}
        <section className="px-6 lg:px-24 py-16 border-t border-line">
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              {
                icon: HiMail,
                title: "Email",
                content: "hello@reinsincere.com",
                subtext: "24-hour response"
              },
              {
                icon: HiPhone,
                title: "Phone",
                content: "+1 (555) 123-4567",
                subtext: "Mon-Fri, 9AM-5PM EST"
              },
              {
                icon: HiLocationMarker,
                title: "Location",
                content: "New York, USA",
                subtext: "Global shipping available"
              }
            ].map((info, idx) => {
              const Icon = info.icon;
              return (
                <div
                  key={idx}
                  className="stagger-item glass-effect p-8 rounded-lgx border border-line hover:border-accent contact-card group"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-full bg-accent/20 group-hover:bg-accent/40 transition-all">
                      <Icon className="text-accent text-2xl" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{info.title}</h3>
                  <p className="text-accent font-semibold mb-1">{info.content}</p>
                  <p className="text-sm text-ink-6">{info.subtext}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===================== */}
        {/* CONTACT FORM SECTION */}
        {/* ===================== */}
        <section className="px-6 lg:px-24 py-16 border-t border-line">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="eyebrow justify-center mb-4">Send us a Message</p>
              <h2 className="text-5xl font-display font-bold mb-6 reveal">We're Listening</h2>
            </div>

            <div className="glass-effect rounded-lgx p-12 border border-line neon-border relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl floating" />

              {isSubmitted ? (
                <div className="relative z-10 text-center py-12 success-animation">
                  <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
                      <HiCheckCircle className="text-accent text-5xl" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-3">Message Sent!</h3>
                  <p className="text-ink-6 mb-6">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-accent font-semibold hover:text-accent-soft transition flex items-center gap-2 mx-auto"
                  >
                    Send Another Message
                    <HiArrowRight />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-input">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="form-input">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="form-input">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Subject"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="form-input">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      rows="6"
                      placeholder="Tell us what's on your mind..."
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-md font-bold text-lg flex items-center justify-center gap-2 transition-all neon-border group ${
                      isSubmitting
                        ? "bg-accent/50 text-paper/50 cursor-not-allowed"
                        : "btn hover:shadow-2xl"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-transparent border-t-paper rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <HiArrowRight className="group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Privacy Note */}
                  <p className="text-xs text-ink-6 text-center pt-2">
                    We respect your privacy. Your information will only be used to respond to your inquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ===================== */}
        {/* FAQ SECTION */}
        {/* ===================== */}
        <section className="px-6 lg:px-24 py-20 border-t border-line">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="eyebrow justify-center mb-4">Help Center</p>
              <h2 className="text-5xl font-display font-bold mb-6 reveal">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "What's your shipping policy?",
                  a: "We offer free shipping on orders over $100. Standard shipping takes 3-5 business days, while express shipping is available for 1-2 day delivery."
                },
                {
                  q: "Do you accept returns?",
                  a: "Yes! We offer 30-day returns on all items in original condition. Simply initiate a return through your account dashboard."
                },
                {
                  q: "Are your products sustainable?",
                  a: "We're committed to sustainability through small-batch production, eco-friendly materials, and ethical sourcing practices."
                },
                {
                  q: "How can I track my order?",
                  a: "You'll receive a tracking number via email once your order ships. You can track it in real-time through our website."
                }
              ].map((faq, idx) => (
                <details
                  key={idx}
                  className="stagger-item group glass-effect rounded-mdx border border-line p-6 cursor-pointer hover:border-accent transition-all"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <summary className="flex items-center justify-between font-bold text-lg">
                    <span>{faq.q}</span>
                    <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-ink-6 mt-4 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== */}
        {/* RESPONSE TIME STATS */}
        {/* ===================== */}
        <section className="px-6 lg:px-24 py-16 border-t border-line">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { value: "24h", label: "Average Response Time" },
              { value: "98%", label: "Customer Satisfaction" },
              { value: "50K+", label: "Happy Customers" }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="glass-effect p-8 rounded-mdx border border-line text-center stagger-item hover:border-accent transition-all"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <p className="text-4xl font-black gradient-text mb-2">{stat.value}</p>
                <p className="text-sm text-ink-6">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== */}
        {/* CLOSING CTA */}
        {/* ===================== */}
        <section className="px-6 lg:px-24 py-20 text-center border-t border-line">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-5xl font-display font-bold mb-6">
              Ready to get in <span className="gradient-text">touch?</span>
            </h2>
            <p className="text-lg text-ink-6 mb-8">
              Scroll up to send us a message or reach out through any of our contact channels. We're always excited to connect with our community.
            </p>
            <a href="#" className="btn px-10 py-4 inline-flex items-center gap-2 neon-border group bounce-in">
              Back to Form
              <HiArrowRight className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}