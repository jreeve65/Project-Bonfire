document.addEventListener('DOMContentLoaded', function() {
    const hobbyDataUrl = 'public/js/hobbyPage.js'; 
    const hobbySelect = document.getElementById('hobbySelect');
    const pageTitle = document.querySelector('title');
    const hobbyNameElement = document.querySelector('.hobby-name');
    const hobbyDescriptionElement = document.querySelector('.hobby-description');
    const postList = document.querySelector('.post-list');
    const footerText = document.querySelector('footer p');

    let hobbyData = [];

    // Fetch hobby data from JSON file
    fetch(hobbyDataUrl)
        .then(response => response.json())
        .then(data => {
            hobbyData = data;
            populateHobbySelect(hobbyData);
        })
        .catch(error => console.error('Error fetching hobby data:', error));

    function populateHobbySelect(data) {
        hobbySelect.innerHTML = data.map(hobby => `
            <option value="${hobby.hobby_name}">${hobby.hobby_name}</option>
        `).join('');
    }

    hobbySelect.addEventListener('change', function() {
        const selectedHobby = hobbySelect.value;
        const hobby = hobbyData.find(hobby => hobby.hobby_name === selectedHobby);
        if (hobby) {
            updatePage(hobby);
        }
    });

    function updatePage(hobby) {
        pageTitle.textContent = `${hobby.hobby_name} - Hobby`;
        hobbyNameElement.textContent = `r/${hobby.hobby_name}`;
        hobbyDescriptionElement.textContent = `${hobby.hobby_name} description`; // Replace with actual description if available
        footerText.textContent = `hobby - ${hobby.hobby_name}`;

        postList.innerHTML = ''; // Clear existing posts

        hobby.posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.classList.add('post');

            postElement.innerHTML = `
                <div class="post-votes">
                    <button class="upvote">▲</button>
                    <span class="vote-count">${post.votes}</span>
                    <button class="downvote">▼</button>
                </div>
                <div class="post-content">
                    <h2 class="post-title"><a href="${post.url}">${post.title}</a></h2>
                    <p class="post-meta">Posted by u/${post.author} on ${post.postedDate}</p>
                    <div class="post-body">
                        ${post.isImage ? `<img src="${post.imageUrl}" alt="${post.title}">` : `<p>${post.content}</p>`}
                    </div>
                    <div class="post-comments">
                        <a href="${post.commentsUrl}">${post.commentCount} comments</a>
                    </div>
                </div>
            `;

            postList.appendChild(postElement);
        });
    }
});