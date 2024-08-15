


const addPost = async function (event) {
    event.preventDefault();
    const messageEl = document.querySelector('#post-message').value.trim();
    const titleEl = document.querySelector('#post-title').value.trim();
    const url = window.location.href;
    const hobbyName = url.charAt(url.length-1);

    const post = {
        title: titleEl,
        message: messageEl,
        hobby_id: hobbyName,
    }
    console.log(post);
    const response = await fetch('/api/post/', {
        method: 'POST',
        body: JSON.stringify({ post }),
        headers: { "Content-Type": "application/json" }
    })
    if(response.ok){
        document.location.reload();
    }
    console.log(response);
}
document.querySelector('#new-Post-form').addEventListener("submit", addPost)