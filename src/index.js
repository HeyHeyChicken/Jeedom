const LIBRARIES = {
  Skill: require("../../../Libraries/Skill")
};

class Jeedom extends LIBRARIES.Skill {
  constructor(_main, _settings) {
    super(_main, _settings);
    const SELF = this;

    this.Main.Manager.addAction("Jeedom.on", function(_intent, _socket){
      SELF.Main.HTTPSJsonGet(_settings.jeedomIP, "/core/api/jeeApi.php?apikey=" + _settings.jeedomToken + "&type=fullData", function(items){
        for(let index = 0; index < items.length; index++){
          console.log(items.name);
        }
      });
    });
  }
}

module.exports = Jeedom;
