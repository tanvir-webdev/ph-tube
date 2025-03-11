

function loadCategories(){
    // fetch
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => categoriesData(data.categories))
}

function categoriesData(categories){
    const btnContainer = document.getElementById('btn-container');
    for(let cat of categories){
        const catName = cat.category;
        const catButton = document.createElement('div');
        catButton.innerHTML = `
            <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${catName}</button>
        `
        btnContainer.appendChild(catButton)
    }
}

loadCategories()