import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    const socials = socialsRef.current;

    if (!section || !title || !form || !socials) return;

    // Set initial states
    gsap.set([title, form, socials], { opacity: 0, y: 50 });

    // ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    })
    .to(form.children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    }, '-=0.6')
    .to(socials, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate submit button
    const submitBtn = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });

    // Simulate form submission
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="section-dark min-h-screen flex items-center px-8 md:px-16 py-20"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-jetbrains font-bold text-dark-fg mb-6">
            LET'S <span className="neon-text">CONNECT</span>
          </h2>
          <p className="text-lg font-jetbrains font-light text-dark-fg/70">
            Ready to transform your ideas into digital reality? Let's talk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input-glass w-full font-jetbrains placeholder:text-dark-fg/40"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-glass w-full font-jetbrains placeholder:text-dark-fg/40"
                  />
                </div>
              </div>
              
              <div>
                <textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="input-glass w-full font-jetbrains placeholder:text-dark-fg/40 resize-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn-neon w-full md:w-auto px-12 py-4 font-jetbrains text-sm tracking-widest"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Contact Info & Socials */}
          <div ref={socialsRef} className="space-y-8">
            <div className="glass-card p-6">
              <h3 className="text-xl font-jetbrains font-semibold text-dark-fg mb-4">
                GET IN TOUCH
              </h3>
              <div className="space-y-3 text-dark-fg/70 font-jetbrains font-light">
                <p>hello@44fingers.com</p>
                <p>+1 (555) 123-4567</p>
                <p>Available 24/7 for your projects</p>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-jetbrains font-semibold text-dark-fg mb-6">
                FOLLOW US
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 glass-card flex items-center justify-center text-dark-fg/70 hover:text-neon-blue transition-all duration-300 hover:scale-110 group"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.405.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                
                <a
                  href="#"
                  className="w-12 h-12 glass-card flex items-center justify-center text-dark-fg/70 hover:text-neon-blue transition-all duration-300 hover:scale-110 group"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                
                <a
                  href="#"
                  className="w-12 h-12 glass-card flex items-center justify-center text-dark-fg/70 hover:text-neon-blue transition-all duration-300 hover:scale-110 group"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background particles */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-neon-blue rounded-full opacity-20 floating"></div>
      <div className="absolute bottom-40 right-10 w-3 h-3 bg-neon-purple rounded-full opacity-15 floating-delayed"></div>
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-neon-orange rounded-full opacity-25 floating"></div>
    </section>
  );
};

export default ContactSection;