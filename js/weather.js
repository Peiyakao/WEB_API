$(function() {
    const cors = 'https://cors-anywhere.herokuapp.com/';
    $.ajax({
        url: cors + 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-007?Authorization=CWB-D0A81798-2940-4B72-8907-FAA633397550',
        type: "GET",
        dataType: "json",
        success: function(res) {
            console.log(res.records.locations[0].location[0]);
            const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const html1 = `<div class="d-flex flex-column block"><small class="text-muted mb-0">`;
            const html2 = `</small><div class="text-center"><img class="symbol-img" src="`;
            const html3 = `"></div><h6><strong>`;
            const html4 = `&#176;</strong></h6></div>`;
            let week_html = '';
            let tempture = res.records.locations[0].location[0].weatherElement[0].time[0].elementValue[0].value;
            $('#city_name').html(res.records.locations[0].locationsName);
            $('#district').html(res.records.locations[0].location[0].locationName);
            $('#tempture').html(tempture + "&#176;");

            let j = 0;
            for (var i = 1; i < 10; i += 2) {
                let degree = res.records.locations[0].location[0].weatherElement[0].time[i].elementValue[0].value;
                console.log(degree);
                icon = (degree > 18) ? "https://i.imgur.com/Shrg84B.png" : "https://i.imgur.com/BeWfUuG.png";
                if (j < 5) {
                    week_html = week_html + html1 + week[j] + html2 + icon
                    week_html = week_html + html3 + degree + html4;
                }


                j++;
            }
            console.log(week_html);
            $('#weekday').html(week_html);
        },

        error: function() {
            alert("ERROR!!!");
        }
    });
});