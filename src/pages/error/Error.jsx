// import React from "react";

// function Error() {
//   return (
//     <div className="flex h-screen w-full overflow-hidden">
//       <div
//         className="w-full bg-cover  h-full"
//         style={{ backgroundImage: "url('/error2.png')" }}
//       ></div>

//       <div className="w-1/2 flex flex-col justify-center items-center bg-white relative">
//         <p className="text-stone-700 font-black text-[150px] ">404</p>
//         <p className="font-bold text-2xl text-gray-800">LOST SOMEWHERE !!</p>
//         <a href="/dashboard">
//           <button className="text-white font-bold text-md mt-10 bg-stone-800 rounded-xl p-3 hover:bg-stone-500 ">
//             Go Home
//           </button>
//         </a>
//       </div>
//     </div>
//   );
// }

// export default Error;

import React from "react";

function Error() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full max-w-7xl  mx-auto overflow-hidden">
      {/* Image Section */}
      <div
        className="w-full md:w-1/2 h-1/2 md:h-full  bg-center bg-contain bg-no-repeat"
        style={{ backgroundImage: "url('/error2.png')" }}
      ></div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white relative text-center px-4">
        <p
          className="text-stone-700 font-black 
                      text-7xl sm:text-8xl md:text-9xl lg:text-[150px]"
        >
          404
        </p>

        <p className="font-bold text-lg sm:text-xl md:text-2xl text-gray-800">LOST SOMEWHERE !!</p>

        <a href="/dashboard">
          <button className="text-white font-bold text-md mt-10 bg-stone-800 rounded-xl p-3 hover:bg-stone-500">
            Go Home
          </button>
        </a>
      </div>
    </div>
  );
}

export default Error;
