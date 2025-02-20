import { useEffect, useRef, useState } from "react";

const SearchableDropdown = ({
  options,
  label,
  id,
  selectedVal,
  handleChange,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(option[id]);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) {
      const selectedOption = options.find(
        (option) => option.id === selectedVal
      );
      return selectedOption.name;
    }

    return "";
  };

  const filter = (options) => {
    return options.filter(
      (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  return (
    <div className="relative  cursor-default">
      <div className="control">
        <div className="line-">
          <input
            className="leading-normal text-base bg-white border box-border cursor-default transition-all duration-200 ease-[ease] w-full pl-2.5 pr-[52px] py-2 rounded-sm border-solid border-[#ccc]"
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange(null);
            }}
            onClick={toggle}
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
              className={`box-border cursor-pointer block px-2.5 py-2 ${
                option[label] === selectedVal ? "bg-[#f2f9fc] " : ""
              }`}
              key={`${id}-${index}`}
            >
              {option[label]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchableDropdown;
