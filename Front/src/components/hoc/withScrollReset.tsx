import { useEffect, useState } from 'react';
import Loading from '../Loading';

const withScrollReset = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Use 'instant' instead of 'smooth' for immediate scroll
      });

      // Show loading for 1 second
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withScrollReset;