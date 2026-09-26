import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b border-[#18191e] bg-[#0a0a0c] text-white">
      <div className="container relative mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 px-4 py-6 sm:px-6 md:flex md:min-h-12 md:justify-between md:gap-4 lg:px-8">
        <div className="flex items-center gap-2 justify-self-start">
          <details className="relative md:hidden">
            <summary className="flex size-7 cursor-pointer list-none items-center justify-center rounded-md text-gray-300 transition-colors hover:bg-[#18191e] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ccff00] [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Toggle navigation menu</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="size-5"
              >
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </summary>
            <nav
              aria-label="Mobile navigation"
              className="absolute left-0 top-full z-50 mt-3 flex w-48 flex-col gap-1 rounded-lg border border-[#22242d] bg-[#121316] p-2 shadow-xl"
            >
              <Link
                href="/"
                aria-current="page"
                className="rounded-md bg-[#1a2703] px-3 py-2.5 text-xs font-semibold text-[#ccff00]"
              >
                Workouts
              </Link>
              <Link
                href="/my-plan"
                className="rounded-md px-3 py-2.5 text-xs text-gray-300 hover:bg-[#1a1b20] hover:text-white"
              >
                My Plan
              </Link>
            </nav>
          </details>

          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 whitespace-nowrap"
            aria-label="FitLog home"
          >
            <Image
              src="/assets/logo.png"
              alt=""
              width={18}
              height={18}
              className="object-contain"
            />
            <span className="text-xs font-black tracking-wide">FITLOG</span>
          </Link>
        </div>

        <nav
          aria-label="Main navigation"
          className="hidden items-center justify-self-center gap-1 md:order-2 md:flex"
        >
          <Link
            href="/"
            aria-current="page"
            className="whitespace-nowrap rounded-full bg-[#1a2703] px-4 py-1.5 text-[11px] font-semibold text-[#ccff00] transition-colors sm:px-5"
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className="whitespace-nowrap rounded-full px-4 py-1.5 text-[11px] font-medium text-gray-400 transition-colors hover:text-white sm:px-5"
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center justify-self-end gap-3 whitespace-nowrap text-[10px] text-gray-300 md:order-3 md:gap-5 md:text-[11px]">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <span>Plan</span>
            <span className="flex size-4 items-center justify-center rounded-full bg-[#ccff00] text-[9px] font-black text-black">
              0
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <span>Saved</span>
            <span className="flex size-4 items-center justify-center rounded-full border border-[#41434b] text-[9px] text-white">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
