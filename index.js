var add_button = document.getElementById('add-btn');
var delete_buttons = document.getElementsByClassName('task-delete-btn');
var input = document.getElementById('task-name');
var completeAll_button = document.getElementById('complete-all-btn');
var tasks_container = document.querySelector('.tasks-container') ;
var showAll = document.getElementById('showAllTasks');
var showComplete = document.getElementById('showCompleteTasks') ;
var showInProgress = document.getElementById('showInProgressTasks') ;
var showNotStarted = document.getElementById('showNotStartedTasks') ;
var showStatus = 'showAllTasks' ;
showAll.style.color = 'Black' ;

var task_card_content  = '<div class="status-color"></div><div class="task-content"></div><div class="task-status red">Not-Started</div><div class="task-delete-btn"><i class="far fa-trash-alt"></i></div>' ;
var task_count = 5;

// Assigning the colors to the status-icon

function assignColour() {
    let statusColorButtons = document.getElementsByClassName('status-color') ;
    for (div of statusColorButtons) {
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

    let progress_button = document.getElementsByClassName('status-color') ;

    for (btn of progress_button) {

        btn.addEventListener('click' , function () {
            console.log('clicked');
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
    if (showStatus === 'showAllTasks') {
        currentStatus = 'task-card'
    }else if (showStatus === 'showInProgressTasks'){
        currentStatus = 'in-progress'
    }else if (showStatus === 'showNotStartedTasks'){
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

    if (showStatus !== 'showAllTasks') {
        resetColour();
        this.style.color = 'black' ;
        let cards = document.getElementsByClassName('task-card') ;
        for (card of cards) {
            card.style.display = 'flex' ;
        }
        task_count = document.getElementsByClassName('task-card').length;
        currentTaskCount();
        showStatus = 'showAllTasks' ;
    }
});

showComplete.addEventListener('click' , function () {
    if (showStatus !== 'showCompleteTasks') {
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
        showStatus = 'showCompleteTasks' ;
    }
}) ;

showInProgress.addEventListener('click' , function () {

    if (showStatus !== 'showInProgressTasks') {
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
        showStatus = 'showInProgressTasks' ;
    }
});

showNotStarted.addEventListener('click' , function () {
    if (showStatus !== 'showNotStartedTasks') {
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
        showStatus = 'showNotStartedTasks' ;
    }
});





