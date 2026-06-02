const pointer = document.getElementById('pointer');
const scaleWrapper = document.querySelector('.scale-wrapper');
const imageElement = document.getElementById('IMAGE');
const sliderContainer = document.getElementById('sliderContainer');
const angleSlider = document.getElementById('angleSlider');

// Image array
const images = [
    'level_1.webp',
    'level_2.webp',
    'level_3.webp',
    'level_4.webp',
    'level_5.webp',
    'level_6.webp',
    'level_7.webp',
    'level_8.webp',
    'level_9.webp',
    'level_10.webp',
    'level_11.webp',
    'level_12.webp'
];

const basePath = 'CortisolImages/';
const angleRange = 180; // Total rotation range in degrees
const minAngle = -90; // Starting angle

let lastAngle = 0;
let currentImageIndex = 0;

function updateImage(angle) {
    const normalizedAngle = angle - minAngle;
    const degreesPerImage = angleRange / images.length;
    const imageIndex = Math.floor(normalizedAngle / degreesPerImage);
    const clampedIndex = Math.max(0, Math.min(images.length - 1, imageIndex));
    
    if (clampedIndex !== currentImageIndex) {
        currentImageIndex = clampedIndex;
        imageElement.src = basePath + images[clampedIndex];
    }
}

// Unified function to handle rendering the angle updates
function setAngle(angle) {
    pointer.style.transform = `rotate(${angle}deg)`;
    updateImage(angle);
}


angleSlider.addEventListener('input', (e) => {
    const angle = parseFloat(e.target.value);
    setAngle(angle);
    updateImage(angle);
});

// Initialize at the slider's starting value
setAngle(parseFloat(angleSlider.value));

document.addEventListener('mousemove', (e) => {
    const rect = scaleWrapper.getBoundingClientRect();
    const wrapperCenterX = rect.left + rect.width / 2;
    const wrapperCenterY = rect.top + rect.height / 2;

    const deltaX = e.clientX - wrapperCenterX;
    const deltaY = e.clientY - wrapperCenterY;

    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    angle = angle - 90 + 180;

    const diff = angle - lastAngle;
    if (diff > 180) {
        angle -= 360;
    } else if (diff < -180) {
        angle += 360;
    }

    angle = Math.max(-90, Math.min(90, angle));
    lastAngle = angle;
    angleSlider.value = angle;
    setAngle(angle);
});

// Initialize with first image for desktop
imageElement.src = basePath + images[0];
