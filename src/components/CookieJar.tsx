import { motion } from 'framer-motion';

interface CookieJarProps {
  size?: 'sm' | 'md' | 'lg';
  isAnimating?: boolean;
}

export const CookieJar = ({ size = 'md', isAnimating = false }: CookieJarProps) => {
  const sizes = {
    sm: 'w-24 h-28',
    md: 'w-40 h-48',
    lg: 'w-56 h-64',
  };

  return (
    <motion.div
      className={`${sizes[size]} relative`}
      animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Jar body */}
      <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-lg">
        {/* Jar lid */}
        <ellipse cx="60" cy="20" rx="45" ry="12" fill="hsl(25 30% 45%)" />
        <rect x="15" y="8" width="90" height="14" rx="4" fill="hsl(25 35% 50%)" />
        <ellipse cx="60" cy="8" rx="45" ry="10" fill="hsl(25 40% 60%)" />
        
        {/* Lid rim highlight */}
        <ellipse cx="60" cy="8" rx="38" ry="7" fill="hsl(25 45% 70%)" opacity="0.5" />
        
        {/* Jar body */}
        <path
          d="M20 30 Q10 35 10 55 L10 110 Q10 135 35 135 L85 135 Q110 135 110 110 L110 55 Q110 35 100 30 Z"
          fill="hsl(35 60% 92%)"
          stroke="hsl(35 40% 80%)"
          strokeWidth="2"
        />
        
        {/* Glass reflection */}
        <path
          d="M25 40 Q20 45 20 60 L20 100 Q20 115 30 120"
          fill="none"
          stroke="hsl(0 0% 100%)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.4"
        />
        
        {/* Cookies inside */}
        <g opacity="0.9">
          {/* Cookie 1 */}
          <circle cx="45" cy="90" r="14" fill="hsl(30 60% 55%)" />
          <circle cx="42" cy="87" r="2" fill="hsl(25 50% 35%)" />
          <circle cx="48" cy="92" r="2" fill="hsl(25 50% 35%)" />
          <circle cx="44" cy="95" r="1.5" fill="hsl(25 50% 35%)" />
          
          {/* Cookie 2 */}
          <circle cx="75" cy="95" r="12" fill="hsl(28 55% 50%)" />
          <circle cx="72" cy="92" r="1.5" fill="hsl(25 50% 35%)" />
          <circle cx="78" cy="96" r="2" fill="hsl(25 50% 35%)" />
          
          {/* Cookie 3 */}
          <circle cx="60" cy="75" r="13" fill="hsl(32 62% 58%)" />
          <circle cx="57" cy="72" r="2" fill="hsl(25 50% 35%)" />
          <circle cx="63" cy="77" r="1.5" fill="hsl(25 50% 35%)" />
          <circle cx="58" cy="79" r="2" fill="hsl(25 50% 35%)" />
        </g>
        
        {/* Hearts floating */}
        <motion.g
          animate={{ y: [0, -5, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M55 55 C52 52 48 55 55 62 C62 55 58 52 55 55" fill="hsl(350 70% 60%)" opacity="0.7" />
          <path d="M70 50 C68 48 65 50 70 55 C75 50 72 48 70 50" fill="hsl(15 80% 55%)" opacity="0.6" transform="scale(0.8) translate(12, 10)" />
        </motion.g>
      </svg>
    </motion.div>
  );
};
