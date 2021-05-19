var money = 0;

var applePies = 0;
var applePieTier = 1;
var applePieUpgradeBaseCost = 5;
var applePieBaseCost = 1.1;
var applePieCost = 1;
var applePieCooks = 0;
var applePieCookCost = 0;
var applePieIngredients = 0;
var applePieIngredientsCost = 0;
var applePieIngredientsEffect = 0;
var applePieCookbooks = 0;
var applePieCookbooksCost = 0;
var applePieCookTime = 4000;
var applePieOvenCost = 0;
var applePieOvens = 0;
var applePieMarketing = 0;
var applePieMarketingCost = 0;
var applePieSellPercent = 0.1;

var blueberryPies = 0;
var blueberryPieTier = 2;
var blueberryPieUpgradeBaseCost = 10;
var blueberryPieBaseCost = 1.5;
var blueberryPieCost = 1;
var blueberryPieCooks = 0;
var blueberryPieCookCost = 0;
var blueberryPieIngredients = 0;
var blueberryPieIngredientsCost = 0;
var blueberryPieIngredientsEffect = 0;
var blueberryPieCookbooks = 0;
var blueberryPieCookbooksCost = 0;
var blueberryPieCookTime = 4000;
var blueberryPieOvenCost = 0;
var blueberryPieOvens = 0;
var blueberryPieMarketing = 0;
var blueberryPieMarketingCost = 0;
var blueberryPieSellPercent = 0.1;

function applePieClick(number){
    applePies += number;
    updateUI();
};
function applePieAutoClick(number){
    applePieClick(number);
    setApplePieCookTimes();
}

function blueberryPieClick(number){
    blueberryPies += number;
    updateUI();
};
function blueberryPieAutoClick(number){
    blueberryPieClick(number);
    setBlueberryPieCookTimes();
}

function finishLoading(){
    let loading = document.getElementById('loading');
    loading.classList.remove('loading');
    loading.classList.add('hide');
    let game = document.getElementById('game');
    game.classList.remove('hide');
}

function sellPies(){
    calcUpgradeCosts();
    sell_ApplePies(applePieSellPercent);
    sell_BlueberryPies(blueberryPieSellPercent)
    updateUI();
};

function sell_ApplePies(number){
    let piesToBeSold = Math.max(Math.floor(number * applePies),1);
    let piesSold = Math.min(piesToBeSold,applePies);
    if(applePies >= piesToBeSold){
        applePies -= piesSold;
        money += piesSold*applePieCost;
    };
};

function sell_BlueberryPies(number){
    let piesToBeSold = Math.max(Math.floor(number * blueberryPies),1);
    let piesSold = Math.min(piesToBeSold,blueberryPies);
    if(blueberryPies >= piesToBeSold){
        blueberryPies -= piesSold;
        money += piesSold*blueberryPieCost;
    };
};

function buyApplePieIngredients(){
    calcUpgradeCosts();
    if(money >= applePieIngredientsCost){
        applePieIngredients += 1;
        money -= applePieIngredientsCost;
    }
    updateUI();
}

function buyBlueberryPieIngredients(){
    calcUpgradeCosts();
    if(money >= blueberryPieIngredientsCost){
        blueberryPieIngredients += 1;
        money -= blueberryPieIngredientsCost;
    }
    updateUI();
}

function buyApplePieMarketing(){
    calcUpgradeCosts();
    if(money >= applePieMarketingCost){
        applePieMarketing += 1;
        applePieSellPercent = (1 - Math.pow(0.99,applePieMarketing)) * 0.8 + 0.1;
        money -= applePieMarketingCost;
    }
    updateUI();
}

function buyBlueberryPieMarketing(){
    calcUpgradeCosts();
    if(money >= blueberryPieMarketingCost){
        blueberryPieMarketing += 1;
        blueberryPieSellPercent = (1 - Math.pow(0.99,blueberryPieMarketing)) * 0.8 + 0.1;
        money -= blueberryPieMarketingCost;
    }
    updateUI();
}

function buyApplePieCooks(){
    calcUpgradeCosts();
    if(money >= applePieCookCost){
        applePieCooks += 1;
        money -= applePieCookCost;
    };
    updateUI();
};

function buyBlueberryPieCooks(){
    calcUpgradeCosts();
    if(money >= blueberryPieCookCost){
        blueberryPieCooks += 1;
        money -= blueberryPieCookCost;
    };
    updateUI();
};

function buyApplePieOvens(){
    calcUpgradeCosts();
    if(money >= applePieOvenCost){
        applePieOvens += 1;
        money -= applePieOvenCost;
        applePieCookTime = Math.round(4000 * Math.pow(0.97,applePieOvens));
    };
    updateUI();
};

function buyBlueberryPieOvens(){
    calcUpgradeCosts();
    if(money >= blueberryPieOvenCost){
        blueberryPieOvens += 1;
        money -= blueberryPieOvenCost;
        blueberryPieCookTime = Math.round(4000 * Math.pow(0.97,blueberryPieOvens));
    };
    updateUI();
};

function calcUpgradeCosts(){
    calcUpgradeCosts_ApplePie();
    calcUpgradeCosts_BlueberryPie()
}

function calcUpgradeCosts_ApplePie(){
    let tiercost = Math.pow(0.9,applePieTier);
    
    applePieCookCost = Math.round((5+applePieUpgradeBaseCost) * Math.pow(1.1+tiercost,applePieCooks));

    applePieIngredientsCost = Math.round((15+applePieUpgradeBaseCost) * Math.pow(1.2+tiercost,applePieIngredients));
    applePieCost = applePieBaseCost+Math.pow(1.00+(applePieBaseCost/100),applePieIngredients+1);
    applePieIngredientsEffect = (applePieBaseCost+Math.pow(1.00+(applePieBaseCost/100),applePieIngredients+1)) - (applePieBaseCost+Math.pow(1.00+(applePieBaseCost/100),applePieIngredients+0));
    
    applePieOvenCost = Math.round((25+applePieUpgradeBaseCost) * Math.pow(1.4+tiercost,applePieOvens));

    applePieMarketingCost = Math.round((45+applePieUpgradeBaseCost) * Math.pow(1.6+tiercost,applePieMarketing));
}

function calcUpgradeCosts_BlueberryPie(){
    let tiercost = Math.pow(0.9,blueberryPieTier);
    
    blueberryPieCookCost = Math.round((5+blueberryPieUpgradeBaseCost) * Math.pow(1.1+tiercost,blueberryPieCooks));

    blueberryPieIngredientsCost = Math.round((15+blueberryPieUpgradeBaseCost) * Math.pow(1.2+tiercost,blueberryPieIngredients));
    blueberryPieCost = blueberryPieBaseCost+Math.pow(1.00+(blueberryPieBaseCost/100),blueberryPieIngredients+1);
    blueberryPieIngredientsEffect = (blueberryPieBaseCost+Math.pow(1.00+(blueberryPieBaseCost/100),blueberryPieIngredients+1)) - (blueberryPieBaseCost+Math.pow(1.00+(blueberryPieBaseCost/100),blueberryPieIngredients+0))

    blueberryPieOvenCost = Math.round((25+blueberryPieUpgradeBaseCost) * Math.pow(1.4+tiercost,blueberryPieOvens));

    blueberryPieMarketingCost = Math.round((45+blueberryPieUpgradeBaseCost) * Math.pow(1.6+tiercost,blueberryPieMarketing));
}

function updateUI(){
    calcUpgradeCosts();
    document.getElementById('money').innerHTML = money.toFixed(2);
    updateUI_applePie();
    updateUI_blueberryPie();
    finishLoading();
} 
function updateUI_applePie(){
    document.getElementById('applePieCooks').innerHTML = applePieCooks;
    document.getElementById('applePieCount').innerHTML = applePies;
    document.getElementById('applePieCooksBakeTime').innerHTML = (applePieCookTime/1000).toFixed(2);
    document.getElementById('applePieCooksBakeCount').innerHTML = applePieCooks;
    document.getElementById('applePieCookCost').innerHTML = applePieCookCost.toFixed(2);
    document.getElementById('applePieIngredients').innerHTML = applePieIngredients;
    document.getElementById('applePieIngredientsCost').innerHTML = applePieIngredientsCost.toFixed(2);
    document.getElementById('applePieIngredientsEffect').innerHTML = applePieIngredientsEffect.toFixed(2);
    document.getElementById('applePieCost').innerHTML = applePieCost.toFixed(2);
    document.getElementById('applePieOvenCost').innerHTML = applePieOvenCost.toFixed(2);
    document.getElementById('applePieOvens').innerHTML = applePieOvens;
    document.getElementById('applePieCookTime').innerHTML = applePieCookTime/1000;
    document.getElementById('applePieMarketing').innerHTML = applePieMarketing;
    document.getElementById('applePieMarketingCost').innerHTML = applePieMarketingCost;
    document.getElementById('applePieSellPercent').innerHTML = (applePieSellPercent*100).toFixed(2);
}

function updateUI_blueberryPie(){
    document.getElementById('blueberryPieCooks').innerHTML = blueberryPieCooks;
    document.getElementById('blueberryPieCount').innerHTML = blueberryPies;
    document.getElementById('blueberryPieCooksBakeTime').innerHTML = (blueberryPieCookTime/1000).toFixed(2);
    document.getElementById('blueberryPieCooksBakeCount').innerHTML = blueberryPieCooks;
    document.getElementById('blueberryPieCookCost').innerHTML = blueberryPieCookCost.toFixed(2);
    document.getElementById('blueberryPieIngredients').innerHTML = blueberryPieIngredients;
    document.getElementById('blueberryPieIngredientsCost').innerHTML = blueberryPieIngredientsCost.toFixed(2);
    document.getElementById('blueberryPieIngredientsEffect').innerHTML = blueberryPieIngredientsEffect.toFixed(2);
    document.getElementById('blueberryPieCost').innerHTML = blueberryPieCost.toFixed(2);
    document.getElementById('blueberryPieOvenCost').innerHTML = blueberryPieOvenCost.toFixed(2);
    document.getElementById('blueberryPieOvens').innerHTML = blueberryPieOvens;
    document.getElementById('blueberryPieCookTime').innerHTML = blueberryPieCookTime/1000;
    document.getElementById('blueberryPieMarketing').innerHTML = blueberryPieMarketing;
    document.getElementById('blueberryPieMarketingCost').innerHTML = blueberryPieMarketingCost;
    document.getElementById('blueberryPieSellPercent').innerHTML = (blueberryPieSellPercent*100).toFixed(2);
}

function setApplePieCookTimes(){
    window.setTimeout(function(){
        applePieAutoClick(applePieCooks);
    }, applePieCookTime);
}

function setBlueberryPieCookTimes(){
    window.setTimeout(function(){
        blueberryPieAutoClick(blueberryPieCooks);
    }, blueberryPieCookTime);
}

calcUpgradeCosts();
setApplePieCookTimes();
setBlueberryPieCookTimes();

window.setInterval(function(){
        sellPies();
}, 1100);