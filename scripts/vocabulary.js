function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(data => {
        display(data.data);
    })
}

function display(categories){
    const categoryContainer = document.getElementById('lesson-container');
    for (category of categories){
        const button = document.createElement("button");
        button.classList.add('btn', 'bg-white', 'text-purple', 'border-purple', 'border-2', 'flex', 'gap-2', 'hover:bg-Purple', 'hover:text-white', 'hover:border-white', 'rounded-lg', 'p-2', 'items-center');
        button.innerHTML = `
        <img class="hover: text-white" src="/assets/fa-book-open.png" alt="faq" class="h-5">
            <p>${category.lessonName}</p>
        `;
        const level = category.level_no;
        button.onclick = () => 
        {
            loadDetails(level);
            document.getElementById('no-category').style.display = 'none';
        }

        categoryContainer.appendChild(button);
    };
  
}

loadCategories();

function loadDetails(level){
    const url = `https://openapi.programming-hero.com/api/level/${level}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayDetails(data.data);
        
    })
}
// "data":[{"id":4,"level":5,"word":"Diligent","meaning":"পরিশ্রমী","pronunciation":"ডিলিজেন্ট"},
//     <div class="vocabulary-grid grid lg:grid-cols-3 gap-8 my-10">
          
//            <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
    //     <!-- Eager Section -->
    //     <div class="mb-6">
    //         <h2 class="text-xl font-bold text-blue-600">Eager</h2>
    //         <p class="text-gray-700 mt-2">Meaning / Pronunciation</p>
    //         <p class="text-gray-600 italic">"对话录/多讲式"</p>
    //         <p class="text-gray-700 mt-2">8</p>
    //     </div>

    //     <!-- Hesitate Section -->
    //     <div>
    //         <h2 class="text-xl font-bold text-blue-600">Hesitate</h2>
    //         <p class="text-gray-700 mt-2">Meaning / Pronunciation</p>
    //         <p class="text-gray-600 italic">"简述短语/单词短语"</p>
    //     </div>
    // </div>
function displayDetails(details){
    console.log(details);
    const detailsContainer = document.getElementById('vocabulary-container');
    detailsContainer.innerHTML = '';
    
    details.forEach (detail => {
        const card = document.createElement('div');
        card.classList.add('vocabulary-card', 'bg-white', 'p-5', 'shadow-md');
        card.innerHTML = `
        <h2 class="text-xl font-bold text-blue-600">${detail.word}</h2>
        <p class="text-gray-700 mt-2">Meaning / Pronunciation</p>
        <p class="text-gray-600 italic">"${detail.meaning} / ${detail.pronunciation}"</p>
        `;
        card.onclick = () => {
            loadWordDetail(detail.id);
        }
        detailsContainer.appendChild(card);
    }); 

}

function loadWordDetail(id){
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayWordDetail(data.data);
    })
}

// {
//     "status": true,
//     "message": "successfully fetched a word details",
//     "data": {
//       "word": "Eager",
//       "meaning": "আগ্রহী",
//       "pronunciation": "ইগার",
//       "level": 1,
//       "sentence": "The kids were eager to open their gifts.",
//       "points": 1,
//       "partsOfSpeech": "adjective",
//       "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//       ],
//       "id": 5
//     }
//   }


