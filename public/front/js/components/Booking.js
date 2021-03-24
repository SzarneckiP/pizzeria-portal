import{ templates, select, settings, classNames} from './../settings.js';
import utils from '../utils.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

class Booking {
  constructor(element){
    const thisBooking = this;

    thisBooking.selectTable = [];
    thisBooking.render(element);
    thisBooking.initWidgets();
    thisBooking.getData();
  }

  getData(){
    const thisBooking = this;

    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
    const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);

    const params = {
      booking: [
        startDateParam,
        endDateParam,
      ],
      eventsCurrent: [
        settings.db.notRepeatParam,
        startDateParam,
        endDateParam,
      ],
      eventsRepeat: [
        settings.db.repeatParam,
        endDateParam,
      ],
    };

    //console.log('getData params:', params);

    const urls = {
      booking:      settings.db.url + '/' + settings.db.booking + '?' + params.booking.join('&'),
      eventsCurrent: settings.db.url + '/' + settings.db.event   + '?' + params.eventsCurrent.join('&'),
      eventsRepeat:  settings.db.url + '/' + settings.db.event   + '?' + params.eventsRepeat.join('&'),
    };
    //console.log('getData urls', urls);
    Promise.all([
      fetch(urls.booking),
      fetch(urls.eventsCurrent),
      fetch(urls.eventsRepeat),
    ])
      .then(function(allResponses){
        const bookingResponse = allResponses[0];
        const eventsCurrentResponse = allResponses[1];
        const eventsRepeatResponse = allResponses[2];
        return Promise.all([
          bookingResponse.json(),
          eventsCurrentResponse.json(),
          eventsRepeatResponse.json(),
        ]);
      })
      .then(function([bookings, eventsCurrent, eventsRepeat]){
        //console.log(bookings);
        //console.log(eventsCurrent);
        //console.log(eventsRepeat);
        thisBooking.parseData(bookings, eventsCurrent, eventsRepeat);
      });
  }

  parseData(bookings, eventsCurrent, eventsRepeat){
    const thisBooking = this;

    thisBooking.booked = {};

    for(let item of bookings){
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    for(let item of eventsCurrent){
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    const minDate = thisBooking.datePicker.minDate;
    const maxDate = thisBooking.datePicker.maxDate;

    for(let item of eventsRepeat){
      if(item.repeat == 'daily'){
        for(let loopDate = minDate; loopDate <= maxDate; loopDate = utils.addDays(loopDate, 1)){
          thisBooking.makeBooked(utils.dateToStr(loopDate), item.hour, item.duration, item.table);
        }
      }
    }
    thisBooking.updateDOM();
  }

  makeBooked(date, hour, duration, table){
    const thisBooking = this;

    if(typeof thisBooking.booked[date] == 'undefined'){
      thisBooking.booked[date] = {};
    }

    const startHour = utils.hourToNumber(hour);

    for(let hourBlock = startHour; hourBlock < startHour + duration; hourBlock += 0.5){
      //console.log('loop', hourBlock);

      if(typeof thisBooking.booked[date][hourBlock] == 'undefined'){
        thisBooking.booked[date][hourBlock] = [];
      }

      thisBooking.booked[date][hourBlock].push(table);
    }
  }

  updateDOM(){
    const thisBooking = this;

    thisBooking.date = thisBooking.datePicker.value;
    thisBooking.hour = utils.hourToNumber(thisBooking.hourPicker.value);

    let allAvailable = false;

    if(
      typeof thisBooking.booked[thisBooking.date] == 'undefined'
      ||
      typeof thisBooking.booked[thisBooking.date][thisBooking.hour] == 'undefined'
    ){
      allAvailable = true;
    }

    for(let table of thisBooking.dom.tables){
      let tableId = table.getAttribute(settings.booking.tableIdAttribute);
      if(!isNaN(tableId)){
        tableId = parseInt(tableId);
      }

      if(
        !allAvailable
        &&
        thisBooking.booked[thisBooking.date][thisBooking.hour].includes(tableId)
      ){
        table.classList.add(classNames.booking.tableBooked);
      } else {
        table.classList.remove(classNames.booking.tableBooked);
      }
    }
  }

  render(element){
    const thisBooking = this;
    thisBooking.starters = [];
    const generatedHTML = templates.bookingWidget();

    thisBooking.dom = {};
    thisBooking.dom.wrapper = element;
    thisBooking.dom.wrapper.innerHTML = generatedHTML; //zmiana zawartości wrappera (innerHTML) na kod HTML wygenerowany z szablonu.

    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);

    thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
    thisBooking.dom.hourPicker = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);

    thisBooking.dom.tables = thisBooking.dom.wrapper.querySelectorAll(select.booking.tables);
    thisBooking.dom.floorPlan = thisBooking.dom.wrapper.querySelector(select.booking.floorPlan);

    thisBooking.dom.btn = thisBooking.dom.wrapper.querySelector(select.booking.btn);
    thisBooking.dom.phone = thisBooking.dom.wrapper.querySelector(select.booking.phone);
    thisBooking.dom.address = thisBooking.dom.wrapper.querySelector(select.booking.address);
    thisBooking.dom.starters = thisBooking.dom.wrapper.querySelector(select.booking.starters);
  }

  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    //thisBooking.dom.amountWidget.addEventListener('click', function(){});

    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    //thisBooking.dom.hoursAmount.addEventListener('click', function(){});

    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker); //uruchomienie widgetu DatePicker
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);
    //console.log('hourpicker:', thisBooking.hourPicker);

    thisBooking.dom.floorPlan.addEventListener('click', function(event){
      event.preventDefault();
      thisBooking.initTables(event);
    });

    thisBooking.dom.starters.addEventListener('click', function(e){

      const clickedStarter = e.target;
      if(clickedStarter.tagName == 'INPUT' && clickedStarter.type == 'checkbox' && clickedStarter.name == 'starter'){
        if(clickedStarter.checked){
          thisBooking.starters.push(clickedStarter.value);
        }
      }
    });

    thisBooking.dom.wrapper.addEventListener('updated', function(){
      thisBooking.updateDOM();
      thisBooking.removeSelectedTable();
    });

    thisBooking.dom.btn.addEventListener('click', function(e){
      e.preventDefault();
      thisBooking.sendBooking();
    });
  }

  initTables(event){
    const thisBooking = this;

    const clickedElement = event.target;
    /*const tableNum = clickedElement.getAttribute('data-table');
    if(clickedElement.classList.contains(classNames.booking.table)){
      if (clickedElement.classList.contains(classNames.booking.tableSelected)){
        clickedElement.classList.remove(classNames.booking.tableSelected);
        thisBooking.selectTable.splice(thisBooking.selectTable.indexOf(tableNum), 1);
      } else {
        clickedElement.classList.add(classNames.booking.tableSelected);
        thisBooking.selectTable.push(tableNum);
      }
    }*/


    if(clickedElement.classList.contains(classNames.booking.table)){
      const tableNum = clickedElement.getAttribute('data-table');
      if(clickedElement.classList.contains(classNames.booking.tableBooked)){
        alert('Table is booked');
      } else
      if(!clickedElement.classList.contains(classNames.booking.tableBooked) && !clickedElement.classList.contains(classNames.booking.tableSelected))
      {
        thisBooking.removeSelectedTable();
        clickedElement.classList.add(classNames.booking.tableSelected);
        thisBooking.selectTable = tableNum;
      } else
      if (!clickedElement.classList.contains(classNames.booking.tableBooked && clickedElement.classList.contains(classNames.booking.tableSelected)))
      {
        clickedElement.classList.remove(classNames.booking.tableSelected);
        thisBooking.selectTable = null;
      }
    }
  }

  removeSelectedTable(){
    const thisBooking = this;

    for(let table of thisBooking.dom.tables){
      if(table.classList.contains(classNames.booking.tableSelected)){
        table.classList.remove(classNames.booking.tableSelected);
      }
    }
    thisBooking.selectTable = null;
  }

  sendBooking(){
    const thisBooking = this;

    const url = settings.db.url + '/' + settings.db.booking;
    const payload = {
      date: thisBooking.datePicker.value,
      hour: thisBooking.hourPicker.value, //godzina wybrana w hourPickerze (w formacie HH:ss)
      table: parseInt(thisBooking.selectTable), //numer wybranego stolika (lub null jeśli nic nie wybrano)
      duration: thisBooking.hoursAmount.value,
      ppl: thisBooking.peopleAmount.value,
      starters: [],
      phone: thisBooking.dom.phone.value,
      address: thisBooking.dom.address.value,
    };

    for(let personalData of thisBooking.starters){
      payload.starters.push(personalData);
    }

    const options = {
      method: 'POST', //wysyłanie na server domyślnie jest GET - pobieranie
      headers: {
        'Content-Type': 'application/json', // info dla servera, że ma spodziewać się plików JSON
      },
      body: JSON.stringify(payload), // skonwertowanie obiektu payload na JSON
    };

    fetch(url, options)
      .then(function(response){
        return response.json();
      })
      .then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
        thisBooking.makeBooked(parsedResponse.date, parsedResponse.hour, parsedResponse.duration, parsedResponse.table);
        thisBooking.updateDOM();
        thisBooking.removeSelectedTable();
      });
  }
}

export default Booking;
