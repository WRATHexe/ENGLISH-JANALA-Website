function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => {
            display(data.data);
        });
}

function display(categories) {
    const categoryContainer = document.getElementById('lesson-container');
    categoryContainer.innerHTML = ''; // Clear previous buttons

    for (const category of categories) {
        const button = document.createElement("button");
        button.classList.add('btn','bg-white','text-purple','border-purple','border-2','flex','gap-2','hover:bg-Purple','hover:text-white','hover:border-white','group','rounded-lg','p-2','items-center'
        );
        button.setAttribute('data-level', category.level_no); // Add data-level attribute
        button.innerHTML = `
            <img class="hover: text-white" src="/assets/fa-book-open.png" alt="faq" class="h-5 group-hover:brightness-0 group-hover:invert">
            <p>Lesson -${category.level_no}</p>
        `;
        const level = category.level_no;
        button.onclick = () => {
            loadDetails(level);
            document.getElementById('no-category').style.display = 'none';
        };
        categoryContainer.appendChild(button);
    }
}

function loadDetails(level) {
    const url = `https://openapi.programming-hero.com/api/level/${level}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayDetails(data.data);
        });

    // Highlight the selected button
    const buttons = document.querySelectorAll('#lesson-container button');
    buttons.forEach(button => {
        if (button.getAttribute('data-level') === String(level)) {
            button.classList.add('bg-Purple', 'text-white'); // Highlight selected button
            button.classList.remove('bg-white', 'text-purple'); // Remove default styles
        } else {
            button.classList.remove('bg-Purple', 'text-white'); // Remove highlight styles
            button.classList.add('bg-white', 'text-purple'); // Reset to default styles
        }
    });
}

function displayDetails(details) {
    console.log(details);
    const detailsContainer = document.getElementById('vocabulary-container');
    const loadingSpinner = document.getElementById('loading-spinner');
    const noContent = document.getElementById('no-content');

    loadingSpinner.classList.remove('hidden');
    detailsContainer.innerHTML = '';
    noContent.innerHTML = '';

    setTimeout(() => {
        loadingSpinner.classList.add('hidden');

        if (details.length === 0) {
            noContent.classList.remove('hidden');
            noContent.innerHTML = `
                <div class="flex flex-col items-center justify-center text-center">
                    <img src="assets/alert-error.png" alt="alert" class="h-32 w-32">
                    <p class=" font-semibold mt-4 text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <h2 class="text-3xl font-semibold mt-4">নেক্সট Lesson এ যান</h2>
                </div>
            `;
            return;
        }
        detailsContainer.classList.add('grid', 'lg:grid-cols-3', 'gap-8');
        details.forEach(detail => {
            const card = document.createElement('div');
            card.classList.add('vocabulary-card', 'bg-white', 'px-36', 'pb-36', 'pt-14', 'shadow-md', 'relative');
            if (detail.meaning === null) {
                detail.meaning = 'অর্থ নেই';
            }

            card.innerHTML = `
            <h2 class="text-3xl font-bold">${detail.word}</h2>
            <p class="text-xl my-6">Meaning / Pronunciation</p>
            <p class="hind-siliguri text-3xl text-gray-600 font-semibold">"${detail.meaning} / ${detail.pronunciation}"</p>
            <img src="https://img.icons8.com/?size=100&id=82742&format=png&color=000000" alt="info" class="absolute bottom-14 left-14 h-14 w-14" onclick="openModal()">
            <img src="https://img.icons8.com/?size=100&id=9983&format=png&color=000000" alt="mic" class="absolute bottom-14 right-14 h-12 w-12">
            `;
            card.onclick = () => {
                loadWordDetail(detail.id);
            };
            detailsContainer.appendChild(card);
        });
    }, 500);
}

function loadWordDetail(id) {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayWordDetail(data.data);
        });
}

function displayWordDetail(word) {
    console.log(word);
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';
    const card = document.createElement('div');
    card.classList.add('word-card', 'bg-white', 'p-6', 'shadow-md', 'text-2xl', 'w-full');
    let synonyms = '';
    if (Array.isArray(word.synonyms) && word.synonyms.length > 0) {
        synonyms = word.synonyms.map(synonym => `<span class="bg-blue_lite px-2 py-1 rounded-md mx-1">${synonym}</span>`).join(' ');
    } else {
        synonyms = `<p class="">কোনো সমার্থক শব্দ পাওয়া যায়নি</p>`;
    }
    if (word.meaning === null) {
        word.meaning = 'অর্থ নেই';
    }

    card.innerHTML = `
    <div class="flex text-3xl font-bold">
    <h2 class="">${word.word} </h2>(
    <img src="https://img.icons8.com/?size=100&id=9622&format=png&color=000000" alt="pronunciation" class="h-8 w-8">: <span class="font">${word.pronunciation}</span>)
    </div>
    <p class=" font-bold mt-8 mb-2">Meaning</p>
    <p class="hind-siliguri ">${word.meaning}</p>
    <p class="font-bold mt-8 mb-2">Example</p>
    <p class=" ">${word.sentence}</p>
    <p class="hind-siliguri font-bold mt-8 mb-2">সমার্থক শব্দ গুলো</p>
    <p>${synonyms}</p>
    `;
    wordContainer.appendChild(card);
}

function openModal() {
    document.getElementById('word-modal').showModal();
}

function closeModal() {
    document.getElementById('word-modal').close();
}

loadCategories();


