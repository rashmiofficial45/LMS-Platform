import React from 'react'
import ReactPlayer from 'react-player'


// "use client";

// import dynamic from "next/dynamic";

// const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
interface VideoPlayerProps {
    url: string
}
// Render a YouTube video player
export default function VideoPlayer({ url }: VideoPlayerProps) {
    return (  // <-- Added return statement
        <div className='relative aspect-video'>
            <ReactPlayer
                url={url}
                width="100%"
                height="100%"
                controls
                playing={false}
            />
        </div>
    );

}