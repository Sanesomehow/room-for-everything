import Animation from "../assets/Animation - 1751294931059.webm";

export function LoadingAnimation() {
    return <div className="bg-background min-w-screen min-h-screen flex items-center justify-center">
        <iframe src={Animation} ></iframe>
    </div>
}