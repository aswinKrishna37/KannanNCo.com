const pointer = document.getElementById('pointer');
const scaleWrapper = document.querySelector('.scale-wrapper');
const imageElement = document.getElementById('IMAGE');

// Image array - add/remove images here for future updates
const images = [
    '20250915_150348.jpg',
    '20260324_125527_012.jpg',
    '20260430_124326_001.jpg',
    'Bennet.png',
    'IMG-20251122-WA0044.jpg',
    'IMG-20251127-WA0046.jpg',
    'IMG-20260219-WA0013.jpg',
    'IMG-20260219-WA0021.jpg',
    'jinoy_snapchat (1).jpg',
    'jinoy_snapchat (2).jpg',
    'john_8k.jpg',
    'jon.png'
];

const basePath = 'CortisolImages/';
const angleRange = 180; // Total rotation range in degrees
const minAngle = -90; // Starting angle

let lastAngle = 0;
let currentImageIndex = 0;

function updateImage(angle) {
    // Calculate which image should be displayed based on angle
    // Normalize angle to 0-180 range
    const normalizedAngle = angle - minAngle;
    
    // Calculate how many degrees each image represents
    const degreesPerImage = angleRange / images.length;
    
    // Calculate image index (0 to images.length - 1)
    const imageIndex = Math.floor(normalizedAngle / degreesPerImage);
    
    // Ensure index is within bounds
    const clampedIndex = Math.max(0, Math.min(images.length - 1, imageIndex));
    
    // Only update if image changed
    if (clampedIndex !== currentImageIndex) {
        currentImageIndex = clampedIndex;
        imageElement.src = basePath + images[clampedIndex];
    }
}

// Pointer center coordinates (from cortisolpointer-coords.txt)
const pointerCenterX = 17;
const pointerCenterY = 111;

document.addEventListener('mousemove', (e) => {
    // Get the scale wrapper's position on the screen
    const rect = scaleWrapper.getBoundingClientRect();
    const wrapperCenterX = rect.left + rect.width / 2;
    const wrapperCenterY = rect.top + rect.height / 2;

    // Calculate the angle from pointer center to mouse cursor
    const deltaX = e.clientX - wrapperCenterX;
    const deltaY = e.clientY - wrapperCenterY;

    // Calculate angle in degrees (Math.atan2 returns radians)
    // atan2 uses (y, x) and returns angle where 0° is right, 90° is down
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    // Adjust angle so 0° points up (subtract 90°) and invert direction (+180°)
    angle = angle - 90 + 180;

    // Normalize angle to be closest to lastAngle to avoid jumps across 180/-180 boundary
    const diff = angle - lastAngle;
    if (diff > 180) {
        angle -= 360;
    } else if (diff < -180) {
        angle += 360;
    }

    // Clamp to upper semicircle (9 o'clock to 3 o'clock = -90° to 90°)
    // This puts the discontinuity boundary at 6 o'clock (180°), outside the designed region
    angle = Math.max(-90, Math.min(90, angle));

    lastAngle = angle;

    // Apply rotation to the pointer
    pointer.style.transform = `rotate(${angle}deg)`;
    
    // Update image based on pointer rotation
    updateImage(angle);
});

// Initialize with first image
imageElement.src = basePath + images[0];
