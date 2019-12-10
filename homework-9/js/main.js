let initialIteration = true;
let percentageFormatter = (value) => {
    return value + "%";
}

class Tamag {
    constructor(maxPoints) {
        this.maxPoits = maxPoints;
        this.foodPoints = getRandomInt(50, maxPoints);
        this.happinessPoints = getRandomInt(50, maxPoints);
        this.cleanPoints = getRandomInt(50, maxPoints);
        this.healthPoints = getRandomInt(50, maxPoints);
        this.socializationPoints = getRandomInt(50, maxPoints);
        this.moneyPoints = getRandomInt(50, maxPoints);
        this.initialize();
        this.startTime = new Date();
    }
    initialize() {
        this.registerBathHtmlClickEventHandler();
        this.registerFeedHtmlClickEventHandler();
        this.registerRunHtmlClickEventHandler();
        this.registerVisitDoctorHtmlClickEventHandler();
        this.registerBuyFoodHtmlClickEventHandler();
        this.registerStartBusinessHtmlClickEventHandler();
        this.registerGoToWorkHtmlClickEventHandler();
        this.startGame();
    }
    isTamagochiDied() {
        if (this.foodPoints <= 0 || this.cleanPoints <= 0 || this.happinessPoints <= 0 || this.healthPoints <= 0 || this.socializationPoints <= 0 || this.moneyPoints <= 0) {
            document.getElementById("pet").src = "img/verybad.png";
            document.getElementById('massage').innerHTML = 'Your pet is dead. You can restart the game and start over.';
        }
    }

    renderRestartButtot() {
        if (initialIteration) {
            let restartContainerElem = document.getElementById('restart');
            let buttonElem = document.createElement('button');   //новый эл button
            buttonElem.innerHTML = 'restart';     //содержание кнопки
            restartContainerElem.appendChild(buttonElem); //вставить в конец элемента переданный элемент
        }
        initialIteration = false;
    }

    decreaseStatPerTimerTick() {
        this.foodPoints -= parseInt(reduceByPoint);
        this.cleanPoints -= parseInt(reduceByPoint);
        this.happinessPoints -= parseInt(reduceByPoint);
        this.healthPoints -= parseInt(reduceByPoint);
        this.socializationPoints -= parseInt(reduceByPoint);
        this.moneyPoints -= parseInt(reduceByPoint);
    }

    timer(reduceByPoint) {
        let renderTamagStats = () => {
            HtmlTextSetter.byElemId('stats__food--percent').setText(percentageFormatter(this.foodPoints));
            HtmlTextSetter.byElemId('stats__clean--percent').setText(percentageFormatter(this.cleanPoints));
            HtmlTextSetter.byElemId('stats__happiness--percent').setText(percentageFormatter(this.happinessPoints));
            HtmlTextSetter.byElemId('stats__health--percent').setText(percentageFormatter(this.healthPoints));
            HtmlTextSetter.byElemId('stats__socialization--percent').setText(percentageFormatter(this.socializationPoints));
            HtmlTextSetter.byElemId('stats__money--percent').setText(percentageFormatter(this.moneyPoints));
        }
        return renderTamagStats;
    }
    isRunOutOfMaxStatPoints(result, maxPoints) {
        return result <= maxPoints;
    }

    registerFeedHtmlClickEventHandler() {
        eat.onclick = () => {
            this.result = this.foodPoints + 30;
            if (this.isRunOutOfMaxStatPoints(this.result)) {
                 this.cleanPoints -= 20;
            }
            HtmlTextSetter.byElemId('stats__food--percent').setText(percentageFormatter(this.foodPoints));
        }
    }

    registerBathHtmlClickEventHandler() {
        bath.onclick = () => {
            this.result = this.cleanPoints + 40;
            if (this.isRunOutOfMaxStatPoints(this.result)) {
                this.happinessPoints -= 20;
            }
            HtmlTextSetter.byElemId('stats__clean--percent').setText(percentageFormatter(this.cleanPoints));
        }
    }

    registerRunHtmlClickEventHandler() {
        run.onclick = () => {
            this.result = this.happinessPoints + 15;
            if (this.isRunOutOfMaxStatPoints(this.result)) {
                return this.foodPoints -= 10;
            }
            HtmlTextSetter.byElemId('stats__happiness--percent').setText(percentageFormatter(this.happinessPoints));
        }
    }

    registerVisitDoctorHtmlClickEventHandler() {
        visitDoctor.onclick = () => {
            this.result = this.healthPoints + 30;
            if (this.isRunOutOfMaxStatPoints(this.result)) {
                 this.moneyPoints -= 20;
            }
            HtmlTextSetter.byElemId('stats__health--percent').setText(percentageFormatter(this.healthPoints));
        }
    }

    registerBuyFoodHtmlClickEventHandler() {
        buyFood.onclick = () => {
            this.result = this.foodPoints + 15;
            if (this.isRunOutOfMaxStatPoints(this.result)) {
                this.moneyPoints -= 15;
            }
            HtmlTextSetter.byElemId('stats__food--percent').setText(percentageFormatter(this.foodPoints));
        }
    }

    registerStartBusinessHtmlClickEventHandler() {
        startBusiness.onclick = () => {
            this.result = this.moneyPoints + 100;
            if (this.isRunOutOfMaxStatPoints(this.result)) {
                this.happinessPoints += 100;
                this.healthPoints -= 100;
                this.socializationPoints += 20;
            }
            HtmlTextSetter.byElemId('stats__money--percent').setText(percentageFormatter(this.moneyPoints));
            HtmlTextSetter.byElemId('stats__happiness--percent').setText(percentageFormatter(this.happinessPoints));
            HtmlTextSetter.byElemId('stats__socialization--percent').setText(percentageFormatter(this.socializationPoints));
        }
    }

        registerGoToWorkHtmlClickEventHandler() {
            goToWork.onclick = () => {
                this.result = this.moneyPoints + 50;
                if (this.isRunOutOfMaxStatPoints(this.result)) {
                    this.moneyPoints += 50;
                    this.foodPoints -= 10;
                    this.socializationPoints -= 20;
                }
                HtmlTextSetter.byElemId('stats__money--percent').setText(percentageFormatter(this.moneyPoints))
                HtmlTextSetter.byElemId('stats__happiness--percent').setText(percentageFormatter(this.foodPoints));
                HtmlTextSetter.byElemId('stats__socialization--percent').setText(percentageFormatter(this.socializationPoints));
            }
        }
        startGame(reduceByPoint){
            this.timer(reduceByPoint);
            setInterval(this.timer.bind(this, reduceByPoint), 1000);
        }
}
class HtmlTextSetter {
    static byElemId(elemId){
        return new HtmlTextSetter(document.getElementById(elemId));
    }
    constructor(elem){
        this.elem = elem;
    }
    setText(text){
        this.elem.innerHTML = text;
    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

 new Tamag(70).startGame(3);







