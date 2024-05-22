import { Link, useOutletContext } from "react-router-dom";
import data from './data.json';
import Card from "./Card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState<string>('');
  const [search, setSearch] = useState<string>('')
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();

  const handleChanged = (value: string) => {
    setSelected(value);
  };

  const filteredData = selected
    ? data.filter(item => item.region.toLowerCase() === selected.toLowerCase())
    : data;

  const handleChanging = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const searchedData = search
    ? filteredData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    : filteredData;

  return (
    <div className={`${darkMode ? 'text-black bg-white' : 'text-white bg-[#2B3743]'} justify-center items-center flex-col flex mx-auto min-h-screen`}>
      <div className="items-center pt-28 justify-between flex-row flex w-[1000px] gap-4">
        <div className={`${darkMode ? 'text-black bg-white' : 'shadow-xl border-2 text-[#ffffff80] border-[#2B3743] bg-[#2B3743]'} flex items-center py-2 px-4 rounded-md gap-2`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input type="text" onChange={handleChanging} placeholder="Search by country.." className={`flex-1 py-1 px-2 rounded-md ${darkMode ? 'bg-gray-200 text-black' : 'bg-[#3B4753] text-white'} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
        </div>
        <div className="w-[180px]">
          <Select onValueChange={handleChanged}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter By Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="africa">Africa</SelectItem>
                <SelectItem value="america">America</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="oceania">Oceania</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="items-center pt-28 justify-center flex-row flex flex-wrap gap-4">
        {searchedData.map((item, index) => (
          <Link to={`/detail/${encodeURIComponent(item.name)}`} key={index}>
            <Card name={item.name} darkMode={darkMode} flags={item.flags} population={item.population} capital={item.capital} region={item.region} />
          </Link>
        ))}
      </div>
    </div>
  );
}