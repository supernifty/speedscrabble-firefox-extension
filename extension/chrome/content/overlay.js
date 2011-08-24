var speedscrabble = {
  server: "http://www.supernifty.com.au/",

  load: function() {
    // initialization code
    this.initialized = true;
    window.setTimeout( speedscrabble.update, 1000 );
  },

  update: function() {
    document.getElementById("speedscrabble-status-label").label = 'Checking...';
    YAHOO.util.Connect.asyncRequest('POST', speedscrabble.server + "speed_scrabble_server.php", { success: speedscrabble.success, failure: speedscrabble.failed }, "json=" + YAHOO.lang.JSON.stringify({ "command": "public_state" }));
  },

  build: function( ws, rs ) {
    var out = '';
    for ( var i = 0; i < ws.length; i++ ) {
      out += ws[i]['name'] + ' ';
    }
    for ( var i = 0; i < rs.length; i++ ) {
      out += rs[i]['name'] + ' ';
    }
    return out;
  },

  success: function(o) {
    var result = YAHOO.lang.JSON.parse(o.responseText),
      total = result['waiting'].length + result['playing'].length,
      target = document.getElementById("speedscrabble-status-label"),
      another_target = document.getElementById("speedscrabble-status-icon"),
      list = speedscrabble.build( result['waiting'], result['playing'] ); 
    if ( total > 1 ) {
      target.label = total + ' players';
      target.setAttribute( "tooltiptext", list );
      another_target.setAttribute( "tooltiptext", list );
    }
    else if ( total == 1 ) {
      target.label = total + ' player';
      target.setAttribute( "tooltiptext", list );
      another_target.setAttribute( "tooltiptext", list );
    }
    else {
      target.label = 'None';
      target.setAttribute( "tooltiptext", 'None' );
      another_target.setAttribute( "tooltiptext", 'None' );
    }
    window.setTimeout( speedscrabble.update, 30000 );
  },

  failure: function() {
    document.getElementById("speedscrabble-status-label").label = '?';
    window.setTimeout( speedscrabble.update, 60000 );
  },

  show: function() {
    // doesn't work
  }
};

window.addEventListener("load", function () { speedscrabble.load(); }, false);