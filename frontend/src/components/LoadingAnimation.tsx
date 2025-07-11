import Animation from "../assets/Animation - 1751723329644.webm";

export function LoadingAnimation() {
    return (
        <div className="bg-background min-w-screen min-h-screen flex items-center justify-center">
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-64 h-64" // Adjust size as needed
            >
                <source src={Animation} type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}