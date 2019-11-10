// super class
class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

// subclass
class Park extends Element {
    constructor(name, buildYear, area, treeNum) {
        super(name, buildYear);
        this.area = area; //km2
        this.treeNum = treeNum;
    }
    treeDensity() {
        const density = this.treeNum / this.area;
        console.log(
            `${this.name} has a tree density of ${density} trees per square km`,
        );
    }
}

// street subclass
class Street extends Element {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
    classifyStreet() {
        const classification = new Map();
        classification.set(1, "tiny");
        classification.set(2, "small");
        classification.set(3, "normal");
        classification.set(4, "big");
        classification.set(5, "huge");
        console.log(
            `${this.name}, build in ${
                this.buildYear
            }, is a ${classification.get(this.size)} street`,
        );
    }
}

const allParks = [
    new Park("Green Park", 1987, 0.2, 215),
    new Park("National Park", 1894, 2.9, 3541),
    new Park("Oak Park", 1953, 0.4, 949),
];

const allStreets = [
    new Street("Ocean Avenue", 1999, 1.1, 4),
    new Street("Evergreen Street", 2008, 2.7, 2),
    new Street("4th street", 2015, 0.8),
    new Street("Sunday Boulevard", 1982, 2.5, 5),
];

function calc(arr) {
    //0 is the initialvalue where want to start
    // e.g.
    //[3,5,6]
    // prev is 0, cur is 3 so prev + cur is 0+3 = 3
    //next iteration
    // prev is 3, cur is 5 so prev + cur is 3+5 = 8
    // prev is 8, cur is 6 so prev + cur is 8+6 = 14
    // returns 14
    const sum = arr.reduce((prev, cur, index) => prev + cur, 0);

    return [sum, sum / arr.length];
}

function reportParks(p) {
    console.log("========== Parks ==========");
    // Density
    p.forEach(el => el.treeDensity());
    // Average age
    const ages = p.map(el => new Date().getFullYear() - el.buildYear);
    const [totalAge, avgAge] = calc(ages);
    console.log(`Our ${p.length} parks have an average of ${avgAge} years.`);
    // Which park has more than 1000 trees
    // for each treeNum, return the index where the el is >= 1000
    const i = p.map(el => el.treeNum).findIndex(el => el >= 1000);
    console.log(`${p[i].name} has more than 1000 trees`);
}
function reportStreets(s) {
    console.log("========== Streets ==========");
    // Total and avg length of the town's streets
    // put in an array of the element's length
    const [totalLength, avgLength] = calc(s.map(el => el.length));
    console.log(
        `Our ${s.length} streets have a total length of ${totalLength} km, with an average of ${avgLength} km`,
    );
    // classify sizes
    s.forEach(el => el.classifyStreet());
}
reportParks(allParks);
reportStreets(allStreets);
