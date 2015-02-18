var $ = require('jquery')(require("jsdom").jsdom().parentWindow);

// This is an object to create a character object
// We pass in the data from the original importChar
// function, represented as just "data", and return
// the charObj

module.exports = {
    importChar: function(region, name, realm, fn) {
        // first we want to test if the proper info
        // was sent. If not, then we want to error.
        if(region === '' || name === '' || realm === ''){
            console.log('Invalid character');
        } else {
            // we have info, let's summon this char
            // http://us.battle.net/api/wow/character/Windrunner/Caligraphy?fields=stats,items&locale=en_US&jsonp=callback&apikey=fbgams9zxkqsezwqaavxxk9u8rkvxxkn
            var url = 'https://' + region + '.battle.net' +'/api/wow/character/' + realm + '/' + name;
            var statsUrl = url + '?fields=stats,items&locale=en_US&jsonp=callback&apikey=fbgams9zxkqsezwqaavxxk9u8rkvxxkn';

            $.ajax({
                url: statsUrl,
                dataType: 'JSONP',
                jsonpCallback: 'callback',
                type: 'GET',
                success: function (data) {
                    console.log('Done fetching!');
                }
            }).done(function(data) {
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
        }else if (raceNumber == 10){
            this.race = 'blood elf';
        }else if (raceNumber == 5){
            this.race = 'undead';
        }else if (raceNumber == 4){
            this.race = 'goblin';
        }else if (raceNumber == 6){
            this.race = 'tauren';
        }else if (raceNumber == 8){
            this.race = 'troll';
        }else if (raceNumber == 2){
            this.race = 'orc';
        }

        console.log(this.race);
        this.tacoCat = 'Tacocat is a palindrome';
        return this;
    }
};
