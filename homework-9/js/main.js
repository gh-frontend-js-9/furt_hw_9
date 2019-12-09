let initialIteration = true;

let percentageFormatter = (value) => {
    return value + "%";
}


class Tamag {
    constructor(maxPoints, foodPoints, happinessPoints, cleanPoints, healthPoints, socializationPoints, moneyPoints) {
        this.maxPoits = maxPoints;
        this.foodPoints = foodPoints;
        this.happinessPoints = happinessPoints;
        this.cleanPoints = cleanPoints;
        this.healthPoints = healthPoints;
        this.socializationPoints = socializationPoints;
        this.moneyPoints = moneyPoints;
    }

    timer(reduceByPoint) {
        let isTamagochiDied = () => {
            return (this.foodPoints <= 0 || this.cleanPoints <= 0 || this.happinessPoints <= 0 || this.healthPoints <= 0 || this.socializationPoints <= 0 || this.moneyPoints <= 0)
        }
        if (isTamagochiDied()) {
            document.getElementById("pet").src = "img/verybad.png";
            document.getElementById('massage').innerHTML = 'Your pet is dead. You can restart the game and start over.';

            if (initialIteration) {
                let restartContainerElem = document.getElementById('restart');
                let buttonElem = document.createElement('button');   //новый эл button
                buttonElem.innerHTML = 'restart';     //содержание кнопки
                restartContainerElem.appendChild(buttonElem); //вставить в конец элемента переданный элемент
            }
            initialIteration = false;
        }

        this.foodPoints -= parseInt(reduceByPoint);
        this.cleanPoints -=   parseInt(reduceByPoint);
        this.happinessPoints -=  parseInt(reduceByPoint);
        this.healthPoints -=  parseInt(reduceByPoint);
        this.socializationPoints -=  parseInt(reduceByPoint);
        this.moneyPoints -= parseInt(reduceByPoint);

        document.getElementById('stats__food--percent').innerHTML = percentageFormatter(this.foodPoints);
        document.getElementById('stats__clean--percent').innerHTML = percentageFormatter(this.cleanPoints);
        document.getElementById('stats__happiness--percent').innerHTML = percentageFormatter(this.happinessPoints);
        document.getElementById('stats__health--percent').innerHTML = percentageFormatter( this.healthPoints);
        document.getElementById('stats__socialization--percent').innerHTML = percentageFormatter(this.socializationPoints);
        document.getElementById('stats__money--percent').innerHTML = percentageFormatter(this.moneyPoints);
    }//timer

    //
    // isRunOutOfMaxStatPoints(result, maxPoints) {
    //     return result <= this.maxPoints;
    // }

    feed() {
        eat.onclick = () => {
            let result =  this.foodPoints + 30;
            let statFoodPersentElem = document.getElementById('stats__food--percent');
            result <= 70 ? [result, this.cleanPoints -= 20] : statFoodPersentElem.innerHTML = percentageFormatter(this.foodPoints);
console.log()
            // this.result = this.foodPoints + 30;
            // if (this.isRunOutOfMaxStatPoints(this.result, this.maxPoints)) {
            //     return [this.result, this.cleanPoints -= 20];
            // }
            // document.getElementById('stats__food--percent').innerHTML = percentageFormatter(this.foodPoints);
        }
    }

    bath() {
        bath.onclick = () => {
            this.result = this.cleanPoints + 40;
            if (this.isRunOutOfMaxStatPoints(this.result)) {
                return [this.result, this.happinessPoints -= 20];
            }
            document.getElementById('stats__clean--percent').innerHTML = percentageFormatter(this.cleanPoints);
        }
    }

    run() {
        run.onclick = () => {
            this.result = this.happinessPoints + 15;
            if (this.isRunOutOfMaxStatPoints(this.result)) {
                return [this.result, this.foodPoints -= 10];
            }
            document.getElementById('stats__happiness--percent').innerHTML = percentageFormatter(this.happinessPoints);
        }
    }
    visitDoctor() {
        visitDoctor.onclick = () => {
                this.result = this.healthPoints + 30;
                if (this.isRunOutOfMaxStatPoints(this.result)) {
                    return [this.result, this.moneyPoints -= 20];
                }
                document.getElementById('stats__health--percent').innerHTML = percentageFormatter(this.healthPoints);
            }
    }
    buyFood(){
            buyFood.onclick = () => {
                this.result = this.foodPoints + 15;
                if (this.isRunOutOfMaxStatPoints(this.result)) {
                    return [this.result, this.moneyPoints -= 15];
                }
                document.getElementById('stats__food--percent').innerHTML = percentageFormatter(this.foodPoints);
            }
        }
    startBusiness(){
            startBusiness.onclick = () => {
                this.result = this.moneyPoints + 100;
                if (this.isRunOutOfMaxStatPoints(this.result)) {
                    return [this.result, this.happinessPoints += 100, this.healthPoints -= 100, this.socializationPoints += 20]
                }
                document.getElementById('stats__money--percent').innerHTML = percentageFormatter(this.moneyPoints);
                document.getElementById('stats__happiness--percent').innerHTML = percentageFormatter(this.happinessPoints);
                document.getElementById('stats__socialization--percent').innerHTML = percentageFormatter(this.socializationPoints);
            }
        }

    startGame(reduceByPoint){
        this.timer(reduceByPoint)
        setInterval(this.timer.bind(this, reduceByPoint), 1000)
    }

}//Tamag

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let pug = new Tamag(70, getRandomInt(50, 70), getRandomInt(50, 70), getRandomInt(50, 70), getRandomInt(50, 70), getRandomInt(50, 70), getRandomInt(50, 70));
pug.startGame(3);

pug.bath();
pug.feed();
pug.run();
pug.visitDoctor();
pug.buyFood();
pug.startBusiness();
console.log(pug);

// let kitty = new Tamag(getRandomInt(50, 100), getRandomInt(50, 100), getRandomInt(50, 100), getRandomInt(50,100), getRandomInt(50,100), getRandomInt(50, 100));
// kitty.startGame();
// kitty.timer(5);
// getRandomInt(50, 100);
// kitty.bath();
// kitty.feed();
// kitty.run();
// console.log(kitty)



