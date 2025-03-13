// Remove all active class

const removeActiveClass = () => {
    const allActiveClass = document.getElementsByClassName('active');
    for (let btn of allActiveClass) {
        btn.classList.remove('active')
    }
}

// Load categories button - fetch

function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => categoriesData(data.categories))
}

// categories buttons video - fetch

const loadCategoriesVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()

            const targetbutton = document.getElementById(`${id}`)
            targetbutton.classList.add('active')
            allVideos(data.category)
        })
}

// Create categories button 

function categoriesData(categories) {
    const btnContainer = document.getElementById('btn-container');
    for (let cat of categories) {
        const catName = cat.category;
        const catButton = document.createElement('div');
        catButton.innerHTML = `
            <button id="${cat.category_id}" onclick="loadCategoriesVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${catName}</button>
        `
        btnContainer.appendChild(catButton)
    }
}

// Load all videos - fetch

const loadVideos = (searchTitle = '') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchTitle}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            document.getElementById('all-btn').classList.add('active')
            allVideos(data.videos)

        })
}

// Load Video details  - fetch

const loadVideoDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayVideosDetails(data.video))
}

// display videos details

const displayVideosDetails = (details) => {
    console.log(details)
    const modalInfo = document.getElementById('modal_info');
    modalInfo.innerHTML = ''
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card bg-base-100 image-full w-full">
            <figure>
            <img
                src="${details.thumbnail}"
                alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title font-bold text-xl">${details.title}</h2>
                <p>${details.description}</p>
             </div>
         </div>
    ` 
    modalInfo.append(div)
    my_modal_1.showModal()
}


// show display videos

const allVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container');
    videosContainer.innerHTML = ''
    if (videos.length == 0) {
        videosContainer.innerHTML = `
        <div class="col-span-full flex flex-col items-center mt-20">
                <img class="w-[120px]" src="assets/Icon.png" alt="">
                <h2 class="font-bold text-3xl text-center">Oops!! Sorry, There is no <br> content here</h2>
        </div>
        `
        return
    }
    videos.forEach(element => {
        const videoContent = document.createElement('div');
        videoContent.innerHTML = `
            <div class="card bg-base-100">
                <figure class="relative">
                    <img class="w-full h-[170px] object-cover" src="${element.thumbnail}" />
                    <span class="absolute bg-black text-xs font-light text-white p-1 rounded-sm bottom-3 right-3">3hrs 56 min ago</span>
                </figure>
                <div class="mt-5 flex gap-3">
                    <div>
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                                <img src="${element.authors[0]['profile_picture']}" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 class="font-bold">${element.title}</h2>
                        <h3 class="flex gap-2 text-sm text-[#17171770]">
                            ${element.authors[0]['profile_name']}
                            ${element.authors[0]['verified'] === true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=SRJUuaAShjVD&format=png" alt="" srcset=""></img>` : ``}
                        </h3>
                        <p class="text-sm text-[#17171770]">${element.others.views}</p>
                        
                    </div>
                    </div>
                    <button onclick="loadVideoDetails('${element.video_id}')" class="btn btn-block mt-2">Video Details</button>
            </div>
        `

        videosContainer.append(videoContent)
    });
}

// Search input

document.getElementById('search').addEventListener('keyup', (event)=>{
    loadVideos(event.target.value)
})

// call categories button

loadCategories()
