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

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('del-{{post.id}}')) {
        const id = event.target.getAttribute('data-id');
        // //EVENT BUBBLING or EVENT DELEGATION HAPPENS HERE
        //         shoppingListItemEl.append(
        //             '<button class="btn btn-danger btn-small delete-item-btn">Remove</button>'
        //           );

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete posts');
        }
    }
};

document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);