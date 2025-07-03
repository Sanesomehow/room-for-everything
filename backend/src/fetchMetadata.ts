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

    const { body: html } = await got(url, {
        timeout: {
            request: 10000 // 10 sec
        }
    });

    if (type == ItemType.TWITTER) {
        const twitterUrl = new URL(url)
        const path = twitterUrl.pathname;
        const nitterUrl = `https://nitter.net/${path}`;
        try {
            const response = await fetch(nitterUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0',
                },
            })

            const html = await response.text();
            const $ = cheerio.load(html);

            const tweetText = $('.tweet-content').text().trim();
            const timestamp = $('a.tweet-date > span').attr('title') || null;
            const username = $('.tweet-header .username').text().trim();
            const displayName = $('.tweet-header .fullname').text().trim();
            const avatarUrl = $('.tweet-header .avatar > img').attr('src')?.startsWith('http')
                ? $('.tweet-header .avatar > img').attr('src')
                : `https://nitter.net${$('.tweet-header .avatar > img').attr('src')}`;

            const stats = $('.tweet-stats .icon-container');
            const replies = $(stats[0]).find('.icon').next().text().trim();
            const retweets = $(stats[1]).find('.icon').next().text().trim();
            const likes = $(stats[2]).find('.icon').next().text().trim();

            const images: string[] = [];
            $('.tweet-body .attachment.image > a').each((i, el) => {
                const href = $(el).attr('href');
                if (href) images.push(`https://nitter.net${href}`);
            });

            const links: string[] = [];
            $('.tweet-content a').each((i, el) => {
                const href = $(el).attr('href');
                if (href && !href.startsWith('/')) links.push(href);
            });
            console.log(
                tweetText
            )

            return {
                tweetText,
                timestamp,
                username,
                displayName,
                avatarUrl,
                stats,
                replies,
                retweets,
                likes,
                images,
                links
            }
        } catch (error) {
            console.error("failed to fetch metadata from nitter: ", error);
        }
    } else {
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