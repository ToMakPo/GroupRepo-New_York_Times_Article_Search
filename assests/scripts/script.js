const nytKey = '2RxRwHylsMjejWvqW570N8yoeX9ZfHly'
var getURL = (searchTerm, startYear='', endYear='') => {
    let url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?' 
        + `api-key=${nytKey}`
        + `&q=${searchTerm}`
        + (startYear ? `&begin_date=${startYear}0101` : '')
        + (endYear ? `&end_date=${endYear}1231` : '')
    console.log(url);
    return url
}

$.get(getURL('election', 2000, 2000))
.then(data => {
    var data = data.response.docs
    console.log(data[0]);

    // data.forEach(doc => {
        
    // })
})

console.log()