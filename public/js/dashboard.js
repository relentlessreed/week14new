const newFormHandler = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector('#post-title').value.trim();
    const postContents = document.querySelector('#post-contents').value.trim();

    if (postTitle && postContents) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ title: postTitle, contents: postContents }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log(response)
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    }
};

// EDIT BUTTON HANDLING
const editFormHandler = async (event) => {
    event.preventDefault()
    console.log('EDIT BUTTON CLICKED', event);
    const id = event.target.dataset.id;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
    });

    if (response.ok) {
        document.location.replace(`/editPost/${id}`);
    } else {
        alert('Failed to edit posts');
    }
};

document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.edit-form')
    .addEventListener('submit', editFormHandler);

// document
//     .querySelector('.project-list')
//     .addEventListener('click', delButtonHandler);
