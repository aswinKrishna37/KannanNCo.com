document.getElementById('submitBtn').addEventListener('click', function() {
    const jokeInput = document.getElementById('jokeInput');
    const bennetImage = document.getElementById('bennetImage');
    
    if (jokeInput.value.trim() !== '') {
        // Toggle between bennet1.png and bennet2.png
        if (bennetImage.src.includes('bennet1.png')) {
            bennetImage.src = 'bennet2.png';
        } else {
            bennetImage.src = 'bennet1.png';
        }
        
        // Clear the text box
        jokeInput.value = '';
    }
});

// Allow submit with Enter key (Ctrl+Enter for textarea)
document.getElementById('jokeInput').addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
        document.getElementById('submitBtn').click();
    }
});
