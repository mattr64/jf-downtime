// Prevent caching - force reload from server
window.addEventListener('load', function() {
    // Add no-cache timestamp to prevent browser caching
    const timestamp = new Date().getTime();
    console.log('Page loaded at:', new Date().toLocaleString());
});

// Fun facts about fish and the ocean
const funFacts = [
    "🐠 Fish have been on Earth for more than 450 million years!",
    "🌊 The ocean covers 71% of the Earth's surface.",
    "🐡 Some fish can recognize their owners' faces!",
    "🦈 Sharks have been around longer than trees.",
    "🐟 The fastest fish can swim at speeds over 68 mph!",
    "🌊 More than 80% of the ocean remains unexplored.",
    "🐠 Clownfish can change their gender!",
    "🦀 The mantis shrimp can punch with the force of a bullet.",
    "🐳 Blue whales are the largest animals ever known to exist.",
    "🌊 The ocean produces more than 50% of the world's oxygen.",
    "🐟 Goldfish can see both infrared and ultraviolet light.",
    "🦑 Octopuses have three hearts and blue blood!",
    "🐠 Some fish can walk on land using their fins.",
    "🌊 The deepest point in the ocean is nearly 7 miles deep.",
    "🐡 Pufferfish can inflate to several times their normal size!"
];

// Display a random fun fact
function displayRandomFact() {
    const factElement = document.getElementById('funFact');
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    factElement.textContent = randomFact;
    
    // Add fade-in animation
    factElement.style.opacity = '0';
    setTimeout(() => {
        factElement.style.opacity = '1';
        factElement.style.transition = 'opacity 0.5s ease-in';
    }, 100);
}

// Rotate fun facts every 8 seconds
setInterval(displayRandomFact, 8000);

// Display migration start time
function displayMigrationTime() {
    const timeElement = document.getElementById('migrationTime');
    const now = new Date();
    const formattedTime = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    timeElement.textContent = formattedTime;
}

// Refresh page function with no-cache
function refreshPage() {
    // Force hard reload to bypass cache
    window.location.reload(true);
    
    // Fallback for modern browsers
    window.location.href = window.location.href + '?t=' + new Date().getTime();
}

// Add some interactivity to activity cards
function initActivityCards() {
    const cards = document.querySelectorAll('.activity-card');
    
    cards.forEach((card, index) => {
        // Staggered animation on load
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
        
        // Add click feedback
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 100);
        });
    });
}

// Easter egg: Konami code for extra fish
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Add extra swimming fish
    const body = document.body;
    for (let i = 0; i < 5; i++) {
        const fish = document.createElement('div');
        fish.innerHTML = '<i class="fas fa-fish"></i>';
        fish.style.position = 'fixed';
        fish.style.fontSize = '30px';
        fish.style.color = 'var(--primary-color)';
        fish.style.top = Math.random() * 100 + '%';
        fish.style.left = '-50px';
        fish.style.zIndex = '999';
        fish.style.animation = `swimAcross ${3 + Math.random() * 2}s linear`;
        fish.style.animationDelay = i * 0.5 + 's';
        body.appendChild(fish);
        
        setTimeout(() => fish.remove(), 6000);
    }
    
    // Show fun message
    const funFactCard = document.querySelector('.fun-fact-card');
    const originalText = funFactCard.innerHTML;
    funFactCard.innerHTML = '<h4><i class="fas fa-trophy me-2"></i>Konami Code Activated!</h4><p>🐠 Here come the fish! 🐠</p>';
    
    setTimeout(() => {
        funFactCard.innerHTML = originalText;
        displayRandomFact();
    }, 3000);
}

// Add swim across animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes swimAcross {
        from {
            left: -50px;
        }
        to {
            left: 110%;
        }
    }
`;
document.head.appendChild(style);

// Auto-check status every 30 seconds silently
// This will help users know when the site is back up
let checkInterval;

function autoCheckStatus() {
    checkInterval = setInterval(() => {
        // Try to fetch a test resource to see if the server is back
        fetch('/?status=check&t=' + new Date().getTime(), {
            cache: 'no-cache',
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        }).then(response => {
            // If you get a different response, you might want to redirect
            console.log('Status check at:', new Date().toLocaleTimeString());
        }).catch(error => {
            console.log('Still in maintenance mode');
        });
    }, 30000); // Check every 30 seconds
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    displayRandomFact();
    displayMigrationTime();
    initActivityCards();
    autoCheckStatus();
    
    console.log('%c🐠 The Fin - Server Migration Page 🐠', 'color: #4A90E2; font-size: 20px; font-weight: bold;');
    console.log('%cTry the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #50E3C2; font-size: 14px;');
});

// Clean up on unload
window.addEventListener('beforeunload', function() {
    if (checkInterval) {
        clearInterval(checkInterval);
    }
});
