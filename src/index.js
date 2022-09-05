const LIBRARIES = {
  Skill: require("../../../Libraries/Skill"),
  Axios: require("axios")
};

class Jeedom extends LIBRARIES.Skill {
  constructor(_main, _settings) {
    super(_main, _settings);
    const SELF = this;

    SELF.Main.Manager.addAction("Jeedom.on", function(_intent, _socket){
      SELF.Action("on", _intent, _socket);
    });

    SELF.Main.Manager.addAction("Jeedom.off", function(_intent, _socket){
      SELF.Action("off", _intent, _socket);
    });
  }

  Action(_code, _intent, _socket){
    _code = " " + _code + " ";
    const SELF = this;
    if(_intent.Variables.zone == undefined){
      _intent.Variables.zone = "";
    }
    SELF.Main.HTTPSJsonGet(SELF.Settings.jeedomIP, "/core/api/jeeApi.php?apikey=" + SELF.Settings.jeedomToken + "&type=fullData", function(rooms){
      if(rooms != null){
        for(const roomIndex in rooms){
          const ROOM = rooms[roomIndex];
          ROOM.name = " " + (ROOM.name == null ? "" : ROOM.name.toLowerCase()) + " ";
          ROOM.name = ROOM.name.replace("-", " ");

          if(ROOM.name.includes(" " + _intent.Variables.zone.toLowerCase() + " ")){
            for(const objectIndex in ROOM.eqLogics){
              const OBJECT = ROOM.eqLogics[objectIndex];
              if(OBJECT.name.toLowerCase() == _intent.Variables.target.toLowerCase()){
                for(const cmdIndex in OBJECT.cmds){
                  const CMD = OBJECT.cmds[cmdIndex];
                  CMD.name = " " + (CMD.name == null ? "" : CMD.name.toLowerCase()) + " ";
                  CMD.generic_type = " " + (CMD.generic_type == null ? "" : CMD.generic_type.toLowerCase()) + " ";
                  CMD.name = CMD.name.replace("_", " ");
                  CMD.generic_type = CMD.generic_type.replace("_", " ");
                  CMD.name = CMD.name.replace("-", " ");
                  CMD.generic_type = CMD.generic_type.replace("-", " ");

                  if(CMD.name.includes(_code) || CMD.generic_type.includes(_code)){
                    SELF.Main.HTTPSJsonGet(SELF.Settings.jeedomIP, "/core/api/jeeApi.php?apikey=" + SELF.Settings.jeedomToken + "&type=cmd&id=" + CMD.id);
                  }
                }
              }
            }
          }
        }
      }
      else{
        SELF.Main.Log("Error", "red");
      }
    }, false);
  }
}

module.exports = Jeedom;
