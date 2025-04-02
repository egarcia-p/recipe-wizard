import { useRef, useState } from "react";

// OPtions type { id: number; name: string; }
interface Option {
  id: number;
  name: string;
}

const SearchableDropdown = ({
  options,
  id,
  selectedVal,
  handleChange,
}: {
  options: Option[];
  id: string;
  selectedVal: string | number | null;
  handleChange: (value: number) => void;
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  // useEffect(() => {

  //   document.addEventListener("click", toggle);
  //   return () => document.removeEventListener("click", toggle);
  // }, []);

  const selectOption = (option: Option): void => {
    setQuery(() => "");
    handleChange(option.id);
    setIsOpen((isOpen) => !isOpen);
  };

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) {
      const selectedOption = options.find(
        (option) => option.id === selectedVal
      );
      return selectedOption ? selectedOption.name : "";
    }

    return "";
  };

  const filter = (options: Option[]) => {
    return options.filter((option) => {
      return option.name.toLowerCase().includes(query.toLowerCase());
    });
  };

  return (
    <div className="relative  cursor-default">
      <div className="control">
        <div className="line-">
          <input
            className="h-10 leading-normal text-sm pl-10  bg-white border box-border cursor-default transition-all duration-200 ease-[ease] w-full pr-[52px] py-2 rounded-md border-solid border-[#ccc]"
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange(0);
            }}
            onClick={(e) => {
              setIsOpen(e && e.target === inputRef.current);
            }}
          />
        </div>
        <div
          className={`content-["_"] block h-0 absolute w-0 mt-[0.3rem] border-[#999_transparent_transparent] border-solid border-[5px_5px_0] right-2.5 top-3.5 ${
            isOpen ? "block" : "block"
          }`}
        ></div>
      </div>

      <div
        className={` bg-white border shadow-[0_1px_0_rgba(0,0,0,0.06)] box-border max-h-[200px] overflow-y-auto absolute w-full z-[1000] -mt-px border-solid border-[#ccc] top-full ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {filter(options).map((option, index) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={`box-border cursor-pointer block px-2.5 py-2 pl-10 ${
                option.name === selectedVal ? "bg-[#f2f9fc] " : ""
              }`}
              key={`${id}-${index}`}
            >
              {option.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchableDropdown;
