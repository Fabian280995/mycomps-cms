import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const PlacesAutocomplete = ({
  setSelected,
}: {
  setSelected: (selected: any) => void;
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    requestOptions: {
      types: ["address"],
      componentRestrictions: {
        country: "de",
      },
    },
  });
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    setSelectedIndex(-1);
    try {
      const result = await getGeocode({ address });
      const { lat, lng } = await getLatLng(result[0]);
      setSelected({
        ...result[0],
        coordinates: { lat, lng },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setValue("");
    setSelectedIndex(-1);
    clearSuggestions();
  };

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          if (selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
          }
          break;
        case "ArrowDown":
          if (selectedIndex < data.length - 1) {
            setSelectedIndex(selectedIndex + 1);
          }
          break;
        case "Enter":
          if (selectedIndex >= 0 && selectedIndex < data.length) {
            const selectedSuggestion = data[selectedIndex];
            await handleSelect(selectedSuggestion.description);
          }
          break;
        case "Escape":
          handleReset();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Event Listener aufräumen
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, data]);

  return (
    <div
      className={cn(
        "bg-white rounded-md border relative flex items-center w-full overflow-hidden",
        value && "border-teal-400"
      )}
    >
      {!ready && <div className="bg-black/20 absolute inset-0"></div>}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Suchen..."
        className="w-full h-10 px-4 rounded-full focus:outline-none"
      />
      {status === "OK" && (
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white border shadow-lg mt-2 rounded-md 
        overflow-hidden overflow-y-auto no-scrollbar"
        >
          {data.map(({ place_id, description }, index) => (
            <motion.li
              key={place_id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className={cn(
                "px-4 py-2 cursor-pointer",
                index === selectedIndex ? "bg-gray-100" : "hover:bg-gray-100"
              )}
              onClick={() => handleSelect(description)}
            >
              {highlightMatches(description, value)}
            </motion.li>
          ))}
        </motion.ul>
      )}
      <button
        type="button"
        className="focus:outline-none m-3 text-gray-400"
        onClick={handleReset}
      >
        {value ? <X size={24} /> : <Search size={24} />}
      </button>
    </div>
  );
};

const highlightMatches = (description: string, value: string) => {
  // Sicherstellen, dass value nicht leer ist
  if (!value) return description;

  const parts = description.split(new RegExp(`(${value})`, "gi"));

  return (
    <>
      {parts.map((part, index) => {
        if (part.toLowerCase() === value.toLowerCase()) {
          return (
            <span key={index} className="font-semibold text-teal-500">
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

export default PlacesAutocomplete;
