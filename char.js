// Generally don't want to use jQ for NPM modules. However,
// the tests complain and better to just copy another person's
// window than to recreat it.
var $ = require('jquery')(require("jsdom").jsdom().parentWindow);

// This is an object to create a character object
// We pass in the data from the original importChar
// function, represented as just "data", and return
// the charObj

module.exports = {
    importChar: function(region, name, realm, fn) {
		
    	console.log('Begin import: ' + name);
        // first we want to test if the proper info
        // was sent. If not, then we want to error.
        if(region === '' || name === '' || realm === ''){
            console.log('Invalid character');
        } else {
			
        	console.log('Valid character. Contacting Battle.net API!');
            // we have info, let's summon this char
            // https://us.api.battle.net/wow/character/hyjal/Calligraphy?fields=stats,talents,items&locale=en_US&jsonp=true&apikey=fbgams9zxkqsezwqaavxxk9u8rkvxxkn
            var url = 'https://' + region + '.api.battle.net/wow/character/' + realm + '/' + name;
            var statsUrl = url + '?fields=stats,items,talents&locale=en_US&jsonp=true&apikey=fbgams9zxkqsezwqaavxxk9u8rkvxxkn';
			console.log(url);
//			console.log(statsUrl);
//            var statsUrl = 'http://us.battle.net/api/wow/character/Stormreaver/Calligraphy?fields=stats,items,talents&locale=en_US&jsonp=callback&apikey=fbgams9zxkqsezwqaavxxk9u8rkvxxkn';
            // So, if we wanted to really impress someone, we could do this
            // in vanilla. Make an httprequest variable, set that, do a ton
            // of things. However, we're already using jQ for some of our
            // tests and console returns... and frankly, jQ's ajax
            // statements are clean enough we MIGHT AS WELL use it here.
            // Testing both ways, did not see a performance gain either way,
            // and this will be *far* more maintainable
            $.ajax({
                url: statsUrl,
                dataType: 'JSONP',
                jsonpCallback: 'callback',
                type: 'GET',
                success: function (data) {
                    console.log('Done fetching!');
                }
            }).done(function(data) {
				
            	console.log('Done!');
                // when it's done, we want to call something to actually make the char I guess
                fn(data);
            });

        }
    },
    // Character object used to creat characters
    Char: function(data) {
        var stats = data["stats"] || {},
            items = data["items"] || {};
        this.name = data["name"] || "Anon monk";

        // NOW TO INPUT ALL THE THINGS
        this.realm = data["realm"] || "No realm";
        this.race = data["race"] || "No race";

        // now the real stats!
        this.Agility = stats["agi"] || 0;
        this.Strength = stats["str"] || 0;
        this.AP = stats["attackPower"] || 0;
        this.Crit = stats["critRating"] || 0;
        this.Mastery = stats["masteryRating"] || 0;
		this.Multistrike = stats["multistrikeRating"] || 0;
        this.Haste = stats["hasteRating"] || 0;
        this.Versatility = stats["versatilityDamageDoneBonus"] || 0;
        this.VersRating = stats["versatility"] || 0;
    //    // 6.0 stats?
        //charObj["versatility"] = data["stats"]["versatilityRating"];
        this.Mdps = stats["mainHandDmgMax"] || 0;
        this.mdps = stats["mainHandDmgMin"] || 0;
        this.mhs = stats["mainHandSpeed"] || 0;
        
        this.ohdps = stats["offHandDmgMin"] || 0;
        this.Ohdps = stats["offHandDmgMax"] || 0;
        this.ohs = stats["offHandSpeed"] || 0;

    //    // so this will handle all the gear!
        this.Helm = items["head"] || 'No Item';
        this.Neck = items["neck"] || 'No Item';
        this.Shoulder = items["shoulder"] || 'No Item';
        this.Back = items["back"] || 'No Item';
        this.Chest = items["chest"] || 'No Item';
        this.Wrist = items["wrist"] || 'No Item';
        this.Hands = items["hands"] || 'No Item';
        this.Waist = items["waist"] || 'No Item';
        this.Legs = items["legs"] || 'No Item';
        this.Feet = items["feet"] || 'No Item';
        this.Finger1 = items["finger1"] || 'No Item';
        this.Finger2 = items["finger2"] || 'No Item';
        this.Trinket1 = items["trinket1"] || 'No Item';
        this.Trinket2 = items["trinket2"] || 'No Item';
        this.Mainhand = items["mainHand"] || 'No Item';
        this.Offhand = items["offHand"] || 'No Item';

        // tell what race the char is for race bonuses
        var raceNumber = data["race"] || '-1';

        if(raceNumber == 1){
            this.race = 'human';
        } else if (raceNumber == 3){
            this.race = 'dwarf';
        } else if(raceNumber == 4){
            this.race = 'night elf';
        } else if (raceNumber == 7){
            this.race = 'gnome';
        } else if(raceNumber == 22){
            this.race = 'worgen';
        }else if (raceNumber == 25){
            this.race = 'pandaren';
        }
        // TODO: Add horde

        // set talents
        if(data["talents"][1]["selected"] == true) {
           var talent = data["talents"][1]["talents"] || "";
        } else {
           var talent = data["talents"][0] || "";
        }
//        var talent = data["talents"][1] || "";
        this.talent15 = talent[2]["column"] || "";
        this.talent15name = talent[2]["spell"]["name"] || "No Talent";
        this.talent30 = talent[1]["column"] || "";
        this.talent30name = talent[1]["spell"]["name"] || "No Talent";
        this.talent45 = talent[5]["column"] || "";
        this.talent45name = talent[5]["spell"]["name"] || "No Talent";
        this.talent60 = talent[0]["column"] || "";
        this.talent60name = talent[0]["spell"]["name"] || "No Talent";
        this.talent75 = talent[3]["column"] || "";
        this.talent75name = talent[3]["spell"]["name"] || "No Talent";
        this.talent90 = talent[4]["column"] || "";
        this.talent90name = talent[4]["spell"]["name"] || "No Talent";
        this.talent100 = talent[6]["column"] || "";
        this.talent100name = talent[6]["spell"]["name"] || "No Talent";

//        console.log(talent);
        this.tacoCat = 'Tacocat is a palindrome';
        return this;
    }
};
