import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-11">
      <div className="container mx-auto max-w-7xl">
        <div className="flex min-h-[244px] flex-col items-start justify-between gap-5 overflow-hidden rounded-xl border border-[#22242d] bg-[#14161d] px-5 py-6 sm:flex-row sm:items-center sm:gap-4 sm:px-8 sm:py-7 lg:min-h-[410px] lg:px-[52px] lg:py-10">
          <div className="relative z-10 w-full sm:w-[68%]">
            <p className="mb-3 text-[9px] font-bold tracking-[0.12em] text-[#ccff00] sm:text-[10px]">
              WORKOUT LIBRARY
            </p>
            <h1 className="display-heading mb-4 text-[2.25rem] uppercase leading-[0.92] tracking-[-0.035em] text-white sm:text-[2rem] lg:text-[3.75rem]">
              TRAIN WITH INTENT. LOG
              <br />
              EVERY SET.
            </h1>
            <p className="mb-5 max-w-[440px] text-[11px] leading-[1.65] text-[#92949f] sm:text-xs lg:text-sm">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <a
              href="#library"
              className="inline-flex min-h-9 items-center gap-2 rounded-md bg-[#ccff00] px-4 text-[9px] font-bold tracking-wide text-black transition-colors hover:bg-[#b7e600] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ccff00] lg:px-[19px]"
            >
              BROWSE WORKOUTS
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                className="size-3.5"
              >
                <path
                  d="M3.25 8h9.5m0 0L8.5 3.75M12.75 8 8.5 12.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className="relative mx-auto h-48 w-full max-w-[230px] shrink-0 sm:mx-0 sm:h-44 sm:w-[28%] sm:max-w-none lg:h-[300px]">
            <Image
              src="/assets/banner.png"
              alt="Athlete training on a weight machine"
              fill
              priority
              sizes="(max-width: 639px) 230px, (max-width: 1023px) 28vw, 300px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
