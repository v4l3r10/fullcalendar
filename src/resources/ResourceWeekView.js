
fcViews.resourceWeek = ResourceWeekView;

function ResourceWeekView(element, calendar) {
  var t = this;
  
  
  // exports
  t.render = render;
  
  
  // imports
  MainResourceWeekView.call(t, element, calendar, 'resourceWeek');
  var opt = t.opt;
  var renderResourceWeekView = t.renderResourceWeekView;
  var skipHiddenDays = t.skipHiddenDays;
  var getCellsPerWeek = t.getCellsPerWeek;
  var formatDates = calendar.formatDates;
  
  
  
  function render(date, delta) {
    if (delta) {
      addDays(date, delta * 7);
    }
    var start = addDays(cloneDate(date), -((date.getDay() - opt('firstDay') + 7) % 7));
    var end = addDays(cloneDate(start), 7);
    var visStart = cloneDate(start);
	skipHiddenDays(visStart);
    var visEnd = cloneDate(end);
	skipHiddenDays(visEnd, -1, true);
	
	/*
    var weekends = opt('weekends');
    if (!weekends) {
      skipWeekend(visStart);
      skipWeekend(visEnd, -1, true);
    }*/
	var colCnt = getCellsPerWeek();
	
    t.title = formatDates(
      visStart,
      addDays(cloneDate(visEnd), -1),
      opt('titleFormat')
    );
    t.start = start;
    t.end = end;
    t.visStart = visStart;
    t.visEnd = visEnd;
    renderResourceWeekView(colCnt);
  }
  

}
