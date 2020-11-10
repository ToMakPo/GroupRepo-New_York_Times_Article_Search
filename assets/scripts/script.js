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

var termInput = $('#Term-input')
var countInput = $('#record-Num-input')
var startYearInput = $('#start-year')
var endYearInput = $('#end-year')
var searchButton = $('#searchBtn')
var clearButton = $('#Clearbtn')
var topArticlesDiv = $('#top-articles')

function search() {
    topArticlesDiv.html('')

    var term = termInput.val()
    var count = parseInt(countInput.val())
    var start = parseInt(startYearInput.val())
    var end = parseInt(endYearInput.val())

    if(isNaN(start)) {
        start='';
    }

    if(isNaN(end)) {
        end='';
    }

    $.get(getURL(term, start, end))
    .then(data => {
        var data = data.response.docs
    
        for (let i = 0; i < count; i++) {
            let doc = data[i];

            let headline = $('<a>')
                .attr('href', doc.web_url)
                .attr('target', '_blank')
                .append($('<h2>')
                    .text(doc.headline.main))

            let dateArr = doc.pub_date.split('T')[0].split('-')
            let dateStr = `${dateArr[1]}-${dateArr[2]}-${dateArr[0]}`
            let date = $('<en>').text(dateStr)

            let abstract = $('<p>').text(doc.abstract)

            let article = $('<article>')
                .addClass(['border', 'rounded', 'bg-light', 'mb-3', 'p-3'])
                .append(headline, date, abstract)

            topArticlesDiv.append(article)
        }
    })
}

searchButton.on('click', event => {
    event.preventDefault()
    search()
})

clearButton.on('click', event => {
    event.preventDefault()
    
    topArticlesDiv.html('')
    
    termInput.val('')
    countInput.val(5)
    startYearInput.val('')
    endYearInput.val('')
})