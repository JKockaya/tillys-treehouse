
// ---DOM elements--- //

const treeName = document.getElementById('treeName');

const fact1 = document.getElementById('fact1');

const fact2 = document.getElementById('fact2');

const fact3 = document.getElementById('fact3');

const treeImage = document.getElementById('treeImage');

const leafImage = document.getElementById('leafImage');

const treeBtn = document.getElementById('treeImageBtn');

const leafBtn = document.getElementById('leafImageBtn');

const treeSelector = document.getElementById('treeSelect');

const challengeBtn = document.getElementById('challengeBtn');

const closeBtn = document.getElementById('closeBtn');

const challengeText = document.getElementById('challengeText');

const challengeImage1 = document.getElementById('challengeImage1');

const challengeImage2 = document.getElementById('challengeImage2');



// ---Event Listeners--- //

treeSelector.addEventListener('change', changeData); // Dropdown selection change.

treeBtn.addEventListener('click', changeImage); //Change image on selection.

leafBtn.addEventListener('click', changeImage); //Change image on selection.

challengeBtn.addEventListener('click', function() { //Open screen with random challenge.
    
    const challengeScreen = document.getElementById('challengeScreen');

    challengeScreen.classList.remove('inactive');

    randomTree();
})

closeBtn.addEventListener('click', function() { //Close challenge screen.
    challengeScreen.classList.add('inactive');
})




// ---Functions--- //

function changeData(e) { //Change onscreen information based on dropdown selection
    
    fetch('scripts/data/trees.json')
    .then(response => {
    return response.json();
    })
    .then(data => {

        const treeData = data.trees[e.target.value];

        treeName.innerText = `${treeData.name}`;
        fact1.innerText = `${treeData.fact1}`;
        fact2.innerText = `${treeData.fact2}`;
        fact3.innerText = `${treeData.fact3}`;
        treeImage.setAttribute('src', `${treeData.treeImage}`);
        treeImage.setAttribute('alt', `${treeData.name} tree`);
        leafImage.setAttribute('src', `${treeData.leafImage}`);
        leafImage.setAttribute('alt', `${treeData.name} leaf`);

    })
}


function changeImage(e) { // Changes the image based on target button.

    const btn = e.currentTarget;
    // console.log(btn);
    
    if (btn.id == 'treeImageBtn') {
        treeImage.removeAttribute('hidden');
        leafImage.setAttribute('hidden', true);
    } else if (btn.id == 'leafImageBtn') {
        leafImage.removeAttribute('hidden');
        treeImage.setAttribute('hidden', true);
    }

    e.stopPropagation();
}


function randomTree() { // Generate a random tree name to insert into challenge text.
    
    fetch('scripts/data/trees.json')
    .then(response => {
    return response.json();
    })
    .then(data => {

        let arrayLength = data.trees.length;
        let randomNum = Math.floor(Math.random() * arrayLength);

        challengeText.innerText = data.trees[randomNum].name;  
        
        challengeImage1.innerHTML = `<img src="${data.trees[randomNum].treeImage}" 
                                    alt="${data.trees[randomNum].name}">`
        
        challengeImage2.innerHTML = `<img src="${data.trees[randomNum].leafImage}" 
                                    alt="${data.trees[randomNum].name}">`
        
    })
}

