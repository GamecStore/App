$(document).ready(function () {
    $("#name").on('keyup', function (e) {
        e.preventDefault();
        var data = $('#name').val();
        $.ajax({
            url: '/users/checkName',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ UserName: data }),
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