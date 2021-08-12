// EDIT BUTTON HANDLING
const editFormHandler = async (event) => {
    event.preventDefault()
    console.log('EDIT BUTTON CLICKED', event);
    const url = window.location.toString().split("/")
    const id = url[url.length - 1]
    const title = document.querySelector("#post-title").value
    const contents = document.querySelector("#post-contents").value

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            contents
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    console.log(response)

    if (response.ok) {
        document.location.replace(`/post/${id}`);
    } else {
        alert('Failed to edit posts');
    }
};

document
    .querySelector('.edit-form')
    .addEventListener('submit', editFormHandler);