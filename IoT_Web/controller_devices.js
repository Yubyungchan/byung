// API 시작
function UP() {

invokeAPI2();
invokeAPImotor();
}

function DOWN() {

invokeAPI3();
invokeAPImotor();
}

var invokeAPI2 = function(){

// 디바이스 조회 URI
    // prod 스테이지 편집기의 맨 위에 있는 "호출 URL/devices"로 대체해야 함
    var API_URI = 'https://eblw5xtlu4.execute-api.ap-northeast-2.amazonaws.com/prod/devices/MotorMKR';               
    var param = {
      
    "tags" : [
            {
                "tagName": "Motor",
                "tagValue": "DOWN"
            },
            {
                "tagName": "Motora",
                "tagValue": "UP"
            }   
    ]

    };
    $.ajax(API_URI, {
        method: 'PUT',
        contentType: "application/json",

        data : JSON.stringify(param),

        success: function (data, status, xhr) {
            console.log(data);
        },
        error: function(xhr,status,e){
          //  document.getElementById("result").innerHTML="Error";
            alert("error");
        }
    });
};

var invokeAPI3 = function(){

// 디바이스 조회 URI
    // prod 스테이지 편집기의 맨 위에 있는 "호출 URL/devices"로 대체해야 함
    var API_URI = 'https://eblw5xtlu4.execute-api.ap-northeast-2.amazonaws.com/prod/devices/MotorMKR';               
    var param = {
      
    "tags" : [
            {
                "tagName": "Motor",
                "tagValue": "UP"
            },
            {
                "tagName": "Motora",
                "tagValue": "DOWN"
            }   
    ]

    };
    $.ajax(API_URI, {
        method: 'PUT',
        contentType: "application/json",

        data : JSON.stringify(param),

        success: function (data, status, xhr) {
            console.log(data);
        },
        error: function(xhr,status,e){
          //  document.getElementById("result").innerHTML="Error";
            alert("error");
        }
    });
};

var invokeAPImotor = function() {

    // 디바이스 조회 URI
    // prod 스테이지 편집기의 맨 위에 있는 "호출 URL/devices"로 대체해야 함
    var API_URI = 'https://eblw5xtlu4.execute-api.ap-northeast-2.amazonaws.com/prod/devices/MotorMKR';                 
    $.ajax(API_URI, {
        method: 'GET',
        contentType: "application/json",

        success: function (data, status, xhr) {
                var result = JSON.parse(data);
                printData(result);  // 성공시, 데이터 출력을 위한 함수 호출

                console.log("data="+data);
        },
        error: function(xhr,status,e){
                alert("error");
        }
    });
};

var printData = function(result){      

    if(result.state.reported.Motor == "UP" && result.state.reported.Motora == "DOWN"){
        document.getElementById("state").innerHTML = " UP"    
    }
    if(result.state.reported.Motor == "DOWN" && result.state.reported.Motora == "UP"){
        document.getElementById("state").innerHTML = " DOWN"
    }
}