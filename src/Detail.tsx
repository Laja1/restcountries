import { useOutletContext, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import data from './data.json';

// Define TypeScript types
type Currency = {
    code: string;
    name: string;
    symbol: string;
};

type Language = {
    name: string;
};

type Country = {
    name: string;
    borders: string[];
    subregion: string;
    topLevelDomain: string;
    currencies: Currency[];
    languages: Language[];
    nativeName: string;
    population: number;
    capital: string;
    region: string;
    flags: {
        png: string;
    };
};

// CountryDetail Component
export default function CountryDetail() {
  const [country, setCountry] = useState<Country | null>(null);
  const { name } = useParams<{ name: string }>();
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();

  // Fetch country data on component mount
  useEffect(() => {
    const foundCountry = data.find(item => item.name === name) as Country | undefined;
    setCountry(foundCountry || null);
  }, [name]);

  // Render loading or error state
  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <div className={`${darkMode ? 'text-black bg-white' : 'text-white bg-[#2B3743]'} flex-col justify-center flex mx-auto min-h-screen`}>
      <Link to='/'>
        <div className="pl-10 pb-10">
          <button className="flex-row flex gap-2 w-[100px] border-2 px-3 py-1 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
            <p>Back</p> 
          </button>
        </div>
      </Link>

      <div className="items-center flex justify-center">
        <div className="flex-row flex w-[1000px] items-center justify-between">
          <div>
            <img src={country.flags.png} className="h-[300px] w-[450px]" alt={`${country.name} flag`} />
          </div>
          <div>
            <p className="text-xl pb-2 font-bold">{country.name}</p>
            <div className="flex-row w-[450px] justify-between flex">
              <div className="flex-col flex">
                <p>Native Name: <span className="font-thin">{country.nativeName}</span></p>
                <p>Population: <span className="font-thin">{country.population.toLocaleString()}</span></p>
                <p>Region: <span className="font-thin">{country.region}</span></p>
                <p>Sub Region:<span className="font-thin"> {country.subregion}</span></p>
                <p>Capital: <span className="font-thin">{country.capital}</span></p>
              </div>
              <div className="flex-col flex">
                <p>Top Level Domain: {country.topLevelDomain}</p>
                <p>
                  Currencies:
                  {country.currencies.map((currency, index) => (
                    <span key={index}> {currency.name} </span>
                  ))}
                </p>
                <p>
                  Languages:
                  {country.languages.map((language, index) => (
                    <span key={index}>{language.name} </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="pt-5 ">
            {country.borders && country.borders.length > 0 && (
  <p className="flex-row w-[100px] flex items-center gap-3">
    Border Countries:
  <div className="flex-row flex gap-2">  {country.borders.map((border, index) => (
      <div className=" border-2 px-3  rounded-md"><span key={index} className="text-sm">{border} </span></div>
    ))}</div>
  </p>
)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
