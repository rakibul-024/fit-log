import Image from "next/image";

export default function Navbar() {
  return (
    <div className="navbar bg-[#0a0a0c] border-b border-[#18191e] text-white px-6 lg:px-12 py-6">
      <div className="navbar-start flex items-center gap-2">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden p-1 min-h-0 h-auto text-gray-300"
          >
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-[#121316] text-white rounded-xl z-[1] mt-3 w-48 p-2 shadow-lg border border-gray-800"
          >
            <li>
              <a className="text-[#a8f000] font-semibold">Workouts</a>
            </li>
            <li>
              <a className="text-gray-400">My Plan</a>
            </li>
          </ul>
        </div>

        <a className="flex items-center gap-2.5 cursor-pointer">
          <Image
            src="/assets/logo.png"
            alt="FITLOG Logo"
            width={26}
            height={26}
            className="object-contain"
          />
          <span className="font-black text-xl tracking-wider text-white uppercase">
            FITLOG
          </span>
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-6">
          <li>
            <a className="px-5 py-2 rounded-full text-sm font-semibold text-[#ccff00] bg-[#1d2703] transition-all block">
              Workouts
            </a>
          </li>
          <li>
            <a className="px-2 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all block cursor-pointer">
              My Plan
            </a>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <span>Plan</span>
          <span className="bg-[#ccff00] text-black font-extrabold w-6 h-6 rounded-full flex items-center justify-center text-xs">
            0
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <span>Saved</span>
          <span className="border border-gray-700 text-white font-medium w-6 h-6 rounded-full flex items-center justify-center text-xs bg-transparent">
            0
          </span>
        </div>
      </div>
    </div>
  );
}
