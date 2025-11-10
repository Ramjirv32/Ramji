// Example of how to use smooth scroll in any component

import { useScroll } from "@/app/components/SmoothScroll";

export default function ExampleComponent() {
  const { handleClick } = useScroll();

  return (
    <div>
      {/* Example button that scrolls to a specific section */}
      <button 
        onClick={() => handleClick("about")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Scroll to About Section
      </button>
      
      {/* Another example */}
      <button 
        onClick={() => handleClick("contact")}
        className="px-4 py-2 bg-green-500 text-white rounded mt-2"
      >
        Scroll to Contact Section
      </button>
    </div>
  );
}

// Available section IDs:
// - home
// - about
// - skills
// - projects
// - works
// - certificates
// - research
// - contact
