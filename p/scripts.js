document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');
    const categoriesContainer = document.getElementById('categories');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const cancelButton = document.getElementById('cancel-button');

// // // create post from text document
    // Function to fetch post content from a file and add it to the page
    function fetchPostContent(filename, category, title) {
        return fetch(filename)
            .then(response => response.text())
            .then(fullContent => {
                // Split text into paragraphs and wrap each with <p> tags
                fullContent = fullContent
                .replace(/\n\s*\n/g, '</p><p>')  // Convert double line breaks to paragraph tags
                .replace(/\n/g, '<br>');  // Convert single line breaks to <br> tags

                // Extract the first 30 words from the content
                const previewContent = fullContent.split(/\s+/).slice(0, 30).join(' ') + '...';

                addPost(category, title, previewContent);
            })
            .catch(error => {
                console.error('Error fetching the post content:', error);
            });
    }

    // Fetch metadata and create posts
    fetch('posts-metadata.json')
        .then(response => response.json())
        .then(metadata => {
            metadata.forEach(post => {
                fetchPostContent(post.filename, post.category, post.title);
            });
        })
        .catch(error => {
            console.error('Error fetching the metadata:', error);
        });

    function addPost(category, title, previewContent) {
        const postElement = document.createElement('div');
        postElement.className = `post ${category}`;
        postElement.innerHTML = `
            <h3>${title}</h3>
            <p>${previewContent}</p>
        `;
        // Make the entire post clickable
        postElement.addEventListener("click", function () {
            window.location.href = `post.html?title=${encodeURIComponent(title)}`;
        });
        postsContainer.appendChild(postElement);
    }
// // // end of create post from text document

    // Function to filter posts by category
    function filterPostsByCategory(category) {
        const posts = postsContainer.getElementsByClassName('post');
        if (category === 'all') {
            for (const post of posts) {
                post.style.display = 'block';
            }
        } else {
            for (const post of posts) {
                if (post.classList.contains(category)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            }
        }
    }

    // Add event listeners to category buttons
    const categoryLinks = categoriesContainer.querySelectorAll('a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const category = link.getAttribute('data-category');
            filterPostsByCategory(category);
        });
    });

    // Sidebar menu functionality
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });

    // Post search functionality
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.toLowerCase();
        const posts = postsContainer.getElementsByClassName('post');
        for (const post of posts) {
            const title = post.querySelector('h3').textContent.toLowerCase();
            const content = post.querySelector('p').textContent.toLowerCase();
            if (title.includes(query) || content.includes(query)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        }
    });

    // Cancel search functionality
    cancelButton.addEventListener('click', function() {
        searchInput.value = '';
        const posts = postsContainer.getElementsByClassName('post');
        for (const post of posts) {
            post.style.display = 'block';
        }
    });
});
 // dark-mode
 document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    function applyDarkMode() {
        if (localStorage.getItem("dark-mode") === "enabled") {
            body.classList.add("dark-mode");
        } else {
            body.classList.remove("dark-mode");
        }
    }

    // Apply dark mode on page load
    applyDarkMode();

    // Toggle Dark Mode
    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
        } else {
            localStorage.setItem("dark-mode", "disabled");
        }

        applyDarkMode(); // Ensure background updates properly
    });
});



