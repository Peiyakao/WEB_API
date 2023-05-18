$(function(){
    const cors = 'https://cors-anywhere.herokuapp.com/';
    $.ajax({
        url:"https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-067?Authorization=CWB-D0A81798-2940-4B72-8907-FAA633397550&elementName=T",
        type:"GET",
        dataType:"json",
        success:function(res) {
            console.log(res.records.locations[0]);
            let tempture =res.records.locations[0].location[0].weatherElement[0].time[0].elementValue[0].value;
            let time=res.records.locations[0].location[0].weatherElement[0].time;
            let weekend=[];
            let weekTemp=[];
            for(let i=0;i<time.length;){
                let temp=res.records.locations[0].location[0].weatherElement[0].time[i].elementValue[0].value;
                let oldTime=new Date(time[i].startTime);
                let month = oldTime.getMonth() + 1;
                let day = oldTime.getDate();
                let date=oldTime.getDay();
                switch (date){
                    case 1:
                        date="MON";
                    break;
                    case 2:
                        date="TUS";
                    break;
                    case 3:
                        date="WES";
                    break;
                    case 4:
                        date="THR";
                    break;
                    case 5:
                        date="FRI";
                    break;
                    case 6:
                        date="SAT";
                    break;
                    case 0:
                        date="SUN";
                }
                let formattedDate = `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}<br> ${date}`;
                weekend.push(formattedDate);
                weekTemp.push(temp);
                i+=2;
            }
            for(let i=0;i<5;i++){
                $("#weekday small").eq(i).html(weekend[i]);
                $("#weekday strong").eq(i).html(weekTemp[i]);
            }
            $('#city_name').html(res.records.locations[0].locationsName)
            $('#district').html(res.records.locations[0].location[0].locationName)
            $('#tempture').html(tempture + "&#176;" +"C");
        },
        error:function(error){
            console.log(error);
        }

    })
})