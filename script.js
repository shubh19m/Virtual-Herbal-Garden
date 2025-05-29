// Virtual-Herbal-Garden/script.js

// --- Plant Data (Centralized for Search/Filter) ---
// This array will hold all your plant information.
// You can expand this with more details as needed for filtering or display.
const plantsData = [
    {
        id: 'ashoka', // Matches the HTML ID for direct linking
        name: 'Ashoka Tree',
        scientificName: 'Saraca asoca',
        commonNames: ['Ashoka', 'Sorrow-less tree', 'Asoca', 'Asokam'],
        uses: ['Gynecological Health', 'Anti-inflammatory', 'Skin Health', 'Digestive Aid', 'Antioxidant'],
        image: '/Virtual-Herbal-Garden/ashok tree.jpg',
        htmlFile: '/Virtual-Herbal-Garden/ashoka.html'
    },
    {
        id: 'begonias',
        name: 'Begonias',
        scientificName: 'Begonia spp.',
        commonNames: ['Wax Begonia', 'Tuberous Begonia', 'Rex Begonia'],
        uses: ['Ornamental', 'Air Quality Improvement'],
        image: '/Virtual-Herbal-Garden/begonias.jpg',
        htmlFile: '/Virtual-Herbal-Garden/begonias.html'
    },
    {
        id: 'neemtree',
        name: 'Neem Tree',
        scientificName: 'Azadirachta indica',
        commonNames: ['Neem', 'Kadulimb', 'Indian lilac'],
        uses: ['Skin Care', 'Oral Health', 'Antiseptic', 'Digestive Aid', 'Blood Purification', 'Pest Control'],
        image: '/Virtual-Herbal-Garden/kadulimb.jpg',
        htmlFile: '/Virtual-Herbal-Garden/neemtree.html'
    },
    {
        id: 'palm',
        name: 'Palm Tree',
        scientificName: 'Arecaceae',
        commonNames: ['Palm', 'Date palm', 'Coconut palm', 'Oil palm', 'Areca palm'],
        uses: ['Food Source', 'Building Materials', 'Erosion Control', 'Habitat Creation'],
        image: '/Virtual-Herbal-Garden/palm.jpg',
        htmlFile: '/Virtual-Herbal-Garden/palm.html'
    },
    {
        id: 'rose',
        name: 'Rose Plant',
        scientificName: 'Rosa spp.',
        commonNames: ['Rose', 'Gulab', 'Queen of Flowers'],
        uses: ['Ornamental', 'Medicinal (Rose oil, Rosewater)', 'Culinary', 'Aromatherapy'],
        image: '/Virtual-Herbal-Garden/rose plant.jpg',
        htmlFile: '/Virtual-Herbal-Garden/rose.html'
    },
    {
        id: 'vidhyaplant',
        name: 'Vidhya Plant',
        scientificName: 'Platycladus orientalis',
        commonNames: ['Oriental Arborvitae', 'Chinese Arborvitae', 'Biota'],
        uses: ['Ornamental', 'Traditional Medicine (e.g., for bleeding, respiratory issues)', 'Environmental Benefits'],
        image: '/Virtual-Herbal-Garden/vidya tree.jpg',
        htmlFile: '/Virtual-Herbal-Garden/vidhyaplant.html'
    },
    // Add other plants from view.html like Tulsi, Aloe Vera, Peppermint, Lemon Grass, Basil, Betel
    // Ensure you create individual HTML files for these plants first if you haven't already,
    // and provide a relevant image and Sketchfab model if available.
    {
        id: 'tulsi',
        name: 'Tulsi',
        scientificName: 'Ocimum sanctum',
        commonNames: ['Holy Basil'],
        uses: ['Immunity Booster', 'Respiratory Health', 'Stress Relief', 'Fever and Pain Relief', 'Digestive Health'],
        image: '/Virtual-Herbal-Garden/path_to_tulsi_image.jpg', // Replace with actual path
        htmlFile: '/Virtual-Herbal-Garden/tulsi.html' // Assuming you'll create this file
    },
    {
        id: 'aloe',
        name: 'Aloe Vera',
        scientificName: 'Aloe barbadensis miller',
        commonNames: ['Aloe'],
        uses: ['Skin Care', 'Digestive Health', 'Hydration', 'Wound Healing', 'Detoxification'],
        image: '/Virtual-Herbal-Garden/path_to_aloe_image.jpg', // Replace with actual path
        htmlFile: '/Virtual-Herbal-Garden/aloe.html' // Assuming you'll create this file
    },
    {
        id: 'mint',
        name: 'Peppermint',
        scientificName: 'Mentha piperita',
        commonNames: ['Mint'],
        uses: ['Nausea Relief', 'Headache Relief', 'Respiratory Support', 'Muscle Relaxation', 'Anti-inflammatory'],
        image: '/Virtual-Herbal-Garden/path_to_mint_image.jpg', // Replace with actual path
        htmlFile: '/Virtual-Herbal-Garden/mint.html' // Assuming you'll create this file
    },
    {
        id: 'grass',
        name: 'Lemon Grass',
        scientificName: 'Cymbopogon citratus',
        commonNames: ['Lemongrass'],
        uses: ['Detoxification', 'Fever Reduction', 'Weight Management', 'Respiratory Support', 'Blood Pressure Regulation'],
        image: '/Virtual-Herbal-Garden/path_to_lemongrass_image.jpg', // Replace with actual path
        htmlFile: '/Virtual-Herbal-Garden/grass.html' // Assuming you'll create this file
    },
    {
        id: 'basil',
        name: 'Basil',
        scientificName: 'Ocimum tenuiflorum',
        commonNames: ['Krishna Tulsi', 'Purple Holy Basil'],
        uses: ['Immunity Booster', 'Respiratory Health', 'Stress Relief', 'Diabetes Management', 'Heart Health'],
        image: '/Virtual-Herbal-Garden/path_to_basil_image.jpg', // Replace with actual path
        htmlFile: '/Virtual-Herbal-Garden/basil.html' // Assuming you'll create this file
    },
    {
        id: 'betel',
        name: 'Betel',
        scientificName: 'Piper betle',
        commonNames: ['Magai Paan'],
        uses: ['Digestive Aid', 'Oral Health', 'Wound Healing', 'Skin Care', 'Pain Relief'],
        image: '/Virtual-Herbal-Garden/betel.png', // This one already existed
        htmlFile: '/Virtual-Herbal-Garden/betel.html' // Assuming you'll create this file
    }
];


// --- Search and Filter Functionality for campus.html ---

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.nav-search input');
    const plantGrid = document.querySelector('.plant-grid'); // This is the container for all plant cards

    if (searchInput && plantGrid) { // Ensure elements exist on the page
        // Function to render plants based on a filtered array
        function renderPlants(filteredPlants) {
            plantGrid.innerHTML = ''; // Clear existing plants

            if (filteredPlants.length === 0) {
                plantGrid.innerHTML = '<p class="no-results">No plants found matching your search.</p>';
                return;
            }

            filteredPlants.forEach(plant => {
                const plantCard = document.createElement('a');
                plantCard.href = plant.htmlFile; // Link to the individual plant HTML file
                plantCard.classList.add('plant-card');
                plantCard.id = plant.id; // Assign ID for potential future use

                plantCard.innerHTML = `
                    <img src="${plant.image}" alt="${plant.name}">
                    <h3>${plant.name}</h3>
                `;
                plantGrid.appendChild(plantCard);
            });
        }

        // Initial rendering of all plants
        renderPlants(plantsData);

        // Event listener for search input
        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase();
            const filteredPlants = plantsData.filter(plant => {
                // Search by name, scientific name, and common uses (case-insensitive)
                const nameMatch = plant.name.toLowerCase().includes(searchTerm);
                const scientificNameMatch = plant.scientificName.toLowerCase().includes(searchTerm);
                const commonNamesMatch = plant.commonNames.some(common => common.toLowerCase().includes(searchTerm));
                const usesMatch = plant.uses.some(use => use.toLowerCase().includes(searchTerm));

                return nameMatch || scientificNameMatch || commonNamesMatch || usesMatch;
            });
            renderPlants(filteredPlants);
        });
    }

    // --- Bookmarks Functionality ---
    // This part will be executed on both campus.html and individual plant pages

    const bookmarkButtons = document.querySelectorAll('.bookmark-icon'); // Assuming you'll add this icon
    const myBookmarksPage = document.getElementById('my-bookmarks-list'); // Assuming a section or page for bookmarks

    // Function to get bookmarks from Local Storage
    function getBookmarks() {
        const bookmarks = localStorage.getItem('plantBookmarks');
        return bookmarks ? JSON.parse(bookmarks) : [];
    }

    // Function to save bookmarks to Local Storage
    function saveBookmarks(bookmarks) {
        localStorage.setItem('plantBookmarks', JSON.stringify(bookmarks));
    }

    // Function to toggle bookmark status
    function toggleBookmark(plantId) {
        let bookmarks = getBookmarks();
        const index = bookmarks.indexOf(plantId);

        if (index === -1) {
            // Add bookmark
            bookmarks.push(plantId);
            console.log(`Bookmarked: ${plantId}`);
        } else {
            // Remove bookmark
            bookmarks.splice(index, 1);
            console.log(`Unbookmarked: ${plantId}`);
        }
        saveBookmarks(bookmarks);
        updateBookmarkIcons(); // Update icons across the page
        displayBookmarks(); // Update bookmarks display if on bookmarks page
    }

    // Function to update the visual state of bookmark icons
    function updateBookmarkIcons() {
        const bookmarks = getBookmarks();
        document.querySelectorAll('[data-plant-id]').forEach(element => {
            const plantId = element.dataset.plantId;
            const bookmarkIcon = element.querySelector('.bookmark-icon'); // Find the icon within the element

            if (bookmarkIcon) {
                if (bookmarks.includes(plantId)) {
                    bookmarkIcon.classList.add('bookmarked');
                    bookmarkIcon.classList.remove('not-bookmarked');
                } else {
                    bookmarkIcon.classList.remove('bookmarked');
                    bookmarkIcon.classList.add('not-bookmarked');
                }
            }
        });
    }

    // Event listeners for bookmark buttons
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior if it's inside an <a>
            event.stopPropagation(); // Stop event from bubbling up to parent plant card
            const plantId = button.closest('[data-plant-id]').dataset.plantId;
            toggleBookmark(plantId);
        });
    });

    // Function to display bookmarks on a dedicated page/section
    function displayBookmarks() {
        if (myBookmarksPage) {
            const bookmarks = getBookmarks();
            myBookmarksPage.innerHTML = ''; // Clear existing list

            if (bookmarks.length === 0) {
                myBookmarksPage.innerHTML = '<p class="no-bookmarks">You have no bookmarked plants yet.</p>';
                return;
            }

            bookmarks.forEach(plantId => {
                const plant = plantsData.find(p => p.id === plantId);
                if (plant) {
                    const bookmarkItem = document.createElement('a');
                    bookmarkItem.href = plant.htmlFile;
                    bookmarkItem.classList.add('plant-card', 'bookmark-item'); // Reuse plant-card styling
                    bookmarkItem.dataset.plantId = plant.id;

                    bookmarkItem.innerHTML = `
                        <img src="${plant.image}" alt="${plant.name}">
                        <h3>${plant.name}</h3>
                        <span class="bookmark-icon fas fa-bookmark" title="Remove Bookmark"></span>
                    `;
                    myBookmarksPage.appendChild(bookmarkItem);
                }
            });
            // Re-attach listeners for dynamically added bookmark icons on the bookmarks page
            myBookmarksPage.querySelectorAll('.bookmark-icon').forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const plantId = button.closest('[data-plant-id]').dataset.plantId;
                    toggleBookmark(plantId);
                });
            });
        }
    }

    // Initial update of bookmark icons when the page loads
    updateBookmarkIcons();
    // Display bookmarks if on the bookmarks page
    displayBookmarks();

    // --- Notes Functionality (Simple Local Storage per plant) ---
    // This will be primarily used on individual plant detail pages

    const noteTextarea = document.getElementById('plant-note');
    const saveNoteButton = document.getElementById('save-note');
    const currentPlantId = document.body.dataset.plantId; // Assuming you add data-plant-id to body or a main container

    if (noteTextarea && saveNoteButton && currentPlantId) {
        // Load existing note
        const notes = JSON.parse(localStorage.getItem('plantNotes')) || {};
        noteTextarea.value = notes[currentPlantId] || '';

        saveNoteButton.addEventListener('click', () => {
            notes[currentPlantId] = noteTextarea.value;
            localStorage.setItem('plantNotes', JSON.stringify(notes));
            alert('Note saved!');
        });
    }

    // --- Implement a "Plant of the Day" (on index.html) ---
    const plantOfTheDaySection = document.getElementById('plant-of-the-day');
    if (plantOfTheDaySection) {
        // Simple daily refresh based on date to pick a consistent "plant of the day"
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();
        
        // Use a deterministic way to select a plant based on date
        const randomIndex = (day + month + year) % plantsData.length;
        const plantOfTheDay = plantsData[randomIndex];

        plantOfTheDaySection.innerHTML = `
            <h2>Plant of the Day!</h2>
            <div class="model-and-info">
                <div class="plant-model">
                    <a href="${plantOfTheDay.htmlFile}">
                        <img src="${plantOfTheDay.image}" alt="${plantOfTheDay.name}">
                    </a>
                </div>
                <div class="plant-info">
                    <h3><a href="${plantOfTheDay.htmlFile}">${plantOfTheDay.name}</a></h3>
                    <p><strong>Scientific Name:</strong> ${plantOfTheDay.scientificName}</p>
                    <p><strong>Common Uses:</strong> ${plantOfTheDay.uses.join(', ')}</p>
                    <p>Click the image or name to learn more about this amazing plant!</p>
                </div>
            </div>
        `;
    }
});