const searchBtn = document.getElementById("searchButton");
const inputId = document.getElementById("inputValue");
const totalFound = document.getElementById("totalFound");
const showBook = document.getElementById("showBook");

searchBtn.addEventListener('click', () =>{
    showBook.innerHTML = '';
    totalFound.innerHTML = '';
    const searchText = inputId.value;
    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
    .then(res => res.json())
    .then(data => showResult(data))
    .finally(() => inputId.value='');
});


const infoCheck = (list, massage) =>{
    if(list.length > 0){
        return list[0];
    }else{
        return `${massage} Not Found`;
    }
}

//show result
const showResult = data =>{
    console.log(data);

    if (data.docs.length === 0) {
        showBook.innerHTML = '<h5 class="text-center">No Result Found</h5>';
    }else{
        totalFound.innerHTML = `<h5 class="text-center">Total Found: ${data.numFound}</h5>`;
    }

    data.docs?.forEach(element => {
        //cover image
        const coverId = element.cover_i;
        let bookCoverurl = "#";
        if (coverId) {
            bookCoverurl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
        }
        const bookName = element.title;

        //publish date
        const publishDateList = element.publish_date;
        let publishDate = infoCheck(publishDateList, 'Date');

        //author name
        const authorList = element.author_name;
        let authorName = infoCheck(authorList, 'Author');

        //publisher
        const publisherList = element.publisher;
        let publisher = infoCheck(publisherList, 'Publisher');

        const div = document.createElement('div');
        div.classList.add("col-lg-3", "mb-4");
        div.innerHTML = `
        <div class="card">
            <div class="card-image">
                <img src="${bookCoverurl}" class="card-img-top">
            </div>
            <div class="card-body">
                <h4>${bookName}</h4>
                <h6>Author Name: ${authorName}</h6>
                <p>Publish Date: ${publishDate}</p>
                <p>Publisher: ${publisher}</p>
            </div>
        </div>
        `;
        
        showBook.appendChild(div);
            
    });

}