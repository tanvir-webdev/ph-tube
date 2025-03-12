

function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => categoriesData(data.categories))
}

const loadCategoriesVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => allVideos(data.category))
}

function categoriesData(categories) {
    const btnContainer = document.getElementById('btn-container');
    for (let cat of categories) {
        const catName = cat.category;
        const catButton = document.createElement('div');
        catButton.innerHTML = `
            <button onclick="loadCategoriesVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${catName}</button>
        `
        btnContainer.appendChild(catButton)
    }
}

const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => allVideos(data.videos))
}

const allVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container');
    videosContainer.innerHTML = ''
    
    videos.forEach(element => {
        console.log(element)
        const videoContent = document.createElement('div');
        videoContent.innerHTML = `
            <div class="card bg-base-100">
                <figure class="relative">
                    <img class="w-full h-[200px] object-cover" src="${element.thumbnail}" />
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
                            <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=SRJUuaAShjVD&format=png" alt="" srcset="">
                        </h3>
                        <p class="text-sm text-[#17171770]">${element.others.views}</p>
                    </div>
                </div>
            </div>
        `
        
        videosContainer.append(videoContent)
    });
}


loadCategories()