let unfunnyKeywords = [];

// Fetch the keywords from the JSON file
fetch('keywords.json')
    .then(response => response.json())
    .then(data => {
        if (data && Array.isArray(data.keywords)) {
            unfunnyKeywords = data.keywords;
        }
    })
    .catch(error => {
        console.error('Error loading keywords.json:', error);
    });

document.getElementById('submitBtn').addEventListener('click', function() {
    const jokeInput = document.getElementById('jokeInput');
    const bennetImage = document.getElementById('bennetImage');
    const formContainer = document.querySelector('.form-container');
    const successContainer = document.getElementById('successContainer');
    const successMessage = document.getElementById('successMessage');
    
    const jokeText = jokeInput.value.trim();
    if (jokeText !== '') {
        // Check if the joke contains any unfunny keyword (case-insensitive)
        const jokeTextLower = jokeText.toLowerCase();
        const hasUnfunnyKeyword = unfunnyKeywords.some(keyword => 
            jokeTextLower.includes(keyword.toLowerCase())
        );

        if (hasUnfunnyKeyword) {
            // Set image to unamused Bennet
            bennetImage.src = 'Assets/bennet3.webp';
            successMessage.textContent = 'Bennet was not amused... That joke is unfunny!';
        } else {
            // Change image to laughing Bennet
            bennetImage.src = 'Assets/bennet2.png';
            successMessage.textContent = 'You made Bennet laugh!';
        }
        
        // Hide the joke input form container
        formContainer.classList.add('hidden');
        
        // Show the success message and "Tell another joke" button
        successContainer.classList.remove('hidden');
        
        // Clear the text box
        jokeInput.value = '';
    }
});

document.getElementById('resetBtn').addEventListener('click', function() {
    const bennetImage = document.getElementById('bennetImage');
    const formContainer = document.querySelector('.form-container');
    const successContainer = document.getElementById('successContainer');
    
    // Reset image to standard Bennet
    bennetImage.src = 'Assets/bennet1.png';
    
    // Hide the success message and button
    successContainer.classList.add('hidden');
    
    // Show the joke input form container
    formContainer.classList.remove('hidden');
    
    // Focus back on the input for another joke
    document.getElementById('jokeInput').focus();
});

// Allow submit with Enter key (Shift+Enter inserts a newline instead)
document.getElementById('jokeInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        document.getElementById('submitBtn').click();
    }
});
