import { ItemType } from "../dist/generated/prisma"

export function findType(url:  string) {
    if(url.includes("https://www.instagram.com")) {
        return ItemType.INSTAGRAM
    }else if(url.includes("https://x.com") || url.includes("https://twitter.com")) {
        return ItemType.TWITTER
    }else if(url.includes("https://pin.it")) {
        return ItemType.PINTEREST
    }else if(url.includes("https://youtu.be") || url.includes("https://www.youtube.com") || url.includes("https://youtube.com")) {
        return ItemType.YOUTUBE
    }else if(url.includes("https://www.linkedin.com")){
        return ItemType.LINKEDIN
    }else {
        return ItemType.LINK
    }
}