// ==UserScript==
// @name         AutoMS-Rewards
// @version      3.3
// @description  This lets you search random words on Bing. It adds a circular Orange icon on Microsoft rewards section. You can choose the number of searches & source of the words(Either predefined or random words from English dictionary), and the code will open search tabs. After 15 seconds, all tabs will be closed automatically. This script is originally made by Potaper & I added some more features like searching random words from English dictionary & change number of searches.
// @author       Potaper & saitamasahil
// @match        https://www.bing.com/*
// @updateURL    https://github.com/saitamasahil/AutoMS-Rewards/raw/main/code.js
// @downloadURL  https://github.com/saitamasahil/AutoMS-Rewards/raw/main/code.js
// @license      GPL-3.0 license
// ==/UserScript==

(function () {
    'use strict';

    // Create an element to represent the circle icon
    const icon = document.createElement('div');
    icon.style.position = 'fixed';
    icon.style.top = '90px';
    icon.style.left = '20px';
    icon.style.width = '30px';
    icon.style.height = '30px';
    icon.style.borderRadius = '50%'; // Make it a circle
    icon.style.backgroundColor = 'orange'; // Change the color
    icon.style.cursor = 'pointer';
    icon.title = 'Click here to initiate a Bing random words search';

    // Create an element to represent the container for the other options
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '130px';
    container.style.left = '20px';
    container.style.width = '250px';
    container.style.height = '72px';
    container.style.backgroundColor = 'lightcoral';
    container.style.display = 'none'; // Hide the container by default

    // Create an element to represent the search button
    const searchButton = document.createElement('button');
    searchButton.textContent = '🔎 Click here to search';
    searchButton.style.margin = '6px';
    searchButton.title = 'Click this button to start the search';

    // Create an element to represent the toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = '📚 Search from dictionary';
    toggleButton.title = 'Make this button highlighted by clicking it to perform a search with random words from the English dictionary';
    toggleButton.style.backgroundColor = 'white'; // Show white color by default
    toggleButton.style.margin = '6px';

    // Create a variable to store the toggle state
    let toggleState = false;

    // Create an element to represent the dropdown button
    const dropdown = document.createElement('select');
    dropdown.title = 'Select the number of searches you want to perform';

    // Add options to the dropdown button
    const options = [40, 35, 30, 25, 20, 15, 10, 5];
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement('option');
        option.value = options[i];
        option.text = options[i];
        dropdown.appendChild(option);
    }

    // Define the list of predefined words
    const predefinedWords = [
        'car', 'cat', 'bus', 'dog', 'book', 'tree', 'cake', 'fish', 'star', 'moon',
        'pen', 'hat', 'cup', 'box', 'ball', 'bird', 'rock', 'rose', 'soap', 'coin',
        'key', 'map', 'pie', 'tea', 'toy', 'cow', 'egg', 'ice', 'sun', 'sky',
        'bed', 'bag', 'jar', 'net', 'web', 'art', 'arm', 'eye', 'ear', 'leg',
    ];

    // Define a function to get random words from the English dictionary
    async function getRandomWords(count) {
        try {
            const response = await fetch(`https://random-word-api.herokuapp.com/word?number=${count}`);
            const words = await response.json();
            return words;
        } catch (error) {
            console.error('Error fetching random words:', error);
            return [];
        }
    }

    // Search for random words when the search button is clicked
    searchButton.addEventListener('click', async function () {
        const pages = [];

        // Get the selected number of searches from the dropdown button
        const limit = parseInt(dropdown.value);

        let words;
        if (toggleState) {
            // Use random words from the English dictionary
            words = await getRandomWords(limit);
        } else {
            // Use predefined words
            words = predefinedWords.slice(0, limit);
        }

        for (let i = 0; i < limit; i++) {
            const word = words[i] || 'fallback'; // Use a fallback word in case of error
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

    // Toggle the color and the state of the toggle button when clicked
    toggleButton.addEventListener('click', function () {
        toggleState = !toggleState;
        toggleButton.style.backgroundColor = toggleState ? 'pink' : 'white'; // Toggle colors
    });

    // Toggle the visibility of the container when the icon is clicked
    icon.addEventListener('click', function () {
        container.style.display = container.style.display === 'none' ? 'block' : 'none';
    });

    // Append the icon and the container to the document body
    document.body.appendChild(icon);
    document.body.appendChild(container);

    // Append the search button, the toggle button, and the dropdown to the container
    container.appendChild(searchButton);
    container.appendChild(toggleButton);
    container.appendChild(dropdown);
})();
