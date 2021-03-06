const postsList = document.querySelector('.posts-list');
// const addPostForm = document.querySelector('.add-post-form');
const titleValue = document.querySelector('#title-value');
const bodyValue = document.querySelector('#body-value');
// const btnSubmit = document.querySelector('.btn');
let output = '';

const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `
        <div class="card col-md-8 bg-ligth mt-4">
                 <div class="card-body" data-id=${post._id}>
                   <h5 class="card-title">${post.title} </h5>  
                   <p class="card-text">${post.body}</p>
                   <a href="#" class="card-link" id="edit-post">Edit</a>
                   <a href="#" class="card-link" id="delete-post">Delete</a>
                 </div>
         </div>
        `;
     });
     postsList.innerHTML = output;
}

//  <h6 class="card-subtitle mb-2 text-muted">${post.date} </h6>  -- in case of MongoDB goes in output
// const url = 'http://localhost:5000/api/posts/'; Using MongoDB 
const url = 'https://crudcrud.com/api/921572bcd6e840b69fc2e4dc29624252/posts';// needs new endpoint every 24hr
// const url = base + `${post}`;

// Get - Read all posts
// Method: GET
fetch(url)
    .then(res => res.json())
    .then(data => renderPosts(data))

    $('.posts-list').on('click', (e) => {
        e.preventDefault();
        let delButtonIsPressed = e.target.id == 'delete-post'
        let editButtonIsPressed = e.target.id == 'edit-post'

    let id = e.target.parentElement.dataset.id;
    
    // Delete existing post
    //METHOD DELETE
    if(delButtonIsPressed) { 
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.text()).then(console.log)
        .then(() => location.reload())
        
     }
     if(editButtonIsPressed) {
         const parent = e.target.parentElement;
         let titleContent = parent.querySelector('.card-title').textContent ;
         let bodyContent = parent.querySelector('.card-text').textContent ;

         titleValue.value = titleContent;
         bodyValue.value = bodyContent;
     }

     // Update an existing post
     // METHOD: PATCH
      $('.btn').on('click', () => {
         fetch(url, {
             method: 'PATCH',
             header: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 title: titleValue.value, 
                 body: bodyValue.value, 
             })
         })
         .then(res => res.json())
         .then(()=> location.reload)
     })


})

// Creating a post
// Method: POST
$('.add-post-form').on('submit', (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleValue.value,
            body: bodyValue.value
        })
    })
    .then(res => res.json())
    .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderPosts(dataArr);
    })
        // reset input field to empty
        titleValue.value = '';
        bodyValue.value = '';
})