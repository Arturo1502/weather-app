import React from "react";

export default function Weak({ keys, forecastData, isFahrenheit }) {
    return (
        <section
            className="p-12 md:p-0 md:pb-12 grid md:grid-cols-1 grid-cols-2  gap-7 w-full
            sm:grid-cols-3 
            lg:grid-cols-3
            xl:grid-cols-5"
        >
            {keys.slice(0, 5).map((day) => {
                const minTemp = Math.floor(forecastData[day].minTemp);
                const minTempF = Math.floor(minTemp * (9 / 5) + 32)

                const maxTemp = Math.floor(forecastData[day].maxTemp);
                const maxTempF = Math.floor(maxTemp * (9 / 5) + 32)

                const weather = forecastData[day].weather;
                return (
                    <article
                        className="w-[100%] h-[200px] flex flex-col items-center bg-blue-1 pb-4 pt-5 px-3 m-auto "
                        key={day}
                    >
                        <p className="text-base font-medium pb-3">{day} </p>
                        <img
                            className="w-14 pb-8"
                            src={`/${weather}.png`}
                            alt={`/${weather}.png`}
                        />
                        <div className="flex gap-8">
                            <span>{isFahrenheit ? maxTempF + '°F' : maxTemp + '°C'} </span>
                            <span className="text-gray-2">{isFahrenheit ? minTempF + '°F' : minTemp + '°C'}</span>
                        </div>
                    </article>
                );
            })}
        </section>

    );
}
