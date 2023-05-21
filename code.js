// ==UserScript==
// @name         AutoMS-Rewards
// @version      1
// @description  This script adds a circular icon on the Bing page, which automatically searches for each of the 36 Random Words when clicked. After the search is complete, wait for 15 seconds and it close all search pages automatically.
// @author       Potaper & saitamasahil
// @match        https://www.bing.com/*
// @updateURL    https://github.com/saitamasahil/AutoMS-Rewards/raw/main/code.js
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
    icon.title = 'Click here to initiate a Bing random words search';

    // Create an element to represent the toggle switch
    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.style.position = 'fixed';
    toggle.style.top = '130px';
    toggle.style.left = '25px';
    toggle.title = 'Check this box to perform a search with random words from the English dictionary';

    // Define the list of predefined words
    const predefinedWords = [
        'car', 'cat', 'bus', 'dog', 'book', 'tree', 'cake', 'fish', 'star', 'moon',
        'pen', 'hat', 'cup', 'box', 'ball', 'bird', 'rock', 'rose', 'soap', 'coin',
        'key', 'map', 'pie', 'tea', 'toy', 'cow', 'egg', 'ice', 'sun', 'sky',
        'bed', 'bag', 'jar', 'net', 'web', 'art', 'arm', 'eye', 'ear', 'leg',
    ];

    // Define a function to get a random word from the English dictionary
    function getRandomWord() {
        // Fetch a random word from an online API
        return fetch('https://random-word-api.herokuapp.com/word?number=1')
            .then(response => response.json())
            .then(data => data[0])
            .catch(error => console.error(error));
    }

    // Search for random words when the icon is clicked
    icon.addEventListener('click', async function () {
        const pages = [];

        for (let i = 0; i < 36; i++) {
            let word;
            if (toggle.checked) {
                // Use a random word from the English dictionary
                word = await getRandomWord();
            } else {
                // Use a predefined word
                word = predefinedWords[i];
            }
            const page = window.open(`https://bing.com/search?q=${encodeURIComponent(word)}`);
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

    // Append the icon and the toggle to the document body
    document.body.appendChild(icon);
    document.body.appendChild(toggle);
})();