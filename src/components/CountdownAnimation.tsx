import { motion, AnimatePresence } from "framer-motion";

interface CountdownAnimationProps {
  countdown: number;
  showPreview: boolean;
}

export default function CountdownAnimation({
  countdown,
  showPreview,
}: CountdownAnimationProps) {
  return (
    <AnimatePresence>
      {showPreview && countdown > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 w-full h-full bg-black/50 z-10 flex justify-center items-center"
        >
          <div className="relative">
            <svg className="w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="8"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="8"
                strokeDasharray="377"
                strokeDashoffset={377}
                transform="rotate(-90 64 64)"
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: countdown, ease: "linear" }}
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <motion.p
                key={countdown}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.5 }}
                className="text-white text-6xl font-bold"
              >
                {countdown}
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
