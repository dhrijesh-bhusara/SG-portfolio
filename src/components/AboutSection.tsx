'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeUp, staggerContainer } from './Animations';

export default function AboutSection() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Text Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p
          variants={fadeUp}
          className="text-luxury-accent uppercase tracking-widest text-sm mb-4"
        >
          About Us
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-h2 mb-6 font-display">
          Refined Spaces, Timeless Design
        </motion.h2>
        
        <motion.p variants={fadeUp} className="text-body-lg text-luxury-grey-medium mb-6">
          SG Architects is a distinguished architecture and interior design studio specializing in
          creating spaces of exceptional quality and enduring elegance across Maharashtra.
        </motion.p>

        <motion.div variants={fadeUp} className="mb-6">
          <h3 className="text-luxury-beige font-semibold mb-3 text-lg">Principal Architect</h3>
          <p className="text-body text-luxury-grey mb-3">
            <span className="font-semibold text-luxury-beige">Ar. Satish Gurubaxani</span> is a visionary architect 
            who brings refined architectural excellence to projects across Nandurbar, Mumbai, and Pune. 
            An alumnus of the prestigious Dr. D.Y. Patil School of Architecture in Pune and GTP College, 
            Ar. Gurubaxani combines academic rigor with practical innovation to deliver spaces that 
            transcend conventional design paradigms.
          </p>
          <p className="text-body text-luxury-grey">
            With a practice rooted in Maharashtra's diverse architectural landscape, he specializes in 
            crafting residential masterpieces and contemporary structures that honor local context while 
            embracing modern sensibilities. His portfolio encompasses sophisticated residential buildings, 
            commercial spaces, and bespoke interior design projects that reflect a deep commitment to 
            materiality, proportion, and the interplay of light.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="mb-6">
          <h3 className="text-luxury-beige font-semibold mb-3 text-lg">Our Philosophy</h3>
          <p className="text-body text-luxury-grey mb-3">
            Our approach is rooted in a deep understanding of materiality, proportion, and light.
            We believe that great architecture emerges from the careful orchestration of these
            elements, resulting in environments that elevate daily life and inspire human connection.
          </p>
        </motion.div>

        <motion.p variants={fadeUp} className="text-body text-luxury-grey">
          With meticulous attention to craft and an unwavering commitment to detail, we collaborate 
          intimately with our clients to realize spaces that authentically reflect their vision while 
          transcending fleeting trends. Each project is an opportunity to create architecture that 
          stands as a testament to enduring design excellence.
        </motion.p>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="relative aspect-[4/5] bg-luxury-beige-light overflow-hidden"
      >
        <Image
          src="/about.png"
          alt="Ar. Satish Gurubaxani - SG Architects"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
    </div>
  );
}
