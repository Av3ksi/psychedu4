'use client';

import clsx from 'clsx';
import {useParams} from 'next/navigation';
import {Locale} from 'next-intl';
import React, {ReactNode, useTransition, useState} from 'react'; // Import React for safer Children handling
import {usePathname, useRouter} from '@/i18n/navigation';
import {motion, AnimatePresence} from 'framer-motion';
import { FiChevronDown } from "react-icons/fi";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  
  const [isOpen, setIsOpen] = useState(false); 

  function onLocaleChange(nextLocale: Locale) {
    if (isPending) return;
    setIsOpen(false);
    
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        {pathname, params},
        {locale: nextLocale}
      );
    });
  }

  // --- Start of Fix ---
  // Safely convert children to an array of valid elements, then filter and map
  const options = React.Children.toArray(children)
    .filter(
      (child): child is React.ReactElement<{ value: Locale; children: string }> => 
        React.isValidElement(child) && child.type === 'option'
    )
    .map(child => ({
      value: child.props.value,
      label: child.props.children,
    }));
  // --- End of Fix ---

  const currentOption = options.find(opt => opt.value === defaultValue) || options[0];

  const PRIMARY_COLOR = '#8e7cc3';
  const BACKGROUND_COLOR = '#0a052a';

  const containerVariants = {
    closed: { opacity: 0, height: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { 
      opacity: 1, 
      height: 'auto', 
      transition: { 
        when: "beforeChildren", 
        staggerChildren: 0.05 
      } 
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };


  return (
    <div className="relative z-50">
      <p className="sr-only">{label}</p>
      
      <motion.button
        className={clsx(
          'inline-flex items-center justify-center p-3 rounded text-white font-medium focus:outline-none transition-colors ',
          isPending && 'opacity-50 cursor-wait',
          `bg-transparent hover:text-[${PRIMARY_COLOR}]`
        )}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        aria-expanded={isOpen}
      >
        {currentOption?.label || defaultValue} 
        <motion.span 
            className="ml-1 text-xl" // Increased size and reduced margin for better alignment
            animate={{ 
                rotate: isOpen ? 180 : 0,
                // Add a subtle bounce/spring effect to the rotation
                transition: { type: 'spring', stiffness: 300, damping: 20 }
            }} 
        >
            <FiChevronDown />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute right-0 mt-2 rounded-lg shadow-xl overflow-hidden`}
            initial="closed"
            animate="open"
            exit="closed"
            variants={containerVariants}
            style={{ 
              backgroundColor: BACKGROUND_COLOR,
              border: `1px solid ${PRIMARY_COLOR}`
            }}
          >
            <ul className="py-1">
              {options.map((option) => (
                <motion.li
                  key={option.value}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: PRIMARY_COLOR, color: 'white' }}
                  onClick={() => onLocaleChange(option.value)}
                  className={clsx(
                    'px-4 py-2 cursor-pointer transition-colors duration-150 whitespace-nowrap',
                    option.value === defaultValue ? 'text-white font-bold' : 'text-gray-300'
                  )}
                >
                  {option.label}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isOpen && <div 
        className="fixed inset-0 z-40" 
        onClick={() => setIsOpen(false)} 
      />}
    </div>
  );
}