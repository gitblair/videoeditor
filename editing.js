$(document).ready(function () {
    let video = document.getElementById('videoPlayer');
    let inPoint = 0;
    let outPoint = 0;
    let uploadedFileName = '';

    $('#uploadForm').on('submit', function (event) {
        event.preventDefault();
        let formData = new FormData(this);

        $.ajax({
            url: 'upload.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                uploadedFileName = response;
                let url = 'uploads/' + uploadedFileName;
                video.src = url;
            },
            error: function () {
                alert('File upload failed!');
            }
        });
    });

    $('#setInPoint').on('click', function () {
        inPoint = video.currentTime;
        alert('In point set at ' + inPoint + ' seconds');
    });

    $('#setOutPoint').on('click', function () {
        outPoint = video.currentTime;
        alert('Out point set at ' + outPoint + ' seconds');
    });

    $('#downloadClip').on('click', function () {
        if (inPoint >= outPoint) {
            alert('Invalid in/out points');
            return;
        }
        downloadClip(uploadedFileName, inPoint, outPoint);
    });

    function downloadClip(filename, start, end) {
        $.post('download.php', {
            filename: filename,
            start: start,
            end: end
        }, function (data) {
            let a = document.createElement('a');
            a.href = data;
            a.download = 'clip.mp4';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

    // Implement zoom and scrubbing functionality using Wavesurfer.js or other library
});
