import React from 'react';
import { Link } from 'react-router-dom';

const OurStoryPage = () => {
  return (
    <div className="bg-surface text-on-surface">
      <main className="pt-24">

        {/* ── Hero Section ── */}
        <section className="px-6 md:px-8 max-w-screen-2xl mx-auto py-20 lg:py-32 overflow-hidden">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 z-10">
              <span className="inline-block mb-6 font-label uppercase tracking-[0.2em] text-secondary text-sm font-semibold">
                Our Story
              </span>
              <h1 className="text-6xl lg:text-8xl font-headline font-bold leading-[0.9] text-on-surface tracking-tighter mb-8">
                The Quiet <br />
                <span className="serif-italic font-normal">Pursuit of</span> <br />
                Perfection.
              </h1>
              <div className="lg:pl-20 max-w-lg">
                <p className="text-on-surface-variant text-lg leading-relaxed mb-6 font-body">
                  Founded in 1994, THE ATELIER began as a modest workshop in the heart of Florence. We believe that true luxury is not loud — it is felt through the weight of the silk, the precision of the stitch, and the timelessness of the silhouette.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="aspect-[3/4] bg-surface-container-low overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOJvTSFg6m2JHLZwD0_TFlj53QNeAeE8ojMWB7tJvcU2HRBCty_yf6ATYliI3tITB0sfFxsb7gxUc9XIgYBIV6uiqm4AixOswKT3bl7AcN97TlP7Rk6FeDPGVe1-8_374kf3FqZyEL0QATwmXTrzYcMJJJU4Ped-0cM394A_qRNZ2410EILvKeaCE_F9ZrgpWNQom3Hx_fYG1S6ZljZkUQkNrjYUL96qXhH4_z2nyGf2z9lJ7Pumq3LzL3YSywZIPtbnKfqSwNW4eT"
                  alt="Editorial fashion photography"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Fabric detail overlay image */}
              <div className="absolute -bottom-10 -left-20 hidden lg:block w-64 h-80 bg-surface-container-highest overflow-hidden p-1 shadow-sm">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfKvPZZEx0oGd73bBMKyDbiqhwj8IQ81aVAc_bLOCmym2IQsvSNXUQP6o5XdJwa5X4isfbKqh8rdY3MaMSty1a34OzWlqNh3nldAa7iTEO6Zv8twFT_25FyQXDm_uK40gQPUbFcdcQnec4aMotcEnqM3XTBXsP9vZB5isFHYu3Q1UtQYmucZeH9ykpuZca7zdm4wUv_EOrvvZQO9z6JtjMrTG_N9qLOitrp5213-x5dq_ELA6_LIM1KoWTj1VTsBacwdKWVlmlOvYr"
                  alt="Detail of fabric"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Philosophy Section ── */}
        <section className="bg-surface-container-low py-32">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="order-2 lg:order-1">
                <div className="aspect-square bg-surface overflow-hidden group">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAOYrpSboF3hpqbSm3hIut6wx4U3xdBYanLRR-R4jWWrhqJPYjDYi0Bgb1VREl-f2MjyruPWjnADhdSBG-37g6R0Ze6O6ANGl-7b3MtyVyokUVDZu7gVWgQP6mpxry712TcfLhYuAFRUwwUr9lAhHe42BZ9hj1s050MIjdYm3IxaswgjUCc1z14i-grxJZRHhoXDj3akThSiS9bPU8BbO46eExmk3BZmL08WoutBcP1HQkTlbibgEa8TKc4v3xgKQe_WVy-k20e6pS"
                    alt="Store interior"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-12">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-headline font-bold mb-8">Our Philosophy</h2>
                  <p className="text-on-surface-variant text-xl font-light leading-relaxed mb-8">
                    We operate on the principle of "Intentional Scarcity." Every piece is produced in limited runs to ensure that craftsmanship is never compromised for volume.
                  </p>
                </div>
                <div className="space-y-10">
                  {[
                    { num: '01', title: 'Ancestral Techniques', desc: 'Merging ancient hand-stitching methods with modern textile innovation.' },
                    { num: '02', title: 'Ethical Sourcing', desc: '100% traceable raw materials from family-owned mills in Italy and Japan.' },
                    { num: '03', title: 'Timeless Longevity', desc: 'Garments designed to evolve with the wearer, lasting for generations.' },
                  ].map((item) => (
                    <div key={item.num} className="flex gap-6">
                      <span className="text-secondary font-headline text-3xl italic flex-shrink-0">{item.num}</span>
                      <div>
                        <h4 className="text-xl font-headline font-bold mb-2">{item.title}</h4>
                        <p className="text-on-surface-variant font-body">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Craftsmanship Bento Grid ── */}
        <section className="py-32 px-6 md:px-8 max-w-screen-2xl mx-auto">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <span className="font-label uppercase tracking-widest text-secondary text-sm mb-4 block">Inside the Studio</span>
            <h2 className="text-5xl font-headline font-bold mb-6">The Hand of the Maker</h2>
            <p className="text-on-surface-variant text-lg">
              Every THE ATELIER garment passes through the hands of master artisans who have spent decades perfecting their craft.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 h-auto md:h-[900px]">
            {/* Wide top-left */}
            <div className="md:col-span-8 md:row-span-1 bg-surface-container overflow-hidden group relative h-72 md:h-full">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtmvAJ7h6-mQud8FyzXOcjG9TzwyifWoxy3oac07kbAjXhS4z337LkALgLbuVh5MSmfZg3gnNISENN9mkSmvP8Vu_jcupqIWId8EYqFHBQ8XgpVvtbL-S0bRjoHyqEjw7teeaJOCIWfiNGNwnh3nC7sYaIx7kcS0Y3BkNdja4XYhuxf-EsmKfY9CALfpBveLpwYhP1PnxpMZRUcnbPIg3-YhPvcIAuxMxN8iOPtox8KM3ALVoNN4lWqJk6cSn65pSatPW-WTKEEp6T"
                alt="Tailoring process"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8 text-white z-10">
                <p className="font-label tracking-widest text-xs uppercase opacity-80 mb-2">The Pattern</p>
                <h3 className="text-2xl font-headline italic">Precision in every line.</h3>
              </div>
            </div>

            {/* Tall right column */}
            <div className="md:col-span-4 md:row-span-2 bg-surface-container overflow-hidden group relative h-72 md:h-full">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAxqljSZDWkZungJO0QIbU0AB4-QrYrXpmPYyajJ-5ow7GNCTy0YUhQ2xcDI4mXEPcTMfgHT6raPoWB1ICsaglaOxoX8MVWjsvE1Sv6psrkzHDCZB4P88v_EXD8rKJkYJgsAc6R0_ZBz0Aof8jlZww57WjUGrFlzEV6S8O4jY7Q0BpGTKZYtrFfLZMNCNUc1J0A2YRcABYoW1JW2OoDV0rkHZLN1_-MbRBmZl5Yy9L21QVCos05PMBls0Qhc8HSH6AKEFNJq7Yy4kL"
                alt="Finished garment"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8 text-white z-10">
                <p className="font-label tracking-widest text-xs uppercase opacity-80 mb-2">The Final Form</p>
                <h3 className="text-2xl font-headline italic">A living legacy.</h3>
              </div>
            </div>

            {/* Bottom-left image */}
            <div className="md:col-span-4 md:row-span-1 bg-surface-container overflow-hidden group relative h-60 md:h-full">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSDOT07QepdQO4Bm42PABLWRXqdwlxH2Gqm8KTLjfJrg-RH5VDfacMaTs-zAoMvLu-k63gqX2DjPSm0nmu1qRLXJWwgO_ZaOrZIOaH70Cx7jA9HX2YE64bfcYkUICyn_gBAzUOtktZ2qZQ9z6ghmA_xqnkI7A5RKi0DirSmxn3igRDSfo_T_Hehla6l3DMKmGXVC6cGGGzKCC70Gnx0TyjbqTphEpGjrmYHW_XYienrhSgD2b4O5eO3EMkz78RZ4M53Cct1wE5KPzP"
                alt="Material detail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Bottom-right text card */}
            <div className="md:col-span-4 md:row-span-1 bg-surface-container-low p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-3xl font-headline font-bold mb-6">Uncompromising Quality</h3>
              <p className="text-on-surface-variant font-light mb-8 leading-relaxed">
                We spend an average of 48 working hours on each tailored jacket, ensuring every inner seam is as beautiful as the outer silhouette.
              </p>
              <Link
                to="/shop"
                className="text-primary font-label text-sm uppercase tracking-widest flex items-center gap-2 group"
              >
                Discover the process
                <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">east</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Newsletter CTA ── */}
        <section className="py-32 bg-surface">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8">Join the inner circle.</h2>
            <p className="text-on-surface-variant text-lg mb-12 max-w-xl mx-auto">
              Be the first to know about our upcoming capsules and exclusive atelier visits.
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative flex items-center border-b border-outline-variant/40 focus-within:border-secondary transition-colors pb-2">
                <input
                  className="w-full bg-transparent border-none focus:ring-0 font-body text-on-surface placeholder:text-stone-400 outline-none"
                  placeholder="Email Address"
                  type="email"
                />
                <button className="gold-shimmer text-on-secondary px-8 py-3 text-sm font-label uppercase tracking-widest font-semibold transition-all active:scale-95 shadow-lg flex-shrink-0">
                  Join
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OurStoryPage;
