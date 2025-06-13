import { Spinner } from "flowbite-react";

export const LoadingSpinner = () => {
    return <div>
        <Spinner aria-label="loading spinner" />
        <p>Loading...</p>
    </div>
}