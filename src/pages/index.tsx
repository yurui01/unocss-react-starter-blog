import { metadata } from '@/config';
import { motion } from 'framer-motion';

import { textGradient } from '../utils/cssStyles';

export default function HomePage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative z-20 flex flex-col items-center justify-center text-center -top-20">
        <motion.h1
          animate={{ backgroundPosition: '300% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
          style={{
            ...textGradient(
              `300deg, #4b5563 0%, #1f2937 25%, #9ca3af 50%, #4b5563 75%, #111827 100%`
            ),
            backgroundSize: '600%',
            lineHeight: 1,
          }}
        >
          <span className="text-4xl">{metadata.author}.</span>
        </motion.h1>
        <p className="mt-1 text-lg text-black md:text-xl font-extralight dark:text-white">
          A blog about web development.
        </p>
      </div>
    </div>
  );
}
