function submitComment(commentControl) {
    var comments = document.getElementsByName(commentControl)[0].value;
    var subscriptionKey = "[SUBSCRIPTION_KEY]";
    var url = "[ENDPOINT_URL_HERE]/text/analytics/v2.1/sentiment";

    var payload = '{ "documents": [ { "language": "en-US", "id": "1", "text": "' + comments + '" }]}';

    $.ajax({
        type: "POST",
        url: url,
        data: payload,
        processData: false,
        headers: {
            "Ocp-Apim-Subscription-Key": subscriptionKey,
            "Content-Type": "application/json"
        }
    }).done(function (data) {

        var sentimentRating = Math.round((data.documents[0].score * 100) / 25) + 1;

        var currentItemId = JSON.parse(localStorage.getItem('currentItemId'));

        window.location.href = '/comments?classId=' + currentItemId + '&rating=' + sentimentRating + '&comments=' + comments;

    }).fail(function (xhr, status, err) {
        alert(err);
    });
}

function navigateToComments(classId) {
    localStorage.setItem('currentItemId', JSON.stringify(classId));
    window.location.href = 'comments?classId=' + classId;
}
