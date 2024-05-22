
type CardForm={
    name: string
    flags: {
        png: string;
    };
    population: number
    region: string
    capital: any
    darkMode:boolean
}
export default function Card({name,flags,population,region,capital,darkMode}:CardForm) {
  return (
    <div>
          <div className={`${darkMode?'border-white':'border-[#2B3743]'} w-[250px] rounded-md  border-2 shadow-xl h-[320px]`}>
              <div><img src={flags.png} className="w-[250px] h-[200px]" alt={`${name} flag`} /></div>
              <div className="px-3 py-3">
                  <p className="font-bold">{name}</p>
                  <p>Population: {population}</p>
                  <p>Region: {region}</p>
                  <p>Capital: {capital}</p>
              </div>
          </div> 
    </div>
  )
}
