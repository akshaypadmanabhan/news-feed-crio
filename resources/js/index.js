function getData(rss_url)
{    
    var result = fetch(`${rss_url}`)

        .then(response => response.json())

        .then((data) => {return data})

    // console.log( result)
    return ( result)

}
var urls = magazines
// import { magazines } from 'resources/js/index.js'
// console.log(magazines)
dataParse(urls)

function dataParse(urls){
    for(let i=0; i<urls.length; i++){
        var url = `https://api.rss2json.com/v1/api.json?rss_url=${urls[i]}`
        const printAddress = async (url) => {
            const a = await getData(url);
            loop(a,i)
        };
        printAddress(url)
    };
}

function loop(content,i){
    // console.log(content.items[0])
    var accordionExample = document.getElementById('accordionExample')
    var item = document.createElement('div')
    item.className = 'accordion-item'
    var title = content.feed.title
    title = title.split(" ").join("")
    title = title.replace(/[{()}]/g, '');
    console.log(title)
    // console.log(title)
    // var data = `
    //             <img src="https://i.gadgets360cdn.com/large/apple_mixed_reality_headset_ian_zelbo_1654610633672.jpg" alt="">
    //             <div class="content-body">
    //             <h3>Heading</h3>
    //             </p>author &middot date</p>
    //             This is the first item's accordion body.It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow
    //             </div>
    //             `
    if(i==0){
        item.innerHTML = `
                <h2 class="accordion-header" id="${i}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${title}" aria-expanded="true" aria-controls="${title}">
                ${content.feed.title}
            </button>
            </h2>
            <div id="${title}" display = "visible" class="accordion-collapse collapse show" aria-labelledby="${i}" data-bs-parent="#accordionExample">
            <div class="accordion-body">


            <div id="carouselExampleFade" class="carousel slide carousel-fade">
        <div class="carousel-inner" id="carousel-inner">
         
        `+ bodyData(content.items) +`
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
        </div>
               
            </div>
            </div>`
    }
    else{
      item.innerHTML = `<h2 class="accordion-header" id="${i}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${title}" aria-expanded="false" aria-controls="${title}">
            ${content.feed.title}
            </button>
        </h2>
        <div id="${title}" display = "visible" class="accordion-collapse collapse" aria-labelledby="${i}" data-bs-parent="#accordionExample">
            <div class="accordion-body">`+ bodyData(content.items) +`
            
            </div>
        </div>`}
    // if(i===0) item.replace('expand','true')
    // console.log(item)
    accordionExample.appendChild(item)
    // console.log(accordionExample)

}
function bodyData (array) {
    var data = ``
    for(let i=0; i<array.length; i++){
        var date = array[i].pubDate.split(" ")
        let newDate = new Date(date[0])
        data += `
        <br/>
        <img src="${array[i].enclosure.link}" alt="" class="carousel-img">
        <br/>
        <br/>
        <div class="content-body">
        <a href='${array[i].link}' class="news-link"><h3 style="font-weight: 700;">${array[i].title}</h3></a>
        </p>${array[i].author} &middot ${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}</p>
        <hr/>
        ${array[i].description}
        <hr/>
        </div>`
    }
    return(data)
}