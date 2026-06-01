
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    const textInput = document.getElementById('textInput');
    const downloadBtn = document.getElementById('downloadBtn');

    // 1. Load your textless background image
    const img = new Image();
    // CHANGE THIS TO YOUR TEXTLESS IMAGE FILENAME
    img.src = 'background.jpg'; 

    // Once the image loads, initialize canvas sizes and draw
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        // Default starting text matching your original image style
        textInput.value = "Youtube Shorts\nis that\nway";
        drawMeme();
    };

    // 2. Function to draw image and wrap text onto the canvas
    function drawMeme() {
        // Clear canvas and draw base image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        // Configure Text Settings
        ctx.fillStyle = "black";
        ctx.font = "bold 90px sans-serif"; // Adjust size relative to your original image resolution
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Coordinates for the text area (Left side of the image)
        // Adjust these percentages depending on your background image proportions
        const centerX = canvas.width * 0.35; 
        const centerY = canvas.height * 0.45;
        const lineHeight = 110; // Space between lines

        // Split text by new lines
        const lines = textInput.value.split('\n');
        
        // Calculate total block height to perfectly center multiple lines vertically
        const totalHeight = (lines.length - 1) * lineHeight;
        let startY = centerY - (totalHeight / 2);

        // Draw each line
        lines.forEach((line) => {
            ctx.fillText(line, centerX, startY);
            startY += lineHeight;
        });
    }

    // 3. Listen to typing inputs to update preview in real-time
    textInput.addEventListener('input', drawMeme);

    // 4. Handle Download action
    downloadBtn.addEventListener('click', function() {
        const dataURL = canvas.toDataURL('image/jpeg', 0.9);
        const link = document.createElement('a');
        link.download = 'custom-meme.jpg';
        link.href = dataURL;
        link.click();
    });