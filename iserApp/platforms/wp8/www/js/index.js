/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
       
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        init();
    }
};


function init() {
    

    if (window.localStorage.getItem('firstTime') == undefined) {        
        window.localStorage.setItem('deviceUUID', '');
        window.localStorage.setItem('firstTime', false);
    }
    logMeIn();

}

function logMeIn() {
    
    $.ajax({
        type: "POST",
        url: "http://devapps2.isermobile.co.za/Services/IserService.asmx/LoginDevice",
        data:
            {
                DeviceUUID: window.localStorage.getItem('deviceUUID'),
                GMTTimeZone: '2',
                PushToken: 'asdasdasdasdas',
                DeviceType: 'windows'
            },
        dataType: "xml",
        async: true,
        success: function (data) {
            var _data = data.getElementsByTagName("string")[0].childNodes[0].nodeValue;
            var json = JSON.parse(_data);
            alert(_data);
            if (json.Result == true && json.Description=='') {
                alert("Login, Successful !");
                window.location.href("http://devapps2.isermobile.co.za/default.aspx");
            }
            else if (json.Result == false && json.Description == '') {
                alert("Login, Failed!\nTry Register");
                window.location.href("register.html");

            }
            else {
                alert(json.Description);
            }
        },
        error: function (xhr, err) {
            alert("error");
        }
    });
}

function registerMe() {    
    $.ajax({
        type: "POST",
        url: "http://devapps2.isermobile.co.za/Services/IserService.asmx/RegisterDevice",
        data:
            {
                PIN: $('#ContentPlaceHolder1_txtPin').val(),
                DealerUserName: $('#ContentPlaceHolder1_txtUser').val(),
                PushToken: 'asdsadasd',
                GMTTimeZone: '2',
                DeviceType: "windows"
            },
        dataType: "xml",
        async: true,
        success: function (data) {
            var _data = data.getElementsByTagName("string")[0].childNodes[0].nodeValue;
            var json = JSON.parse(_data);
            if (json.Result == true) {
                alert("Device Registeration, Successful !");
                window.localStorage.setItem('deviceUUID', json.DeviceUUID);
                logMeIn();
            }
            else {
                alert("Device Registeration, Failed !\n" + json.Description);
                window.localStorage.setItem('success', true);
            }
        },
        error: function (xhr, err) {
            alert("error");
        }
    });
}