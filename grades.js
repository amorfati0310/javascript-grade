"use strict";

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function setGrade() {
    rl.question('과목을 JSON형태로 입력하세요<종료는 end입력> : ', function (answer) {
        if (answer === "end") {
            setTimeout(function () {
                printScore(data);
            }, 2000);
            rl.close(answer);
        } else {
            data.push(JSON.parse(answer));
            setGrade();
        }
    });
};

var data = [{
    'name': '데이터베이스',
    'grade': 'A',
    'credit': 3,
    'bMajor': true
}, {
    'name': '교양영어',
    'grade': 'B+',
    'credit': 1,
    'bMajor': false
}, {
    'name': '철학',
    'grade': 'A',
    'credit': 2,
    'bMajor': false
}];

function printScore(data) {
    var totalRating = 0;
    var majorRating = 0;
    var total = data.reduce(function (a, b) {
        return {
            credit: a.credit + b.credit
        };
    });
    var bMajor = data.filter(function (out) {
        return out.bMajor;
    }).reduce(function (a, b) {
        return {
            credit: a.credit + b.credit
        };
    });
    data.forEach(function (out) {
        totalRating += getGrade(out.grade) * (out.credit / total.credit);
        majorRating += out.bMajor ? getGrade(out.grade) * (out.credit / bMajor.credit) : 0;
    });
    console.log("총 평점 : " + totalRating.toFixed(2) + ", 전공평점 : " + majorRating.toFixed(2) + ", 이수학점 : " + total.credit + ", 전공이수학점 : " + bMajor.credit);
    console.log("4.0학점으로 변환하는 경우 총평점은 " + (totalRating * (4 / 4.5)).toFixed(2) + "은 입니다.");
};

function getGrade(grade) {
    var gradeMap = {
        A: 4,
        B: 3,
        C: 2,
        D: 1,
        F: 0
    };
    var gradeScore = grade.length > 1 ? gradeMap[grade[0]] + parseFloat(grade[1] + "0.5") : gradeMap[grade];

    return gradeScore;
}

setGrade();