var numPhotos = 0;
var searchTag = '';
var page = 1;

window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        page++;
        makeApiCall(false);
    }
};
function makeApiCall(reload){
    if(reload){
        document.getElementById("images").innerHTML = '';
        numPhotos = document.getElementById("numPhotos").value;
        searchTag = document.getElementById("searchTag").value;
        page = 1;
    }

    var url = `https://www.flickr.com/services/rest/?method=flickr.photos.searchTag&api_key=2970f90f6ecc903d573fd7f4f683cf38&
    tags=${searchTag}&privacy_filter=1&
    safe_search=1&
    extras=url_sq&
    per_page=${numPhotos}&
    page=${page}&
    format=json&nojsoncallback=1`;
    
    $.ajax({url:url, dataType:"json"}).then(function(data) {
        var row = '<div class="row">';
        var server_id;
        var id;
        var secret;
        var title;
        console.log(data);

        for(var i = 0; i < numPhotos; i++){
            server_id = data.photos.photo[i].server;
            id = data.photos.photo[i].id;
            secret = data.photos.photo[i].secret;
            title = data.photos.photo[i].title;

            row += `<div class="col-sm">
                <div class="card" style="width: 20rem;">
                    <img class="card-img-top" src="https://live.staticflickr.com/${server_id}/${id}_${secret}_q.jpg" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                    </div>
                </div>
            </div>`;

            if(i == numPhotos-1){
                row += '</div>';
                document.getElementById("images").innerHTML += row;
            }else if((i+1)%6 == 0){
                row += '</div>';
                document.getElementById("images").innerHTML += row;
                row = '<div class="row">';
            }
        }
    })
    document.getElementById("searchTag").value = '';
}
