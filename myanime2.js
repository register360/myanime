document.addEventListener('DOMContentLoaded', function() {
    // Sample anime data with enhanced structure
    const animeData = [
        {
            id: 1,
            title: "WIND BREAKER Season 2",
            cover: "images/wind_breaker.jpg",
            rating: 4.8,
            episodes: 12,
            status: "Ongoing",
            description: "Welcome back to Furth High School...",
            category: ["trending", "new"],
            episodeSources: [
                "",
                "videos/wind_breaker_2.mp4",
                // ... more episodes
            ]
        },
        {
            id: 2,
            title: "Demon Slayer: Kimetsu no Yaiba",
            cover: "images/demon_slayer.jpg",
            rating: 4.9,
            episodes: 26,
            status: "Completed",
            description: "Tanjiro Kamado, a kindhearted boy who sells charcoal for a living, finds his family slaughtered by a demon.",
            category: ["popular"],
            episodeSources: [" "]
        },
        {
            id: 3,
            title: "Attack on Titan",
            cover: "images/attack_on_titan.jpg",
            rating: 4.9,
            episodes: 16,
            status: "Completed",
            description: "Eren Yeager and his friends fight to save humanity from the Titans in this action-packed final season.",
            category: ["trending", "popular"],
            episodeSources: [
                "https://player.vimeo.com/video/1078721283?badge=0&amp",
                "https://player.vimeo.com/video/1078738169?h=2a8d3548b9&amp",
             ]
        },
        {
            id: 4,
            title: "Jujutsu Kaisen",
            cover: "images/jjk.jpg",
            rating: 4.7,
            episodes: 24,
            status: "Completed",
            description: "Yuji Itadori swallows a cursed talisman and becomes host to a powerful curse.",
            category: ["popular"],
            episodeSources: [
                "https://player.vimeo.com/video/1078720743?badge=0&amp",
                "https://player.vimeo.com/video/1078720979?badge=0&amp",
                "https://player.vimeo.com/video/1078741228?h=826489d858&amp",
            ]
        },
        {
            id: 5,
            title: "My Hero Academia Season 6",
            cover: "images/my_hero_Academia.jpg",
            rating: 4.6,
            episodes: 25,
            status: "Completed",
            description: "Izuku Midoriya and his classmates face their biggest challenge yet in this season of My Hero Academia.",
            category: ["trending"]
        },
        {
            id: 6,
            title: "Chainsaw Man",
            cover: "images/chainsaw_man.jpg",
            rating: 4.8,
            episodes: 12,
            status: "Completed",
            description: "Denji is a young man who will do anything for money, even hunting down devils with his pet devil Pochita.",
            category: ["new"]
        },
        {
            id: 7,
            title: "Sakamoto Days",
            cover: "images/sakamoto.jpg",
            rating: 4.9,
            episodes: 11,
            status: "Completed",
            description: "Tarou Sakamoto was considered the greatest hitman of all time. Feared by many, he stood at the top of the underground world until he met and fell in love with a woman. As a result, Sakamoto abandoned his life of crime and now works as a convenience store clerk. Leaving his shady past behind proves more difficult than Sakamoto initially imagined. Many of his former rivals and partners do not believe that he has truly left the business and show up in hopes of taking him out. Barred from killing, Sakamoto must find creative ways to subdue his enemies and prevent them from bringing harm to his family, his store, and the small town he resides in",
            category: ["popular"]
        },
        {
            id: 8,
            title: "Solo Leveling Season 2",
            cover: "images/solo_leveling.jpg",
            rating: 4.7,
            episodes: 25,
            status: "Completed",
            description: "Sung Jin-Woo, dubbed the weakest hunter of all mankind, grows stronger by the day with the supernatural powers he has gained.",
            category: ["trending"],
            episodeSources: [
    "https://player.vimeo.com/video/1078742723?h=4d0ca6454f&amp",
        ]
        }
    
    ];

    // DOM Elements Cache
    const elements = {
        navLinks: document.querySelectorAll('.nav-link'),
        pages: document.querySelectorAll('.page'),
        animeGrids: document.querySelectorAll('.anime-grid'),
        filterBtns: document.querySelectorAll('.filter-btn'),
        hamburger: document.querySelector('.hamburger'),
        navMenu: document.querySelector('.nav-menu'),
        modal: document.getElementById('anime-modal'),
        closeModal: document.querySelector('.close-modal'),
        backToTop: document.querySelector('.back-to-top'),
        contactForm: document.getElementById('contact-form'),
        footerLinks: document.querySelectorAll('.footer-links a'),
        socialLinks: document.querySelectorAll('.social-links a')
    };

    // Initialize the application
    function init() {
        loadFeaturedAnime();
        loadAllAnime();
        setupEventListeners();
        handleExternalNavigation();
        setupFormValidation();
        setupStarRating();
    }

    // Load featured anime (4 random anime)
    function loadFeaturedAnime() {
        const featuredGrid = document.querySelector('#home .anime-grid');
        if (!featuredGrid) return;
        
        const shuffled = [...animeData].sort(() => 0.5 - Math.random());
        const featuredAnime = shuffled.slice(0, Math.min(4, shuffled.length));
        
        featuredGrid.innerHTML = featuredAnime.map(createAnimeCard).join('');
        setupAnimeCardEvents('#home .anime-card');
    }

    // Load all anime with optional filtering
    function loadAllAnime(filter = 'all') {
        const allAnimeGrid = document.getElementById('all-animes');
        if (!allAnimeGrid) return;
        
        const filteredAnime = filter === 'all' 
            ? animeData 
            : animeData.filter(anime => anime.category.includes(filter));
        
        allAnimeGrid.innerHTML = filteredAnime.map(createAnimeCard).join('');
        setupAnimeCardEvents('#all-animes .anime-card');
    }

    // Create anime card HTML
    function createAnimeCard(anime) {
        // Check if episodeSources is empty or contains only empty strings
        const hasEpisodes = anime.episodeSources && 
                            anime.episodeSources.length > 0 && 
                            anime.episodeSources.some(src => src.trim() !== '');
        
        const statusBadge = !hasEpisodes ? '<div class="not-uploaded-badge">Not Yet Uploaded</div>' : '';
        
        return `
            <div class="anime-card" data-id="${anime.id}">
                <img src="${anime.cover}" alt="${anime.title}" class="anime-cover" loading="lazy">
                ${statusBadge}
                <div class="anime-info">
                    <h3 class="anime-title">${anime.title}</h3>
                    <div class="anime-meta">
                        <span><i class="fas fa-star"></i> ${anime.rating}</span>
                        <span>${anime.episodes} eps</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Set up click events for anime cards
    function setupAnimeCardEvents(selector) {
        document.querySelectorAll(selector).forEach(card => {
            card.addEventListener('click', function() {
                const animeId = parseInt(this.getAttribute('data-id'));
                openAnimeModal(animeId);
            });
        });
    }

    // Open anime modal with details
    function openAnimeModal(animeId) {
        const anime = animeData.find(a => a.id === animeId);
        if (!anime) return;
        
        // Update modal content
        document.getElementById('modal-anime-img').src = anime.cover;
        document.getElementById('modal-anime-title').textContent = anime.title;
        document.getElementById('modal-anime-desc').textContent = anime.description;
        document.getElementById('modal-anime-rating').textContent = anime.rating;
        document.getElementById('modal-anime-episodes').textContent = anime.episodes;
        document.getElementById('modal-anime-status').textContent = anime.status;
        
        // Generate episodes list
        const episodesList = document.getElementById('episodes-list');
        episodesList.innerHTML = '';
        
        for (let i = 1; i <= anime.episodes; i++) {
            const episode = document.createElement('div');
            episode.className = 'episode';
            episode.innerHTML = `
                <span>Episode ${i}</span>
                <button class="watch-episode-btn" data-episode="${i}">
                    <i class="fas fa-play"></i> Watch
                </button>
            `;
            episodesList.appendChild(episode);
        }
        
        // Add click events to watch buttons
        document.querySelectorAll('.watch-episode-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const episodeNum = parseInt(this.getAttribute('data-episode'));
                playEpisode(animeId, episodeNum);
            });
        });
        
        // Show modal
        elements.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function playEpisode(animeId, episodeNum) {
        const anime = animeData.find(a => a.id === animeId);
        if (!anime) return;

        // Close any existing video player
        closeVideoPlayer();

        let videoContainer = document.getElementById('video-player-container');
        if (!videoContainer) {
            videoContainer = document.createElement('div');
            videoContainer.id = 'video-player-container';
            videoContainer.className = 'video-player-container';
            document.body.appendChild(videoContainer);
        }

        // Check if this is a Vimeo URL
        const isVimeo = anime.episodeSources[episodeNum-1]?.includes('vimeo.com');
        
        if (isVimeo) {
            // Vimeo player HTML
            videoContainer.innerHTML = `
                <div class="video-player vimeo-player">
                    <div class="video-header">
                        <h3>${anime.title} - Episode ${episodeNum}</h3>
                        <button class="close-video" aria-label="Close video player">&times;</button>
                    </div>
                    <div class="vimeo-embed-container" style="padding:56.25% 0 0 0;position:relative;">
                        <iframe src="${anime.episodeSources[episodeNum-1]}&autoplay=1&muted=0" 
                                frameborder="0" 
                                allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
                                style="position:absolute;top:0;left:0;width:100%;height:100%;"
                                title="${anime.title} Episode ${episodeNum}">
                        </iframe>
                    </div>
                    <div class="episodes-list-container">
                        <h4>Episodes</h4>
                        <div class="episodes-scrollable">
                            ${Array.from({length: anime.episodes}, (_, i) => `
                                <div class="video-episode ${i+1 === episodeNum ? 'active' : ''}">
                                    <span>Episode ${i+1}</span>
                                    <button class="play-episode-btn" data-episode="${i+1}">
                                        <i class="fas fa-play"></i>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            // Load Vimeo player API
            const script = document.createElement('script');
            script.src = 'https://player.vimeo.com/api/player.js';
            document.body.appendChild(script);
            
        } else {
            // Regular HTML5 video player
            videoContainer.innerHTML = `
                <div class="video-player">
                    <div class="video-header">
                        <h3>${anime.title} - Episode ${episodeNum}</h3>
                        <button class="close-video" aria-label="Close video player">&times;</button>
                    </div>
                    <video controls autoplay playsinline>
                        <source src="${anime.episodeSources[episodeNum-1]}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <div class="video-controls-bar">
                        <div class="progress-container">
                            <div class="progress-bar"></div>
                        </div>
                        <div class="controls-container">
                            <div class="left-controls">
                                <button class="skip-backward" title="Rewind 10 seconds">
                                    <i class="fas fa-undo"></i> 10s
                                </button>
                                <button class="play-pause">
                                    <i class="fas fa-play"></i>
                                </button>
                                <button class="skip-forward" title="Forward 10 seconds">
                                    10s <i class="fas fa-redo"></i>
                                </button>
                                <span class="time-display">00:00 / 24:27</span>
                            </div>
                            <div class="right-controls">
                                <div class="quality-selector">
                                    <button class="quality-btn">
                                        <i class="fas fa-cog"></i> Quality
                                    </button>
                                    <div class="quality-dropdown">
                                        <div data-quality="auto">Auto</div>
                                        <div data-quality="1080">1080p</div>
                                        <div data-quality="720">720p</div>
                                        <div data-quality="480">480p</div>
                                    </div>
                                </div>
                                <button class="download-btn" title="Download episode">
                                    <i class="fas fa-download"></i>
                                </button>
                                <button class="fullscreen-btn" title="Fullscreen">
                                    <i class="fas fa-expand"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="episodes-list-container">
                        <h4>Episodes</h4>
                        <div class="episodes-scrollable">
                            ${Array.from({length: anime.episodes}, (_, i) => `
                                <div class="video-episode ${i+1 === episodeNum ? 'active' : ''}">
                                    <span>Episode ${i+1}</span>
                                    <button class="play-episode-btn" data-episode="${i+1}">
                                        <i class="fas fa-play"></i>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }

        // Show video player
        videoContainer.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Add event listeners
        const closeBtn = videoContainer.querySelector('.close-video');
        closeBtn.addEventListener('click', closeVideoPlayer);

        // Add click events to episode buttons in video player
        videoContainer.querySelectorAll('.play-episode-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const newEpisodeNum = parseInt(this.getAttribute('data-episode'));
                if (newEpisodeNum !== episodeNum) {
                    playEpisode(animeId, newEpisodeNum);
                }
            });
        });

        // Close when clicking outside
        videoContainer.addEventListener('click', (e) => {
            if (e.target === videoContainer) closeVideoPlayer();
        });

        // For HTML5 video player, add the controls logic
        if (!isVimeo) {
            const videoElement = videoContainer.querySelector('video');
            const playPauseBtn = videoContainer.querySelector('.play-pause');
            const skipBackward = videoContainer.querySelector('.skip-backward');
            const skipForward = videoContainer.querySelector('.skip-forward');
            const downloadBtn = videoContainer.querySelector('.download-btn');
            const qualityBtn = videoContainer.querySelector('.quality-btn');
            const qualityDropdown = videoContainer.querySelector('.quality-dropdown');
            const fullscreenBtn = videoContainer.querySelector('.fullscreen-btn');
            const progressBar = videoContainer.querySelector('.progress-bar');
            const timeDisplay = videoContainer.querySelector('.time-display');
            const progressContainer = videoContainer.querySelector('.progress-container');
            
            // Play/Pause toggle
            playPauseBtn.addEventListener('click', () => {
                if (videoElement.paused) {
                    videoElement.play();
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    videoElement.pause();
                    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
            
            // Skip backward 10 seconds
            skipBackward.addEventListener('click', () => {
                videoElement.currentTime = Math.max(0, videoElement.currentTime - 10);
            });
            
            // Skip forward 10 seconds
            skipForward.addEventListener('click', () => {
                videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 10);
            });
            
            // Download button
            downloadBtn.addEventListener('click', () => {
                const link = document.createElement('a');
                link.href = anime.episodeSources[episodeNum-1];
                link.download = `${anime.title.replace(/\s+/g, '_')}_Episode_${episodeNum}.mp4`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
            
            // Quality selector
            qualityBtn.addEventListener('click', () => {
                qualityDropdown.style.display = qualityDropdown.style.display === 'block' ? 'none' : 'block';
            });
            
            qualityDropdown.querySelectorAll('div').forEach(item => {
                item.addEventListener('click', function() {
                    const quality = this.getAttribute('data-quality');
                    console.log('Selected quality:', quality);
                    qualityBtn.innerHTML = `<i class="fas fa-cog"></i> ${quality === 'auto' ? 'Quality' : quality}`;
                    qualityDropdown.style.display = 'none';
                });
            });
            
            // Fullscreen toggle
            fullscreenBtn.addEventListener('click', () => {
                if (!document.fullscreenElement) {
                    videoContainer.requestFullscreen().catch(err => {
                        console.error(`Error attempting to enable fullscreen: ${err.message}`);
                    });
                } else {
                    document.exitFullscreen();
                }
            });
            
            // Update progress bar and time display
            videoElement.addEventListener('timeupdate', () => {
                const progress = (videoElement.currentTime / videoElement.duration) * 100;
                progressBar.style.width = `${progress}%`;
                
                const currentTime = formatTime(videoElement.currentTime);
                const duration = formatTime(videoElement.duration);
                timeDisplay.textContent = `${currentTime} / ${duration}`;
            });
            
            // Click on progress bar to seek
            progressContainer.addEventListener('click', (e) => {
                const rect = progressContainer.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                videoElement.currentTime = pos * videoElement.duration;
            });
            
            // Keyboard controls
            videoContainer.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeVideoPlayer();
                if (e.key === 'ArrowLeft') videoElement.currentTime = Math.max(0, videoElement.currentTime - 10);
                if (e.key === 'ArrowRight') videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 10);
                if (e.key === ' ') {
                    e.preventDefault();
                    if (videoElement.paused) videoElement.play();
                    else videoElement.pause();
                }
            });
            
            // Helper function to format time
            function formatTime(seconds) {
                const minutes = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
            }
            
            // Focus the video for keyboard controls
            videoElement.focus();
        }
    }

    // Close video player
    function closeVideoPlayer() {
        const videoContainer = document.getElementById('video-player-container');
        if (videoContainer) {
            const video = videoContainer.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            videoContainer.style.display = 'none';
        }
        document.body.style.overflow = 'auto';
    }

    // Close anime modal
    function closeAnimeModal() {
        elements.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Set up all event listeners
    function setupEventListeners() {
        // Navigation links
        elements.navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('href').substring(1);
                
                // Update active states
                elements.navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Show selected page
                elements.pages.forEach(page => page.classList.remove('active-page'));
                document.getElementById(target).classList.add('active-page');
                
                // Close mobile menu if open
                elements.navMenu.classList.remove('active');
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        // Filter buttons
        elements.filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                elements.filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                loadAllAnime(this.getAttribute('data-filter'));
            });
        });

        // Hamburger menu toggle
        elements.hamburger.addEventListener('click', function() {
            elements.navMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', elements.navMenu.classList.contains('active'));
        });

        // Modal close button
        elements.closeModal.addEventListener('click', closeAnimeModal);

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === elements.modal) {
                closeAnimeModal();
            }
        });

        // Back to top button
        elements.backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Show/hide back to top button on scroll
        window.addEventListener('scroll', function() {
            elements.backToTop.style.display = window.pageYOffset > 300 ? 'block' : 'none';
        });

        // Footer links - prevent default and handle navigation properly
        elements.footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // Handle form validation
    function setupFormValidation() {
        if (!elements.contactForm) return;
        
        elements.contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real app, you would send this data to a server
            console.log('Form submitted:', { name, email, message });
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Handle external navigation to sections
    function handleExternalNavigation() {
        if (window.location.hash) {
            const hash = window.location.hash;
            setTimeout(() => {
                const target = document.querySelector(hash);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }

    // Star Rating Functionality
    function setupStarRating() {
        const stars = document.querySelectorAll('.star-rating i');
        const ratingText = document.querySelector('.rating-text');
        const thankYouMessage = document.querySelector('.thank-you-message');
        let selectedRating = 0;

        // Check if user has already rated
        const savedRating = localStorage.getItem('myanimeRating');
        if (savedRating) {
            selectedRating = parseInt(savedRating);
            highlightStars(selectedRating);
            ratingText.textContent = `You rated us ${selectedRating} star${selectedRating !== 1 ? 's' : ''}`;
            thankYouMessage.style.display = 'block';
        }

        stars.forEach(star => {
            star.addEventListener('mouseover', function() {
                if (!selectedRating) {
                    const rating = parseInt(this.getAttribute('data-rating'));
                    highlightStars(rating);
                    ratingText.textContent = `Rate ${rating} star${rating !== 1 ? 's' : ''}`;
                }
            });

            star.addEventListener('mouseout', function() {
                if (!selectedRating) {
                    highlightStars(0);
                    ratingText.textContent = 'Click to rate';
                }
            });

            star.addEventListener('click', function() {
                selectedRating = parseInt(this.getAttribute('data-rating'));
                highlightStars(selectedRating);
                ratingText.textContent = `You rated us ${selectedRating} star${selectedRating !== 1 ? 's' : ''}`;
                thankYouMessage.style.display = 'block';
                localStorage.setItem('myanimeRating', selectedRating.toString());
                console.log('User rating:', selectedRating);
            });
        });

        function highlightStars(rating) {
            stars.forEach(star => {
                const starRating = parseInt(star.getAttribute('data-rating'));
                if (selectedRating) {
                    star.classList.toggle('active', starRating <= selectedRating);
                    star.classList.remove('hover');
                } else {
                    star.classList.toggle('hover', starRating <= rating);
                    star.classList.remove('active');
                }
            });
        }
    }

    // Initialize the application
    init();
});
