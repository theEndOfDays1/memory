  const tip = `<div class="premonition">Recent notes appear here...</div>`
  const noteTitle = document.querySelector('.js-note-title');
  
  const noteTag = JSON.parse(localStorage.getItem('notes')) || [];

  function openNote(){
    document.querySelector('.note-history').classList.add('open-note');
  };

  function getNote() {
    const title = document.querySelector('.js-note-title');
    const body = document.querySelector('.js-note-body');
    const time = function(){
      const currentDay = new Date();
      const calenDate = currentDay.getDate(); //13th

      //This function adds ordinal numbers.
      const addSuffix = (calenDate) => {
        if(calenDate > 3 && calenDate < 21) return 'th';
        switch(calenDate % 10){
          case 1: return 'st';
          case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    //This function gets the true value from the numbers
    const trueVal  = (arr, int) =>  arr[int];

    const weekDay = currentDay.getDay(); //Wednesday
    const daysOfWeek = [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'
    ];
    const year = currentDay.getFullYear(); //2023

    const month = currentDay.getMonth(); // Sept
    const monthsOfYear = [
      'Jan', 'Feb', 'Mar', 
      'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sept', 
      'Oct', 'Nov', 'Dec'
    ]

    const hour = currentDay.getHours(); //hour

    //This function returns hours in double digits
    const doubleDigitHour = (hour) =>  hour < 10 ? hour = '0' + hour: hour;

    const minute = currentDay.getMinutes(); //minute
    let meridiem;
    meridiem = `${hour >= 12 ? meridiem = 'pm' : 'am' }`; //am/pm
    // let meridiem = 'pm';
    // if(hour < 12){
      //   meridiem = 'am'
      // };
      
    function twelfthHour(){
      // let twelveHour = hour;
      // if(hour >= 12 ){
      //   twelveHour = hour - 12;
      // }

      let twelveHour = hour
      hour >= 12  ? twelveHour = hour - 12 : hour
      return twelveHour
    }
    const timeStamp = `${trueVal(daysOfWeek, weekDay)}, ${calenDate}${addSuffix(calenDate)} ${trueVal(monthsOfYear, month)} ${year} at ${doubleDigitHour(twelfthHour())}:${doubleDigitHour(minute)}${meridiem}`;
    
    return timeStamp;
    }

  const titleValue = title.value;
  const bodyValue = body.value;
  const timeStamp = time();
  
  const noteObject = {
    title: titleValue,
    body: bodyValue,
    time: timeStamp,
  };
  noteTag.unshift(noteObject);
  printNote();
  saveToStorage();
  };

  function clearNoteHistory(){
    noteTag.splice(noteTag.splice(0, noteTag.length))
    printNote();
  };

  printNote();
  function printNote(){
    let noteStructure = '';
    for(let i = 0; i < noteTag.length; i++){
      const noteTagItem = noteTag[i];
      const title = noteTagItem.title;
      const body = noteTagItem.body;
      const time = noteTagItem.time;

      const htmlStructure = `
      <div class="note-tag active" onclick="
      document.querySelector('.js-note-title').value = '${title}';
      document.querySelector('.js-note-body').innerHTML = '${body}'
      openNote();
       ">
        <div class="title-div">
        <p class="note-tag-title">
          ${title.substring(0, 27)}
          ${title.length > 27 ? '...' : ''}
        </p>

        <!-- NOTE-TAG_ICONS  -->
        <!-- DELETE -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="23" height="23" class="icon" 
        onclick="
        noteTag.splice(${i}, 1);
        saveToStorage();
        printNote();
        "><path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path></svg>

        <!-- MORE -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="23" height="23" class="icon"><path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path></svg>     
      </div>

      <div class="note-tag-body">
        ${body.substring(0, 190)}
        ${body.length > 190 ? '...' : ''}
      </div>

      <span class="time-stamp js-time-stamp">
      ${time}
      </span>
    </div>
      `;
      noteStructure += htmlStructure;
    }
    document.querySelector('.contain-note-tags').innerHTML = noteStructure || tip;
    saveToStorage();
  };

  function closeNoteHistory() {
    document.querySelector('.note-history').classList.remove('open-note');
  };

  function saveToStorage(){
    localStorage.setItem('notes', JSON.stringify(noteTag));
  };
