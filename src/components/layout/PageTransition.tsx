'use client';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show">
      {children}
    </motion.div>
  );
}
