import { ReactNode, useEffect, useRef, useState } from "react";
import { TooltipPosition } from "./types";

interface CustomTooltipProps {
  children: ReactNode;
  content: string;
  className?: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ 
  children, 
  content, 
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<TooltipPosition>({ top: 0, left: 0 });
  const targetRef = useRef<HTMLDivElement>(null);
  
  const updateTooltipPosition = () => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + rect.height / 2,
        left: rect.right + 28 // 8px offset from the icon
      });
    }
  };

  useEffect(() => {
    if (isVisible) {
      updateTooltipPosition();
      // Update position on scroll and resize
      window.addEventListener('scroll', updateTooltipPosition);
      window.addEventListener('resize', updateTooltipPosition);

      return () => {
        window.removeEventListener('scroll', updateTooltipPosition);
        window.removeEventListener('resize', updateTooltipPosition);
      };
    }
  }, [isVisible]);

  return (
    <div 
      ref={targetRef}
      className="relative isolate"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          className={`
            fixed 
            px-2 
            py-1 
            bg-gray-800 
            text-white 
            text-sm 
            rounded 
            whitespace-nowrap 
            shadow-lg
            transition-opacity
            duration-150
            z-50
            ${className}
          `}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: 'translateY(-50%)',
            opacity: isVisible ? 1 : 0
          }}
        >
          {content}
          <div 
            className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};