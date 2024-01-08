  const localeSettings = {};
  dayjs.locale(localeSettings);
  // Wait until the DOM is fully loaded before executing the code inside the function.
  $(function () {
    // Get the current hour of the day using the dayjs library.
    const currentHour = dayjs().format('H');
  // The function below changes the color of each time block based on whether it's in the "past, present, or future" relative to the current hour.
    function hourlyColor() {
      $('.time-block').each(function() {
        const blockHour = parseInt(this.id);
        $(this).toggleClass('past', blockHour < currentHour);
        $(this).toggleClass('present', blockHour === currentHour);
        $(this).toggleClass('future', blockHour > currentHour);
      });
    }
  // The  function below will save the user's input in a textarea to localStorage - only when the corresponding save button has been clicked.
    function textEntry() {
      $('.saveBtn').on('click', function() {
        const key = $(this).parent().attr('id');
        const value = $(this).siblings('.description').val();
        localStorage.setItem(key, value);
      });
    }
   // The function below will refresh the color of each time block based on whether it's in the past(grey), present(red), or future(green) relative to the current time. 
    function refreshColor() {
      $('.time-block').each(function() {
        const blockHour = parseInt(this.id);
        if (blockHour == currentHour) {
          $(this).removeClass('past future').addClass('present');
        } else if (blockHour < currentHour) {
          $(this).removeClass('future present').addClass('past');
        } else {
          $(this).removeClass('past present').addClass('future');
        }
      });
    }
    // This will get you add text from the localStorage and set alerts for each time block.
    $('.time-block').each(function() {
      const key = $(this).attr('id');
      const value = localStorage.getItem(key);
      $(this).children('.description').val(value);
    });
  
    // This will display the current date 
    function updateTime() {
      const dateElement = $('#date');
      const currentDate = dayjs().format('dddd, MMMM D, YYYY');
      
      dateElement.text(currentDate);
     
    }
    // Call the three main functions to set up the page.
    hourlyColor();
    textEntry();                
    refreshColor();
   
  });