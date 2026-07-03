import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export default function AboutSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-32">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative"
        >
          {/* Placeholder portrait — swap the src for your own photo */}
          <img
            src="/IMG_9285.PNG"
            alt="Divij Prajapati"
            className="w-full aspect-[3/4] object-cover object-top grayscale contrast-125"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        >
          {/* The "floating tab" — gently bobs up and down forever, nested
              so the entrance fade and the continuous bob never fight
              over the same transform. */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="panel p-7 md:p-8 space-y-6"
          >
            <p className="eyebrow">About</p>

            <p className="text-paper text-base md:text-lg leading-relaxed">
              I'm Divij, a high school student who enjoys building things
              that combine technology, design, and creativity. Over the
              years I've explored multiple disciplines—not because I
              couldn't choose one, but because I enjoy understanding how
              different fields connect. Every project teaches me a
              different way of thinking, and those perspectives often
              influence one another.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
