// ==UserScript==
// @name         Automatically earn daily Microsoft Rewards points (a one-time search for random words)
// @namespace    AutoMS Rewards
// @version      1
// @description  This script adds a circular icon on the Bing page, which automatically searches for each of the 36 Random Words when clicked. After the search is complete, wait for 15 seconds and it close all search pages automatically.
// @author       Potaper & saitamasahil
// @match        https://www.bing.com/*
// @match        https://www.bing.co.in/*
// @license      GPL-3.0 license 
// ==/UserScript==

(function () {
    'use strict';

    // Create an element to represent the circular icon
    const icon = document.createElement('div');
    icon.style.position = 'fixed';
    icon.style.top = '90px';
    icon.style.left = '20px';
    icon.style.width = '30px';
    icon.style.height = '30px';
    icon.style.borderRadius = '50%';
    icon.style.backgroundColor = 'rgba(255, 192, 203, 0.6)';
    icon.style.cursor = 'pointer';
    icon.title = 'Search for random words';

    // Search for random words when the icon is clicked
    icon.addEventListener('click', function () {
        const words = [
            'car', 'cat', 'bus', 'dog', 'book', 'tree', 'cake', 'fish', 'star', 'moon',
            'pen', 'hat', 'cup', 'box', 'ball', 'bird', 'rock', 'rose', 'soap', 'coin',
            'key', 'map', 'pie', 'tea', 'toy', 'cow', 'egg', 'ice', 'sun', 'sky',
            'bed', 'bag', 'jar', 'net', 'web', 'art', 'arm', 'eye', 'ear', 'leg',
        ];

        const pages = [];

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const page = window.open(`https://bing.co.in/search?q=${encodeURIComponent(word)}`);
            pages.push(page);
        }

        // Close all search pages after 15 seconds
        setTimeout(function () {
            for (let i = 0; i < pages.length; i++) {
                const page = pages[i];
                page.close();
            }
        }, 15000);
    });

    // Append the icon to the document body
    document.body.appendChild(icon);
})();