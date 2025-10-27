
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is a hash, scroll to the element
    if (hash) {
      const id = hash.substring(1); // Remove #
      // Set timeout to make sure element is rendered before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView(); // This will be smooth due to the CSS rule on <html>
        }
      }, 100);
    } else {
      // Otherwise, scroll to top
      window.scrollTo(0, 0); // This will be smooth due to the CSS rule on <html>
    }
  }, [pathname, hash]); // Rerun effect when path or hash changes

  return null;
};

export default ScrollToTop;