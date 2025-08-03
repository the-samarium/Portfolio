import React from 'react'

const Informal = () => {

  return (
    <div className="w-full h-auto p-3 border border-black bg-black rounded-b-md text-white">

      <div className="card w-full p-3 sm:p-5 flex flex-col lg:flex-row gap-4 sm:gap-6 border border-black mt-4 dark:border-slate-600" style={{ fontFamily: 'Caveat, sans-serif', fontSize: "18px" }}>

        <div className="flex-1 flex flex-col">
          <h3 className="text-base sm:text-lg font-semibold mb-2">Hi there,</h3>
          <p className="text-lg sm:text-base leading-relaxed">
            I can code for hours fueled by nothing but coffee and my incredibly diverse playlist! When I'm not debugging, you'll catch me binge-watching sci-fi series, exploring foreign films, rewatching comfort shows for the hundredth time, or discovering hidden gem documentaries. My music taste knows no boundaries—I literally. There's always something playing that matches my coding energy.
          </p>
          <div className='mt-5'>
            <p className="text-sm sm:text-base leading-relaxed">Watching :</p>
            <div className='bg-white w-[65px] h-[65px] rounded-sm content-fit border border-white mt-5'>
              <img src="/Assets/reacher.jpg" alt="reacher" />
            </div>
          </div>
        </div>
        {/* Spotify Playlist Section */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: '6px' }}
            src="https://open.spotify.com/embed/playlist/00L6YaFg8TlZC30ktupQGQ?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            loading="lazy"
          />
        </div>

      </div>

    </div>

  )
}

export default Informal