class Platformer {
  constructor(player_start_pos) {
    this.start_pos = player_start_pos;
    this.acceleration = 0;
  }

  gravity(ammount_in_px) {
    
  }

  check_death() {
    if (remove_px($("#player").css("top")) >= window.innerHeight) {
      return true;
    } else {
      return false;
    }
  }

  respawn() {
    //Brings you back to the start
    $("#player").css({
      "top": platformer.start_pos["y"],
      "left": platformer.start_pos["x"]
    });
  }

  touching_platform() {
    //Check is the player is touching a platform
    for (var i = 0; i <= $(".object").length - 1; i++) {
      if (collision($("#player")[0], $(".object")[i])) {
        return true;
      }
    }
    return false;
  }

  touching_lava() {
    //Check is the player is touching a platform
    for (var i = 0; i <= $(".lava").length - 1; i++) {
      if (collision($(".lava")[i], $("#player")[0])) {
        return true;
        break;
      }
    }
    return false;
  }

  jump() {
    socket.emit("time");
    var jump = setInterval(function () {
      $("#player").css({ "top": "-=0.1px" });
    });

    setTimeout(function () { clearInterval(jump) }, 200);
  }
	lump() {
    socket.emit("time");
    var lump = setInterval(function () {
      $("#player").css({ "top": "+=0.1px" });
    });

    setTimeout(function () { clearInterval(lump) }, 200);
  }

  left() {
    socket.emit("time");
    var left = setInterval(function () {
      //If you want going left to be stronger increase the number:
      $("#player").css({ "left": "-=4px" });
    });

    setTimeout(function () { clearInterval(left) }, 10);
  }

  right() {
    socket.emit("time");
    var right = setInterval(function () {
      //If you want going right to be stronger increase the number:
      $("#player").css({ "left": "+=4px" });
    });

    setTimeout(function () { clearInterval(right) }, 10);
  }

  check_key(keyCodes) {
      if (keyCodes[32] || keyCodes[38] || keyCodes[87]) {//spacebar keycode
    socket.emit("time");
        platformer.jump();
      }
    if (keyCodes[39] || keyCodes[68]) {
    socket.emit("time");
      platformer.right();
    }
    if (keyCodes[37] || keyCodes[65]) {
    socket.emit("time");
      platformer.left();
    }
		if(keyCodes[40] || keyCodes[83]){
    socket.emit("time");
			platformer.lump();
		}
  }
}

var platformer = new Platformer({
  "y": window.innerHeight / 2,
  "x": window.innerHeight / 2
});
var Joy1 = new JoyStick('joyDiv');


  //Teleport to the start point when the game loads:
  platformer.respawn();

  //Detecting the keys being pressed:
  var down = {};//Keys that currently being pressed
  $(document).keydown(function (e) {
    down[e.keyCode] = true;
    console.log(e.keyCode);
  });
  $(document).keyup(function (e) {
    down[e.keyCode] = false;
  });
  //Checking if a certain key is pressed. If that key is pressed then the check_key method is called:
  //The number determines the speed of the left and right movements
  setInterval(function () { platformer.check_key(down);useJoy(down); }, 35);

function useJoy(keyCodes){
	var joyDir = Joy1.GetDir();
	if (joyDir == "S") {
    socket.emit("time");
        platformer.lump();
      }
    if (joyDir == "E") {
    socket.emit("time");
      platformer.right();
    }
    if (joyDir == "W") {
    socket.emit("time");
      platformer.left();
    }
		if(joyDir == "N"){
    socket.emit("time");
			platformer.jump();
		}
		//Other directions
		if (joyDir == "SW") {
    socket.emit("time");
        platformer.lump();
				platformer.left();
      }
    if (joyDir == "SE") {
    socket.emit("time");
      platformer.right();
			platformer.lump();
    }
    if (joyDir == "NE") {
    socket.emit("time");
      platformer.right();
			platformer.jump();
    }
		if(joyDir == "NW"){
    socket.emit("time");
			platformer.jump();
			platformer.left();
		}
}

//Respawn if the player is below the screens view or it dies by an obstacle
setInterval(function () {
  if (platformer.check_death()) {
    platformer.respawn();
  }
});

//mimic gravity
setInterval(function () {
  if (platformer.touching_lava()) {
    platformer.respawn();
  }
  if (!platformer.touching_platform()) {
    //The number represents how strong the gravity is. The 1.5 means how much pixels per milisecond the game will make the player further from the top
    platformer.gravity(0);
  } else {
    platformer.acceleration = 0;
	}
});