import React from 'react'

const Hero = () => {
  return (
    <div>
      <div className="mt-4 bg-no-repeat bg-cover py-[10%] flex justify-center items-center " style={{ backgroundImage: `url(${'./homepageimage.png'})` }}>
        <div className="flex flex-col items-center justify-center gap-5 p-6 py-10 backdrop-blur-md bg-white/30 dark:bg-black/30 mobile:gap-0 mobile:p-2 mobile:-mt-2">
          <p className="text-6xl  text-center max-w-[1/6] drop-shadow-md mb-6 mobile:text-xl">
            <span className="text-[#3700B3] dark:text-[#BB86FC] ">Happiness </span>
            comes from your action.
          </p>
          <p className="text-lg text-center max-w-[2/3] mb-6 mobile:text-sm mobile:mb-3 mobile:-mt-3">
            Your donations make a significant impact in the lives of those in need. By contributing, you're helping to provide essential resources such as food, clothing, and medical supplies to underserved communities. Every donation, big or small, brings us one step closer to a world where everyone has access to the basic necessities of life.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#B00020] p-2 px-4 rounded-[118px] text-[#FFF] text-[1.2rem] border-white mobile:text-sm">
              Donate Now
            </button>
            <button className="p-2 rounded-[118px]  border border-black text-[1.2rem] bg-[#CF6679] mobile:text-sm">
              Watch a video
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Hero