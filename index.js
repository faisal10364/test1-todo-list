var add_button = document.getElementById('add-btn');
var delete_buttons = document.getElementsByClassName('task-delete-btn');
var input = document.getElementById('task-name');
var completeAll_button = document.getElementById('complete-all-btn');
var tasks_container = document.querySelector('.tasks-container') ;
var showAll = document.getElementById('showAll');
var showComplete = document.getElementById('showComplete') ;
var showInProgress = document.getElementById('showInProgress') ;
var showNotStarted = document.getElementById('showNotStarted') ;
var showStatus = 'showAll' ;
showAll.style.color = 'Black' ;

var task_card_content  = '<div class="status-icon"></div><div class="task-content"></div><div class="task-status red">Not-Started</div><div class="task-delete-btn"><i class="far fa-trash-alt"></i></div>' ;
var task_count = 5;

// Assigning the colors to the status-icon

function assignColour() {
    let statusIconButtons = document.getElementsByClassName('status-icon') ;
    for (div of statusIconButtons) {
        div.style.backgroundColor = div.parentElement.children[2].classList[1] ;
    }
}


// Updating the current task count

function currentTaskCount() {
    document.getElementById('task-count').innerHTML = task_count ;
}

currentTaskCount() ;


// Setting functionality to the inner elements of the task-card

function eventSetter() {

    assignColour() ;

    for (btn of delete_buttons) {
        btn.addEventListener('click' , function () {
            let parent = this.parentElement ;
            parent.parentNode.removeChild(parent) ;
            task_count-- ;
            currentTaskCount();
            eventSetter();
        }) ;
    }

    let progress_button = document.getElementsByClassName('status-icon') ;

    for (btn of progress_button) {

        btn.addEventListener('click' , function () {
            let currentProgress = this.parentElement.classList[1] ;
            this.parentElement.classList.remove(currentProgress) ;
            let statusElement = this.parentElement.children[2] ;

            if (currentProgress === 'not-started') {
                this.parentElement.classList.add('in-progress') ;
                statusElement.innerHTML = 'in-progress' ;
                statusElement.classList.remove(statusElement.classList[1]) ;
                statusElement.classList.add('blue') ;

            }else if (currentProgress === 'completed') {
                this.parentElement.classList.add('in-progress') ;
                statusElement.innerHTML = 'in-progress' ;
                statusElement.classList.remove(statusElement.classList[1]) ;
                statusElement.classList.add('blue') ;

            }else {
                this.parentElement.classList.add('completed') ;
                statusElement.innerHTML = 'completed' ;
                statusElement.classList.remove(statusElement.classList[1]) ;
                statusElement.classList.add('green') ;
            }

            this.style.backgroundColor = statusElement.classList[1] ;

        });
    }



}

eventSetter() ;

// Adding functionality to the add button

input.addEventListener('keyup' , function (event) {
    if (event.keyCode === 13) {
        if (input.value === '') {
            return ;
        }
        let task_card = document.createElement('div') ;
        task_card.innerHTML = task_card_content ;
        task_card.setAttribute('class' , 'task-card not-started') ;
        tasks_container.appendChild(task_card) ;
        let task_inner_content = task_card.children[1] ;
        task_inner_content.innerHTML = input.value ;
        input.value = '' ;
        task_count++ ;
        currentTaskCount() ;
        eventSetter() ;
    }
})

add_button.addEventListener('click' , function () {
    if (input.value === '') {
        return ;
    }
    let task_card = document.createElement('div') ;
    task_card.innerHTML = task_card_content ;
    task_card.setAttribute('class' , 'task-card not-started') ;
    tasks_container.appendChild(task_card) ;
    let task_inner_content = task_card.children[1] ;
    task_inner_content.innerHTML = input.value ;
    input.value = '' ;
    task_count++ ;
    currentTaskCount() ;
    eventSetter() ;
});


// Complete All functioning

completeAll_button.addEventListener('click' , function () {
    let currentStatus;
    if (showStatus === 'showAll') {
        currentStatus = 'task-card'
    }else if (showStatus === 'showInProgress'){
        currentStatus = 'in-progress'
    }else if (showStatus === 'showNotStarted'){
        currentStatus = 'not-started'
    }else {
        return ;
    }

    let currentStatusDiv = document.getElementsByClassName(currentStatus) ;
    console.log(currentStatusDiv) ;
    let intervalID = setInterval(function () {
        if (currentStatusDiv.length === 0) {
            clearInterval(intervalID) ;
            return ;
        }

        for (parent of currentStatusDiv) {
            parent.classList.remove(parent.classList[1]) ;
            parent.classList.add('completed');
            let status_element = parent.children[2] ;
            status_element.innerHTML = 'completed' ;
            status_element.classList.remove(status_element.classList[1]);
            status_element.classList.add('green') ;
            console.log('changed') ;
            parent.children[0].style.backgroundColor = 'green' ;
            console.log(currentStatusDiv) ;
        }

    },0)
});


// Footer functioning

function resetColour() {
    let filter_btn = document.getElementsByClassName('filter-btn') ;
    for (btn of filter_btn) {
        btn.style.color = 'lightgray' ;
    }
}

showAll.addEventListener('click' , function () {

    if (showStatus !== 'showAll') {
        resetColour();
        this.style.color = 'black' ;
        let cards = document.getElementsByClassName('task-card') ;
        for (card of cards) {
            card.style.display = 'flex' ;
        }
        task_count = document.getElementsByClassName('task-card').length;
        currentTaskCount();
        showStatus = 'showAll' ;
    }
});

showComplete.addEventListener('click' , function () {
    if (showStatus !== 'showComplete') {
        resetColour();
        this.style.color = 'black' ;
        let cards = document.getElementsByClassName('task-card') ;
        for (card of cards) {
            if (card.classList[1] !== 'completed') {
                card.style.display = 'none' ;
            }else {
                card.style.display = 'flex' ;
            }
        }
        task_count = document.getElementsByClassName('completed').length;
        currentTaskCount();
        showStatus = 'showComplete' ;
    }
}) ;

showInProgress.addEventListener('click' , function () {

    if (showStatus !== 'showInProgress') {
        resetColour();
        this.style.color = 'black' ;
        let cards = document.getElementsByClassName('task-card') ;
        for (card of cards) {
            if (card.classList[1] !== 'in-progress') {
                card.style.display = 'none' ;
            }else {
                card.style.display = 'flex' ;
            }
        }
        task_count = document.getElementsByClassName('in-progress').length;
        currentTaskCount();
        showStatus = 'showInProgress' ;
    }
});

showNotStarted.addEventListener('click' , function () {
    if (showStatus !== 'showNotStarted') {
        resetColour();
        this.style.color = 'black' ;
        let cards = document.getElementsByClassName('task-card') ;
        for (card of cards) {
            if (card.classList[1] !== 'not-started') {
                card.style.display = 'none' ;
            }else {
                card.style.display = 'flex' ;
            }
        }
        task_count = document.getElementsByClassName('not-started').length;
        currentTaskCount();
        showStatus = 'showNotStarted' ;
    }
});





