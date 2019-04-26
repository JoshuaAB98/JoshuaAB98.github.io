$(document).ready(function () {

    var key = 'AIzaSyAv-WUFSjvm6dxPjHLPoYmgcs72zb3y1yg';
    var playlistId = 'PLUXi0td6UukB8JRWI_mO-LO24Pacn36JC';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';


    var options = {
        part : 'snippet',
        key: key,
        maxResults: 20,
        playlistId: playlistId
    }


    loadVids();

    //Loads video object and passes it into the loop 'resultsLoop'
    function loadVids() {
        $.getJSON(URL, options, function (data) {
            console.log(data)
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        })
    }

    //Loads the main video and inserts it into section with ID 'video'
    function mainVid(id) {
        $('#video').html(`
        
        <iframe src="https://www.youtube.com/embed/${id}" frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        
        `);
    }

    //Loops through for each video in the playlist and enters it into the 'main'
    function resultsLoop(data) {

        $.each(data.items, function (i, item) {

            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;

            $('main').append(`
        
        <div class="youtubeArticle playlist" data-key="${vid}">
            <img src="${thumb}" class="thumb">
            <div class="details">
                <h40>${title}</h40>
                <p40 class="description">${desc}</p40>
            </div>
        </article>
        
        `);


        });

    }


    //Updates the main video to the video clicked on from the 'main'
    $('main').on('click', 'div', function () {
        var id = $(this).attr('data-key');
        mainVid(id);

    });

});