$(document).ready(function () {
    $("#name").on('keyup', function (e) {
        e.preventDefault();
        var data = $('#name').val();
        console.log("in ajax")
        $.ajax({
            url: '/checkName',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: data }),
            success: function (response) {
                $('#result').html('UserName is ' + response);

                if (response == 'taken') {
                    $('#result').css("color", "red");
                }
                else {
                    $('#result').css("color", "green");
                }
            },
            error: function (err) {

            }
        });
    });
});