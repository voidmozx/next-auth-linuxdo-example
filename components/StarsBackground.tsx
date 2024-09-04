import React, { forwardRef } from "react";
import styles from "@/styles/StarsBackground.module.css";
import { cn } from "@/lib/utils";

interface StarsBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  starDensity?: 'low' | 'medium' | 'high';
}

const StarsBackground: React.FC<StarsBackgroundProps> = ({
  children,
  className = "",
  style,
  starDensity = 'medium',
}) => {
  const getStarCount = (density: 'low' | 'medium' | 'high') => {
    switch (density) {
      case 'low': return 30;
      case 'high': return 100;
      default: return 50;
    }
  };

  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const cx = `${Math.round(Math.random() * 10000) / 100}%`;
      const cy = `${Math.round(Math.random() * 10000) / 100}%`;
      const r = Math.round((Math.random() + 0.5) * 10) / 10;
      return <circle key={i} className={styles.star} cx={cx} cy={cy} r={r} />;
    });
  };

  return (
    <div className={cn(className, `${styles.starsWrapper}`)} style={style}>
      <div className={`${styles.starsContainer}`}>
        {[0, 1, 2].map((s) => (
          <svg
            key={s}
            className={styles.stars}
            width="100%"
            height="100%"
            preserveAspectRatio="none"
          >
            {generateStars(getStarCount(starDensity))}
          </svg>
        ))}
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          className={styles.extras}
        >
          <defs>
            <radialGradient id="comet-gradient" cx="0" cy=".5" r="0.5">
              <stop offset="0%" stopColor="rgba(255,255,255,.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          <g transform="rotate(-135)">
            <ellipse
              className={`${styles.comet} ${styles.cometA}`}
              fill="url(#comet-gradient)"
              cx="0"
              cy="0"
              rx="150"
              ry="2"
            />
          </g>
          <g transform="rotate(20)">
            <ellipse
              className={`${styles.comet} ${styles.cometB}`}
              fill="url(#comet-gradient)"
              cx="100%"
              cy="0"
              rx="150"
              ry="2"
            />
          </g>
          <g transform="rotate(300)">
            <ellipse
              className={`${styles.comet} ${styles.cometC}`}
              fill="url(#comet-gradient)"
              cx="40%"
              cy="100%"
              rx="150"
              ry="2"
            />
          </g>
        </svg>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default StarsBackground;
