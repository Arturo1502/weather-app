import React from "react";
import { ArrowIcon } from "./Icons";

export default function Today({ weatherData, isMph }) {
    return (
        <><h3 className="text-2xl font-bold pb-8">Today’s Highlights </h3>

            <section
                className="p-2"
            >

                <div
                    className="grid md:grid-cols-1 md:m-0 gap-7 w-full   sm:grid-cols-1    lg:grid-cols-2   xl:grid-cols-2">
                    <article className="flex flex-col items-center bg-blue-1 max-sm:w-[100%] sm:w-[100%] h-[204px] px-[12px] py-[18px] ">
                        <p className="text-base font-medium pb-2">Wind status</p>
                        <p className="text-6xl font-bold">

                            {isMph
                                ? Math.floor(weatherData.windStatus * 2.23694)
                                : weatherData.windStatus}

                            <span className="text-5xl font-medium">{isMph ? "mph" : "mps"}</span>
                        </p>
                        <div className="flex items-center pt-5 gap-4">
                            <span id="windStatus" className="bg-gray-4 p-3 rounded-full">
                                <ArrowIcon />
                            </span>
                            <span>WSW</span>
                        </div>
                    </article>

                    <article className="flex flex-col items-center bg-blue-1 w-[100%] h-[204px] py-4 px-12 ">
                        <p className="text-base font-medium pb-2">Humidity</p>
                        <p className="text-6xl font-bold">
                            {weatherData.humidity}
                            <span className="text-5xl font-medium">%</span>
                        </p>
                        <div className="flex justify-between w-full pt-4">
                            <span>0</span>
                            <span>50</span>
                            <span>100</span>
                        </div>
                        <div className="w-full h-2 bg-gray-1 rounded-full overflow-hidden">
                            <div
                                id="progress"
                                className="h-full bg-yellow-1 transition-all duration-300"
                            />
                        </div>
                        <span className="flex justify-end w-full">%</span>
                    </article>

                    <article className="flex flex-col items-center bg-blue-1 w-[100%] h-[204px] p-6 justify-center">
                        <p className="text-base font-medium pb-2 ">Visibility</p>
                        <p className="text-6xl font-bold">
                            {weatherData.visibilityInMiles.toFixed(1)}{" "}
                            <span className="text-5xl font-medium">miles</span>
                        </p>
                    </article>

                    <article className="flex flex-col items-center bg-blue-1 w-[100%] h-[204px] p-6 justify-center">
                        <p className="text-base font-medium pb-2">Air Pressure</p>
                        <p className="text-6xl font-bold">
                            {weatherData.airPressure}{" "}
                            <span className="text-5xl font-medium">mb</span>
                        </p>
                    </article>
                </div>
            </section>
        </>
    );
}
