const createComment = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#comment-text').value.trim();
    const url = window.location.toString().split("/")
    const post_id = url[url.length - 1]

    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment_text, post_id }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to create comment');
    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', createComment);