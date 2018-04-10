const gradesObj = {
    "A+" : 4.5,
    "A" : 4.0,
    "B+" : 3.5,
    "B" : 3.0,
    "C+" : 2.5,
    "C" : 2.0,
    "D+" : 1.5,
    "D" : 1.0,
    "F" : 0
}



class Lecture  {
    constructor(name, grade, credit, major){
        this.name = name,
        this.grade = grade,
        this.credit = credit, 
        this.major = major
        }
        getScore(mappingGradePoint){
          return mappingGradePoint[this.grade]*this.credit    
        }
}
class Lecutres {
    constructor(lectures=[]){
        this.major = [],
        this.nonMajor = [],
        this.sortLecture(lectures)
    }
    sortLecture(lectures){
        lectures.forEach(lecture => this.saveLecture(lecture))
    }
    saveLecture(lecture){
        lecture.major ?  this.major.push(lecture) :  this.nonMajor.push(lecture)
    }
}

class Report {
    constructor(){
        this.GPA = 0,
        this.credits = 0,
        this.totalScore = 0
    }
}

class GradeCalculator  {
    constructor(addedLectures=new Lecutres(), scale = 4.5){
        this.savedLecutres = [],
        this.addedLectures = addedLectures,
        this.scale = scale,
        this.report = {
            total: new Report(),
            major: new Report(),
            nonMajor: new Report(),
        }
    }
    addLectures(lectures){
        const { major, nonMajor} = this.addedLectures
        major.push(...lectures.major)
        nonMajor.push(...lectures.nonMajor)
        debugger;
    }
    calcGrade(lectures, report){
        lectures.forEach(lecture => {
            report.credits += lecture.credit
            report.totalScore += lecture.getScore(gradesObj)
        })
        report.GPA = this.getGpa(report.totalScore, report.credits)
    }
    getMajorGrade(){
        const majorLectures = this.addedLectures.major
        const majorReport = this.report.major
        this.calcGrade(majorLectures, majorReport)
        this.saveAddedData(majorLectures)
        this.addedLectures.major = []
    }
    saveAddedData(lectures){
        this.savedLecutres.push(lectures)
    }
    getNonMajorGrade(){
        const nonMajorLectures = this.addedLectures.nonMajor
        const nonMajorReport = this.report.nonMajor
        this.calcGrade(nonMajorLectures, nonMajorReport)
        this.saveAddedData(nonMajorLectures)
        this.addedLectures.nonMajor = []
    }
    getTotalGreade(){
        if(this.addedLectures.major.length) this.getMajorGrade()
        if(this.addedLectures.nonMajor.length) this.getNonMajorGrade()
        const  {major, nonMajor} = this.report
        this.calcTotalGrade(major, nonMajor)
    }
    calcTotalGrade(major, nonMajor){
        const totalReport = this.report.total
        totalReport.totalScore = major.totalScore + nonMajor.totalScore
        totalReport.credits = major.credits + nonMajor.credits
        totalReport.GPA = this.getGpa(totalReport.totalScore, totalReport.credits)
    }
    getGpa(totalScore, credits){
        return (totalScore/credits).toFixed(2)
    }
    init(){
        this.report.total = new Report()
        this.report.major = new Report()
    }
}

const lectureData = [
    new Lecture('데이터베이스','A', 3,true),
    new Lecture('교양영어','B+', 2, false),
    new Lecture('인간공학','A+', 3,true),
  
]

const addedLectureData = [
    new Lecture('철학','C', 3, false),
    new Lecture('자료구조','A+', 3, true)
]
const addedLectureData2 = [
    new Lecture('실용음악','B', 3, false),
    new Lecture('전자기학','B+', 3, true)
]

const originLectures = new Lecutres(lectureData)
const newLecutres = new Lecutres(addedLectureData)
const newLecutres2 = new Lecutres(addedLectureData2)

const gradeCalculator = new GradeCalculator(originLectures);

gradeCalculator.getMajorGrade();


gradeCalculator.getTotalGreade();
gradeCalculator.addLectures(newLecutres);

gradeCalculator.getTotalGreade();
gradeCalculator.addLectures(newLecutres2);
gradeCalculator.getTotalGreade();

// console.log('gradeCalculator', gradeCalculator);
console.log(JSON.stringify(gradeCalculator, null, 2));




