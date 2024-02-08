import React, { useState } from "react";

export default function Temp({ changeF, changeC }) {
  const [color, setColor] = useState('#585676');
  const [color2, setColor2] = useState('#A09FB1');

  const paintSky = () => {
    setColor(color2);
    setColor2(color);
  };

  return (
    <div className="absolute top-4 right-[75px] hidden md:block ">
      <button
        type="button"
        className="rounded-full  h-[40px] w-[40px] font-bold text-silver bg-[#585676] undefined mx-3"
        onClick={() => {
          changeC();
          paintSky();
        }}
        style={{ backgroundColor: color2 }}
      >
        °C
      </button>
      <button
        type="button"
        className="rounded-full  h-[40px] w-[40px] font-bold text-silver  bg-[#585676] undefined "
        onClick={() => {
          changeF();
          paintSky();
        }}
        style={{ backgroundColor: color }}
      >
        °F
      </button>
    </div>
  );
}
