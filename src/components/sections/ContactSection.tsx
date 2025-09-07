import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from '../AnimatedBackground';

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

    // Set initial states
    gsap.set([title, form, social], { opacity: 0, y: 50 });

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
    .to([form, social], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    }, '-=0.6');

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
            LET'S <span className="neon-text">CONNECT</span>
          </h2>
          <p className="text-lg font-jetbrains font-light text-dark-fg/70 max-w-2xl mx-auto">
            Ready to transform your digital presence? Let's discuss how we can help you dominate your market.
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div ref={formRef} className="glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="YOUR NAME"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-glass w-full"
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
                  className="input-glass w-full"
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
                  className="input-glass w-full resize-none"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="btn-neon w-full font-jetbrains text-sm tracking-widest"
              >
                SEND MESSAGE
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
                  { name: 'LinkedIn', icon: '🔗', url: '#' },
                  { name: 'Twitter', icon: '🐦', url: '#' },
                  { name: 'GitHub', icon: '💻', url: '#' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="flex items-center justify-center w-12 h-12 glass rounded-lg text-2xl hover:text-neon-blue transition-all duration-300 hover:scale-110"
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