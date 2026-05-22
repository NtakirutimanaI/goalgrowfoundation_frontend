import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import { Heart, Shield, Award, CheckCircle, CreditCard, DollarSign, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DonatePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slidingImages = [
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slidingImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [customAmount, setCustomAmount] = useState<string | number>("");

  const handleTierSelect = (amount: number) => {
    setCustomAmount(amount);
    const paymentSection = document.getElementById('payment-section');
    if (paymentSection) {
      paymentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextStep = () => {
    if (customAmount && Number(customAmount) > 0) {
      setStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert("Please enter a valid donation amount.");
    }
  };

  const donationTiers = [
    {
      amount: 25,
      title: 'Kit a Champion',
      desc: 'Provides a full professional training kit and equipment for one player.',
      features: ['Technical Jersey', 'Professional Shorts', 'Training Equipment']
    },
    {
      amount: 100,
      title: 'Fuel the Growth',
      desc: 'Sponsors one month of elite technical coaching and tactical analysis.',
      features: ['Elite Coaching', 'Video Analysis', 'Performance Tracking'],
      popular: true
    },
    {
      amount: 500,
      title: 'The Scholarship Fund',
      desc: 'Provides academic tuition and material support for a residential scholar.',
      features: ['Full Tuition', 'Study Materials', 'University Placement']
    }
  ];

  return (
    <div className="home-wrapper">
      <Navbar />
      
      <PageHeader 
        title={step === 0 ? "Support Our Champions" : "Complete Your Donation"} 
        subtitle={step === 0 ? "Empowering the Next Generation through Your Generosity" : `Finalizing your gift of $${customAmount}`}
      />

      {step === 0 ? (
        <>
          {/* Impact Statement */}
          <section className="section" style={{ background: '#fff', padding: '2rem 1rem' }}>
            <div className="about-grid" style={{ gap: '1.5rem' }}>
               <div className="about-text">
                  <h3 style={{ textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 900, fontSize: '0.9rem', margin: 0 }}>Your Impact</h3>
                  <h2 style={{ fontSize: '2rem', textTransform: 'uppercase', fontWeight: 900, color: 'var(--primary)', lineHeight: 1, margin: '0.5rem 0' }}>Transforming <br /> Lives Through Sport</h2>
                  <p style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>Every donation to GoalGrow Foundation directly fuels the development of young female athletes. We ensure that 100% of public donations go straight to the pitch—supporting coaching, equipment, and academic scholarships.</p>
                  <div style={{ marginTop: '1rem' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ background: 'var(--secondary)', color: 'var(--primary)', padding: '0.5rem' }}><Shield size={20} /></div>
                        <span style={{ fontWeight: 700 }}>100% Transparency & Accountability</span>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'var(--secondary)', color: 'var(--primary)', padding: '0.5rem' }}><Award size={20} /></div>
                        <span style={{ fontWeight: 700 }}>Tax-Deductible Contributions</span>
                     </div>
                  </div>
               </div>
               <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <div style={{ 
                    display: 'flex',
                    width: `${slidingImages.length * 100}%`,
                    transform: `translateX(-${activeSlide * (100 / slidingImages.length)}%)`,
                    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                    {slidingImages.map((img, i) => (
                      <img key={i} src={img} alt="Impact" style={{ width: `${100 / slidingImages.length}%`, borderRadius: '0' }} />
                    ))}
                  </div>
                  <div style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--secondary)', width: '100%', height: '10px' }}></div>
               </div>
            </div>
          </section>

          {/* Donation Tiers */}
          <section className="section" style={{ background: '#f8fafc', padding: '2rem 1rem' }}>
            <div className="section-title" style={{ marginBottom: '1.5rem' }}>
               <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Choose Your Contribution</h2>
               <p style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>Select a tier that matches the impact you want to make today.</p>
            </div>
            <div className="grid-3" style={{ gap: '1rem' }}>
               {donationTiers.map((tier, idx) => (
                 <div key={idx} className="card" style={{ 
                   background: tier.popular ? 'var(--primary)' : 'white', 
                   color: tier.popular ? 'white' : 'var(--primary)',
                   border: tier.popular ? 'none' : '1px solid var(--border-color)',
                   transform: tier.popular ? 'scale(1.02)' : 'none',
                   zIndex: tier.popular ? 2 : 1,
                   padding: '1.5rem'
                 }}>
                    {tier.popular && <div style={{ background: 'var(--accent)', color: 'white', padding: '0.1rem 0.5rem', fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', position: 'absolute', top: '0.5rem', right: '0.5rem' }}>Most Impactful</div>}
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: tier.popular ? 'var(--secondary)' : 'var(--accent)' }}>${tier.amount}</div>
                    <h3 style={{ textTransform: 'uppercase', fontWeight: 900, marginTop: '0.5rem' }}>{tier.title}</h3>
                    <p style={{ fontSize: '0.9rem', margin: '1.5rem 0', opacity: 0.8 }}>{tier.desc}</p>
                    <div style={{ borderTop: `1px solid ${tier.popular ? 'rgba(255,255,255,0.1)' : 'var(--border-color)'}`, paddingTop: '1.5rem' }}>
                       {tier.features.map((f, fIdx) => (
                         <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', fontSize: '0.85rem' }}>
                            <CheckCircle size={16} color={tier.popular ? 'var(--secondary)' : 'var(--accent)'} />
                            <span>{f}</span>
                         </div>
                       ))}
                    </div>
                    <button 
                      className={tier.popular ? 'btn-secondary' : 'btn-primary'} 
                      style={{ 
                        width: '100%', 
                        marginTop: '2rem',
                        background: tier.popular ? 'var(--secondary)' : 'var(--primary)',
                        color: tier.popular ? 'var(--primary)' : 'white',
                        fontWeight: 900,
                        padding: '1rem',
                        fontSize: '0.9rem',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                      onClick={() => handleTierSelect(tier.amount)}
                    >
                      Donate Now
                    </button>
                 </div>
               ))}
            </div>

            {/* Custom Amount */}
            <div id="payment-section" style={{ maxWidth: '600px', margin: '1.5rem auto 0', background: 'white', padding: '1.5rem', border: '1px solid var(--border-color)', textAlign: 'center' }}>
               <h3 style={{ textTransform: 'uppercase', fontWeight: 900, fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>Proceed to Payment</h3>
               <p style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>Review your amount and proceed to our secure portal.</p>
               <div style={{ position: 'relative', marginBottom: '1rem' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 900, fontSize: '1.2rem', color: 'var(--primary)' }}>$</span>
                  <input 
                    type="number" 
                    placeholder="Enter amount" 
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 2.5rem', fontSize: '1.2rem', fontWeight: 900, border: '2px solid var(--primary)', outline: 'none' }} 
                  />
               </div>
               <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '0.8rem', fontSize: '1rem' }}
                onClick={handleNextStep}
               >
                 Secure Checkout
               </button>
            </div>
          </section>
        </>
      ) : step === 1 ? (
        /* STEP 1: PAYMENT SELECTION & DETAILS */
        <section className="section" style={{ background: '#fff', minHeight: '50vh', padding: '2rem 1rem' }}>
           <div style={{ maxWidth: '800px', margin: '0 auto', background: '#f8fafc', padding: '2rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                 <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0 }}>PAYMENT METHOD</h2>
                 <button onClick={() => setStep(0)} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem' }}>← Back</button>
              </div>

              {/* Payment Method Selector */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
                 {[
                    { id: 'CARD', label: 'Bank Card', icon: <CreditCard size={20} /> },
                    { id: 'MOMO', label: 'Mobile Money', icon: <Phone size={20} /> },
                    { id: 'BANK', label: 'Bank Account', icon: <DollarSign size={20} /> }
                 ].map((method) => (
                    <button 
                       key={method.id}
                       onClick={() => setPaymentMethod(method.id)}
                       style={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center', 
                          gap: '0.8rem', 
                          padding: '1.5rem', 
                          background: paymentMethod === method.id ? 'var(--primary)' : 'white',
                          color: paymentMethod === method.id ? 'white' : 'var(--primary)',
                          border: `2px solid ${paymentMethod === method.id ? 'var(--primary)' : 'var(--border-color)'}`,
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          fontSize: '0.7rem',
                          cursor: 'pointer',
                          transition: '0.3s'
                       }}
                    >
                       {method.icon}
                       {method.label}
                    </button>
                 ))}
              </div>

              <div className="auth-form" style={{ padding: 0, background: 'transparent', boxShadow: 'none', maxWidth: 'none' }}>
                 
                 {/* CONDITIONAL FORM RENDERING */}
                 {paymentMethod === 'CARD' && (
                    <>
                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                          <div className="form-group">
                             <label style={{ fontSize: '0.7rem' }}>FIRST NAME</label>
                             <input type="text" placeholder="John" style={{ background: 'white', padding: '0.75rem', fontSize: '0.9rem' }} />
                          </div>
                          <div className="form-group">
                             <label style={{ fontSize: '0.7rem' }}>LAST NAME</label>
                             <input type="text" placeholder="Doe" style={{ background: 'white', padding: '0.75rem', fontSize: '0.9rem' }} />
                          </div>
                       </div>
                       <div className="form-group" style={{ marginBottom: '1rem' }}>
                          <label style={{ fontSize: '0.7rem' }}>CARD NUMBER</label>
                          <div style={{ position: 'relative' }}>
                             <input type="text" placeholder="**** **** **** ****" style={{ background: 'white', padding: '0.75rem', fontSize: '0.9rem' }} />
                             <CreditCard style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} size={18} />
                          </div>
                       </div>
                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                          <div className="form-group">
                             <label style={{ fontSize: '0.7rem' }}>EXPIRY</label>
                             <input type="text" placeholder="MM/YY" style={{ background: 'white', padding: '0.75rem', fontSize: '0.9rem' }} />
                          </div>
                          <div className="form-group">
                             <label style={{ fontSize: '0.7rem' }}>CVV</label>
                             <input type="text" placeholder="123" style={{ background: 'white', padding: '0.75rem', fontSize: '0.9rem' }} />
                          </div>
                          <div className="form-group">
                             <label style={{ fontSize: '0.7rem' }}>POSTAL CODE</label>
                             <input type="text" placeholder="10001" style={{ background: 'white', padding: '0.75rem', fontSize: '0.9rem' }} />
                          </div>
                       </div>
                    </>
                 )}

                 {paymentMethod === 'MOMO' && (
                    <>
                       <div className="form-group" style={{ marginBottom: '1rem' }}>
                          <label style={{ fontSize: '0.7rem' }}>MOBILE PROVIDER</label>
                          <select style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem', border: '1px solid var(--border-color)', background: 'white', fontWeight: 700 }}>
                             <option>MTN Mobile Money</option>
                             <option>Airtel Money</option>
                             <option>M-Pesa</option>
                          </select>
                       </div>
                       <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                          <label style={{ fontSize: '0.7rem' }}>PHONE NUMBER</label>
                          <input type="tel" placeholder="+250 7XX XXX XXX" style={{ background: 'white', padding: '0.75rem', fontSize: '0.9rem' }} />
                          <p style={{ fontSize: '0.7rem', marginTop: '0.5rem', opacity: 0.7 }}>A prompt will be sent to your phone to confirm the transaction.</p>
                       </div>
                    </>
                 )}

                 {paymentMethod === 'BANK' && (
                    <>
                       <div className="form-group" style={{ marginBottom: '1rem' }}>
                          <label style={{ fontSize: '0.7rem' }}>BANK NAME</label>
                          <input type="text" placeholder="e.g., Equity Bank, BK, Cogebanque" style={{ background: 'white', padding: '0.75rem', fontSize: '0.9rem' }} />
                       </div>
                       <div className="form-group" style={{ marginBottom: '1rem' }}>
                          <label style={{ fontSize: '0.7rem' }}>ACCOUNT HOLDER NAME</label>
                          <input type="text" placeholder="John Doe" style={{ background: 'white', padding: '0.75rem', fontSize: '0.9rem' }} />
                       </div>
                       <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                          <label style={{ fontSize: '0.7rem' }}>ACCOUNT NUMBER / IBAN</label>
                          <input type="text" placeholder="XXXX XXXX XXXX XXXX" style={{ background: 'white', padding: '0.75rem', fontSize: '0.9rem' }} />
                       </div>
                    </>
                 )}

                 <button 
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setStep(2);
                  }}
                  className="btn-primary" 
                  style={{ width: '100%', padding: '1rem', fontSize: '1rem', background: 'var(--accent)', color: 'white' }}
                 >
                    CONFIRM & DONATE ${customAmount}
                 </button>
                 
                 <div style={{ textAlign: 'center', marginTop: '1rem', opacity: 0.6, fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Shield size={16} /> 
                    <span>Your transaction is secured with 256-bit encryption</span>
                 </div>
              </div>
           </div>
        </section>
      ) : (
        /* STEP 2: SUCCESS CELEBRATION */
        <section className="section" style={{ background: '#fff', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
           <div style={{ maxWidth: '600px', textAlign: 'center', padding: '2rem', background: '#f8fafc', border: '1px solid var(--border-color)' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'var(--secondary)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1.5rem',
                boxShadow: '0 10px 25px rgba(224, 184, 110, 0.4)'
              }}>
                 <CheckCircle size={30} color="var(--primary)" />
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.5rem', margin: 0 }}>THANK YOU!</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                 Your generous gift of <strong style={{ color: 'var(--primary)' }}>${customAmount}</strong> has been received. You are directly fueling the dreams of a young champion.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <Link to="/" className="btn-primary" style={{ padding: '1rem' }}>RETURN TO HOME</Link>
                 <button onClick={() => setStep(0)} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem' }}>MAKE ANOTHER DONATION</button>
              </div>
              
              <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                 <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Share your impact:</p>
                 <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ width: '30px', height: '30px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.8rem' }}>f</div>
                    <div style={{ width: '30px', height: '30px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.8rem' }}>t</div>
                    <div style={{ width: '30px', height: '30px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.8rem' }}>i</div>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* Trust & Transparency */}
      <section className="section" style={{ background: 'var(--primary)', color: 'white', textAlign: 'center' }}>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
            <div>
               <CreditCard size={40} color="var(--secondary)" />
               <h4 style={{ fontWeight: 900, marginTop: '1rem' }}>Secure Payment</h4>
               <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>256-bit SSL encrypted</p>
            </div>
            <div>
               <Heart size={40} color="var(--secondary)" />
               <h4 style={{ fontWeight: 900, marginTop: '1rem' }}>Direct Impact</h4>
               <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Direct to programs</p>
            </div>
            <div>
               <DollarSign size={40} color="var(--secondary)" />
               <h4 style={{ fontWeight: 900, marginTop: '1rem' }}>Tax Benefits</h4>
               <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Registered Non-Profit</p>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
