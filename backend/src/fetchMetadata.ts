import { ItemType } from "../dist/generated/prisma"
import fetch from "node-fetch";
import cheerio from "cheerio";
import metascraper from 'metascraper';
import metascraperDescription from 'metascraper-description';
import metascraperImage from 'metascraper-image';
import metascraperTitle from 'metascraper-title';
import metascraperUrl from 'metascraper-url';
import got from "got";
import { use } from "passport";



export async function fetchMetadata({ url, type }: {
    url: string,
    type: string
}) {

    if (type == ItemType.TWITTER) {

        const params = new URLSearchParams({
            omit_script: 'true',
            format: 'json',
            theme: 'dark',
            hide_thread: 'true',
            hide_media: 'false',
            maxwidth: '550'
        });
        try {
            const fetchResponse = await fetch(`https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&${params.toString()}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'application/json'
            }
        });

            if (!fetchResponse.ok) {
                throw new Error(`Twitter API returned status ${fetchResponse.status}`);
            }

            const data = await fetchResponse.json();
            return data
        } catch(error) {
            console.error("failed to fetch tweet: ", error);
            return { url };
        }

    } else if(type === ItemType.YOUTUBE) {
        let processedUrl = url;
        if (url.includes("youtu.be/")) {
            const videoId = url.split("youtu.be/")[1].split("?")[0]; // Extract ID before any query params
            processedUrl = `https://www.youtube.com/watch?v=${videoId}`;
        }
        
        const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(processedUrl)}&format=json`;

        try {
            const fetchResponse = await fetch(oembedUrl);

            if(!fetchResponse.ok) {
                console.error(`YouTube oEmbed returned status: ${fetchResponse.status}`);
                return { url };
            }

            const data = await fetchResponse.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch YouTube video metadata:", error);
            return { url };
        }
    } else {
        const { body: html } = await got(url, {
            timeout: {
                request: 10000 // 10 sec
            }
        });
        const scraper = metascraper([
            metascraperTitle(),
            metascraperDescription(),
            metascraperImage(),
            metascraperUrl()
        ]);

        try {
            const previewData = await scraper({ html, url });
            console.log('Available metadata:', previewData);
            return previewData;
        } catch (error) {
            console.error('Error fetching metadata:', error);
            return { url };
        }
    }
}