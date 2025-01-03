'use client'
import { Button } from "@/components/ui/button"

export default function Home() {

  return (
    <div className="bg-zinc-950 text-white font-sans h-screen w-screen flex flex-col justify-center items-center">
      <div className="flex justify-center items-center">
        <h1 className="text-6xl font-bold">
          Interview Bit 
        </h1>
        <div className="text-6xl gap-2 p-4 font-extralight">
          |
        </div>
        <div className="text-sm mt-3 font-sans">
          <div>
            Prepare <br />
            Interview <br />
            Repeat <br />
          </div>
        </div>
      </div>
      <div className="text-sm text-slate-300 mt-2">
        &quot;An AI assisted platform to help you prepare for your interviews&quot;
      </div>
      <div className="mt-4">
          <Button onClick={() => 
            {
              window.location.href = '/chat';
            }
          } className="bg-white text-black hover:bg-zinc-400">Try Now</Button>
      </div>
    </div>
  )
}
