import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from '../AnimatedBackground';
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

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

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    const social = socialRef.current;

    if (!section || !title || !form || !social) return;

    // Set initial states - fade + slide-up + blur
    gsap.set(section, { opacity: 0, y: 60, filter: 'blur(10px)' });
    gsap.set(title, { opacity: 0, y: 50 });
    gsap.set(form.children, { opacity: 0, x: -50 });
    gsap.set(social, { opacity: 0, y: 50 });

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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
    
    // Handle form submission
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="section-dark min-h-screen flex items-center px-8 md:px-16 py-20 relative overflow-hidden snap-start"
    >
      <AnimatedBackground variant="dark" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-jetbrains font-bold text-dark-fg mb-6">
            LET'S <span className="bg-gradient-to-r from-pink-300 via-purple-400 to-purple-500
              text-transparent bg-clip-text">CONNECT</span>
          </h2>
          <p className="text-lg font-jetbrains font-light text-white max-w-2xl mx-auto">
            Ready to transform your digital presence? Let's discuss how we can help you dominate your market.
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div ref={formRef} className="glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="YOUR NAME"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500/70 focus:border-pink-400 transition"
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
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-400 transition"
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
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-purple-400 transition"
                  required
                />
              </div>          
              <button
                type="submit"
                className="relative w-full py-3 rounded-lg overflow-hidden font-jetbrains tracking-widest text-sm text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.7)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] transition-all duration-500"
              >
                <span className="relative z-10">SEND MESSAGE</span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x opacity-50"></span>
              </button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div ref={socialRef} className="space-y-8">
            {/* Contact Info */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-jetbrains font-semibold text-dark-fg mb-6 tracking-wider">
                GET IN TOUCH
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-neon-blue text-xl">📧</span>
                  <div>
                    <p className="text-dark-fg/60 text-sm">Email</p>
                    <p className="text-dark-fg font-jetbrains">contact@44fingers.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-neon-purple text-xl">📱</span>
                  <div>
                    <p className="text-dark-fg/60 text-sm">Phone</p>
                    <p className="text-dark-fg font-jetbrains">+1 (555) 044-4444</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-neon-orange text-xl">🌍</span>
                  <div>
                    <p className="text-dark-fg/60 text-sm">Location</p>
                    <p className="text-dark-fg font-jetbrains">Worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-jetbrains font-semibold text-dark-fg mb-6 tracking-wider">
                FOLLOW US
              </h3>
              
              <div className="flex space-x-6">
                {[
                  { 
                    name: 'LinkedIn', 
                    icon: <FaLinkedin className="text-[#0A66C2]" />, 
                    url: 'https://linkedin.com' 
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
                    url: 'https://instagram.com' 
                  }  
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl transition-all duration-300 transform hover:scale-125"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              
              <div className="mt-6 p-4 rounded-lg border border-neon-blue/20 bg-neon-blue/5">
                <p className="text-sm text-dark-fg/70 font-jetbrains leading-relaxed">
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