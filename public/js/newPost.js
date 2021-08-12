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
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create project');
        }
    }
};
// EDIT BUTTON HANDLING
const editFormHandler = async (event) => {
    event.preventDefault()
    console.log(event);
    const id = event.target.dataset.id;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
    });

    if (response.ok) {
        document.location.replace('/edit');
    } else {
        alert('Failed to edit posts');
    }
};

// DELETE BUTTON HANDLING
const delButtonHandler = async (event) => {
    event.preventDefault()
    console.log(event);
    const id = event.target.dataset.id;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete posts');
    }
};

document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);

if (document
    .querySelector('.deletePost')
) {
    document
        .querySelector('.deletePost')
        .addEventListener('click', delButtonHandler);
}