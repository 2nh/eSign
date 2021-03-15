document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('beginSign').addEventListener('click', onBeginClick, false)
    document.getElementById('endSign').addEventListener('click', onEndClick, false)
    var actionText = document.getElementById('actionText')

    function onBeginClick() {
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs){
                chrome.tabs.sendMessage(tabs[0].id, {action: "0"}, null)
            })
    }

    function onEndClick() {
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs){
                chrome.tabs.sendMessage(tabs[0].id, {action: "1"}, null)
            })
    }

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse){
            setAction(request.a)
        }
    )
    

    function setAction(res){
        if(res == 0){
            actionText.textContent = "Currently Signing! \r\n Please click 'End Signing' before closing this window!"
        }

        if(res == 1){
            actionText.textContent = "Signing Ended! \r\n You can now close this window!"
        }

        if(res == -1){
            actionText.textContent = "Error No Canvas Found!"
        }

        if(res == -2){
            actionText.textContent = "No TOPAZ Device Found!"
        }
    }   
})