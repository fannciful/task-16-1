'use strict';

function Student(firstName, lastName, birthYear) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
    this.grades = [];
    this.attendance = new Array(25).fill(null); 
}

Student.prototype.getAge = function() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.birthYear;
};

Student.prototype.getAverageGrade = function() {
    if (this.grades.length === 0) return 0;
    const sum = this.grades.reduce((acc, grade) => acc + grade, 0);
    return sum / this.grades.length;
};

Student.prototype.present = function() {
    const index = this.attendance.indexOf(null);
    if (index !== -1) {
        this.attendance[index] = true;
    } else {
        console.log('Масив відвідуваності вже заповнений!');
    }
};

Student.prototype.absent = function() {
    const index = this.attendance.indexOf(null);
    if (index !== -1) {
        this.attendance[index] = false;
    } else {
        console.log('Масив відвідуваності вже заповнений!');
    }
};

Student.prototype.addMultipleAttendances = function(count, status) {
    for (let i = 0; i < count; i++) {
        if (status) {
            this.present();
        } else {
            this.absent();
        }
    }
};

Student.prototype.getAverageAttendance = function() {
    const validEntries = this.attendance.filter(entry => entry !== null); 
    const presentDays = validEntries.filter(day => day === true).length;
    return presentDays / this.attendance.length; 
};

Student.prototype.summary = function() {
    const averageGrade = this.getAverageGrade();
    const attendanceRate = this.getAverageAttendance();

    if (averageGrade > 90 && attendanceRate > 0.9) {
        return "Молодець!";
    } else if (averageGrade > 90 || attendanceRate > 0.7) {
        return "Добре, але можна краще";
    } else {
        return "Редиска!";
    }
};

const student1 = new Student("Олеся", "Іваненко", 2000);
const student2 = new Student("Марія", "Максимович", 2003);
const student3 = new Student("Олесь", "Андрейка", 2002);

student1.grades = [90, 98, 92];
student2.grades = [80, 78, 43];
student3.grades = [86, 65, 75];

student1.addMultipleAttendances(25, true); 
student2.addMultipleAttendances(19, true); 
student3.addMultipleAttendances(5, true);  

console.log(`${student1.firstName} ${student1.lastName}: \nСередня оцінка - ${student1.getAverageGrade().toFixed(1)}, \nСередня відвідуваність - ${student1.getAverageAttendance().toFixed(2)}, \nСтатус - ${student1.summary()}`);
console.log(`${student2.firstName} ${student2.lastName}: \nСередня оцінка - ${student2.getAverageGrade().toFixed(1)}, \nСередня відвідуваність - ${student2.getAverageAttendance().toFixed(2)}, \nСтатус - ${student2.summary()}`);
console.log(`${student3.firstName} ${student3.lastName}: \nСередня оцінка - ${student3.getAverageGrade().toFixed(1)}, \nСередня відвідуваність - ${student3.getAverageAttendance().toFixed(2)}, \nСтатус - ${student3.summary()}`);
