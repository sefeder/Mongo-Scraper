
$(document).on('click', '#saveBtn', function (event) {
    event.preventDefault()
    $(this).attr("disabled", true).html('<em>Saved!</em>')
    $.ajax({
        type: "POST",
        url: "/saving",
        data: {
            URL: $(this).siblings('a').attr('href').trim()
        }
    })
    .done(function(data){
    })
})

$(document).on('click', '#removeBtn', function (event) {
    event.preventDefault()
    $.ajax({
        type: "POST",
        url: "/removing",
        data: {
            URL: $(this).parent().siblings('a').attr('href').trim()
        },
        success: function() {
            location.reload();
        }
    })
})

$(document).on('click', '#addNote', function (event) {
    event.preventDefault()
    $.ajax({
        type: "POST",
        url: "/saveNote",
        data: {
            URL: $(this).attr('data-URL').trim(),
            note: $(this).parent().siblings().children('textarea').val().trim()
        },
        success: function() {
            location.reload();
        }
    })
})

$(document).on('click', '.xBtn', function (event) {
    event.preventDefault()
    $.ajax({
        type: "POST",
        url: "/removeNote",
        data: {
            article: $(this).siblings().attr('data-id'),
            note: $(this).siblings().children().text()
        },
        success: function() {
            location.reload();
        }
    })
})

