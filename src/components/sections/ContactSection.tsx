import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from '../AnimatedBackground';
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    const social = socialRef.current;

    if (!section || !title || !form || !social) return;

    // Ensure sections are visible by default
    gsap.set(section, { opacity: 1, y: 0, filter: 'blur(0px)' });
    gsap.set(title, { opacity: 1, y: 0 });
    gsap.set(form.children, { opacity: 1, x: 0 });
    gsap.set(social, { opacity: 1, y: 0 });

    // Check if section is already in viewport - if not, hide and animate
    const rect = section.getBoundingClientRect();
    const isBelowViewport = rect.top > window.innerHeight * 0.5;

    if (isBelowViewport) {
      // Only animate if section is below viewport
      gsap.set(section, { opacity: 0, y: 60, filter: 'blur(10px)' });
      gsap.set(title, { opacity: 0, y: 50 });
      gsap.set(form.children, { opacity: 0, x: -50 });
      gsap.set(social, { opacity: 0, y: 50 });
    }

    // ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(section, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out'
    })
      .to(title, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.8')
      // Inputs fade from left
      .to(form.children, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      }, '-=0.6')
      .to(social, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.4');

    // Fallback: ensure section is visible after 2 seconds if ScrollTrigger didn't fire
    const fallbackTimeout = setTimeout(() => {
      if (section && window.getComputedStyle(section).opacity === '0') {
        gsap.to([section, title, form.children, social], {
          opacity: 1,
          y: 0,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out'
        });
      }
    }, 2000);

    return () => {
      clearTimeout(fallbackTimeout);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear any previous status messages when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  // API configuration
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

  // Submit form data to backend API
  const submitToAPI = async (data: typeof formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/leads/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          description: data.message,
          source: 'website'
        })
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: result.message || 'Thank you for your inquiry! We will contact you soon.',
          leadId: result.lead_id
        };
      } else {
        return {
          success: false,
          message: result.message || 'Please check your form data.',
          errors: result.errors || []
        };
      }
    } catch (error) {
      console.error('Network error:', error);
      return {
        success: false,
        message: 'Network error. Please try again later.',
        errors: []
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) return;

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    // Animate button
    const submitButton = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (submitButton) {
      gsap.to(submitButton, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }

    try {
      // Submit to backend API
      const result = await submitToAPI(formData);

      if (result.success) {
        // Success - show success message and reset form
        setSubmitStatus({
          type: 'success',
          message: result.message
        });

        // Reset form
        setFormData({ name: '', email: '', message: '' });

        // Optional: Log successful submission
        console.log('✅ Lead submitted successfully:', result.leadId);

      } else {
        // Error - show error message
        setSubmitStatus({
          type: 'error',
          message: result.message
        });

        // Log errors for debugging
        if (result.errors && result.errors.length > 0) {
          console.error('Validation errors:', result.errors);
        }
      }
    } catch (error) {
      // Unexpected error
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-dark min-h-screen flex items-center px-4 md:px-8 lg:px-16 py-12 md:py-20 relative overflow-hidden snap-start"
    >
      <AnimatedBackground variant="dark" />

      <div className="max-w-md md:max-w-4xl lg:max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-space font-bold text-dark-fg mb-4 md:mb-6">
            LET'S <span className="bg-gradient-to-r from-pink-300 via-purple-400 to-purple-500
              text-transparent bg-clip-text">CONNECT</span>
          </h2>
          <p className="text-base md:text-lg font-space font-light text-white max-w-2xl mx-auto">
            Ready to transform your digital presence? Let's discuss how we can help you dominate your market.
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
          {/* Contact Form */}
          <div ref={formRef} className="glass p-4 md:p-7">
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6" encType="multipart/form-data">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="YOUR NAME"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500/70 focus:border-pink-400 transition"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="YOUR EMAIL"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-400 transition"
                  required
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="YOUR MESSAGE"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-purple-400 transition"
                  required
                />
              </div>

              {/* Status Message */}
              {submitStatus.type && (
                <div className={`p-4 rounded-lg border ${submitStatus.type === 'success'
                  ? 'border-green-500/30 bg-green-500/10 text-green-400'
                  : 'border-red-500/30 bg-red-500/10 text-red-400'
                  }`}>
                  <p className="text-sm font-space">
                    {submitStatus.type === 'success' ? '✅' : '❌'} {submitStatus.message}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`relative w-full py-2.5 md:py-3 rounded-lg overflow-hidden font-space tracking-widest text-xs sm:text-sm text-white transition-all duration-500 ${isSubmitting
                  ? 'bg-gray-600 cursor-not-allowed opacity-70'
                  : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.7)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)]'
                  }`}
              >
                <span className="relative z-10">
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </span>
                {!isSubmitting && (
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x opacity-50"></span>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div ref={socialRef} className="space-y-5 md:space-y-8">
            {/* Contact Info */}
            <div className="glass p-4 md:p-7">
              <h3 className="text-lg md:text-2xl font-space font-semibold text-dark-fg mb-4 md:mb-6 tracking-wider">
                GET IN TOUCH
              </h3>

              <div className="space-y-3 md:space-y-4">
                <a href="mailto:clients.44fingers@gmail.com" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                  <MdEmail className="text-neon-blue text-2xl" />
                  <div>
                    <p className="text-dark-fg/60 text-sm">Email</p>
                    <p className="text-dark-fg font-space">hello@44fingers.tech</p>
                  </div>
                </a>

                <a href="tel:+15550444444" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                  <MdPhone className="text-neon-purple text-2xl" />
                  <div>
                    <p className="text-dark-fg/60 text-sm">Phone</p>
                    <p className="text-dark-fg font-space">+1 (555) 044-4444</p>
                  </div>
                </a>

                <a href="https://www.google.com/maps/search/?api=1&query=32+Avenue+of+the+Americas,+New+York,+NY+10013" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                  <MdLocationOn className="text-neon-orange text-2xl" />
                  <div>
                    <p className="text-dark-fg/60 text-sm">Location</p>
                    <p className="text-dark-fg font-space">32 Avenue of the Americas, New York, NY 10013</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-space font-semibold text-dark-fg mb-4 md:mb-6 tracking-wider">
                FOLLOW US
              </h3>

              <div className="flex space-x-6">
                {[
                  {
                    name: 'LinkedIn',
                    icon: <FaLinkedin className="text-[#0A66C2]" />,
                    url: 'https://www.linkedin.com/company/44fingers'
                  },
                  {
                    name: 'Facebook',
                    icon: <FaFacebook className="text-[#1877F2]" />,
                    url: 'https://facebook.com'
                  },
                  {
                    name: 'Instagram',
                    icon: (
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg"
                        style={{
                          background: "linear-gradient(45deg, #F58529, #FEDA77, #DD2A7B, #8134AF, #515BD4)"
                        }}>
                        <FaInstagram className="text-white" />
                      </div>
                    ),
                    url: 'https://www.instagram.com/44fingers.it/'
                  }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg border border-neon-blue/20 bg-neon-blue/5">
                <p className="text-sm text-dark-fg/70 font-space leading-relaxed">
                  Join our community of innovative businesses transforming their digital presence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;