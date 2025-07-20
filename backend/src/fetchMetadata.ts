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
        }

    }else {
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