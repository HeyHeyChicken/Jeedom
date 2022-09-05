const LIBRARIES = {
  Skill: require("../../../Libraries/Skill")
};

class Jeedom extends LIBRARIES.Skill {
  constructor(_main, _settings) {
    super(_main, _settings);
    const SELF = this;

    this.Main.Manager.addAction("Jeedom.on", function(_intent, _socket){
      console.log(_intent);
    });
  }
}

module.exports = Jeedom;
