import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ObjectValuesPipe } from '../object-values.pipe';
declare var require: any;
declare var $:any;
@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.css']
})
export class ScorecardComponent implements OnInit {
      @ViewChild('colmd1') colmd1: ElementRef;

      viewHeight: number;
  constructor() {}
  scorecard = { "Data Management and Probability": { "Collection and Organization of Data": [
            [{ "src": "assets/dot16-yellow.png" }, { "specval": "collect and organize categorical or discrete primary data and display the data in charts, tables, and graphs using many-to-one correspondence" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Collection and Organization of Data" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "collect data by conducting a simple survey about themselves, their environment, issues in their school or community, or content from another subject" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Collection and Organization of Data" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "demonstrate an ability to organize objects into categories, by sorting and classifying objects using two or more attributes simultaneously" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Collection and Organization of Data" }]
        ], "Data Relationships": [
            [{ "src": "assets/dot16-white.png" }, { "specval": "demonstrate an understanding of mode" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Data Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "interpret and draw conclusions from data presented in charts, tables, and graphs" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Data Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "read primary data presented in charts, tables, and graphs, then describe the data using comparative language, and describe the shape of the data" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Data Relationships" }]
        ], "Probability": [
            [{ "src": "assets/dot16-white.png" }, { "specval": "demonstrate an understanding of fairness in a game and relate this to the occurrence of equally likely outcomes" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Probability" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "predict the frequency of an outcome in a simple probability experiment or game using mathematical language" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Probability" }]
        ] },
         "Geometry and Spatial Sense": { "Geometric Properties": [
            [{ "src": "assets/dot16-red.png" }, { "specval": "compare and sort prisms and pyramids by geometric properties" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Geometric Properties" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "compare various angles and describe angles as bigger than, smaller than, or about the same as other angles" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Geometric Properties" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "construct rectangular prisms and describe geometric properties of the prisms" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Geometric Properties" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "identify and compare various polygons and sort them by their geometric properties" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Geometric Properties" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "use a reference tool to identify right angles and to describe angles as greater than, equal to, or less than a right angle" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Geometric Properties" }]
        ], "Geometric Relationships": [
            [{ "src": "assets/dot16-white.png" }, { "specval": "describe and name prisms and pyramids by the shape of their base" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Geometric Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "explain the relationships between different types of quadrilaterals" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Geometric Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "identify and describe the two-dimensional shapes that can be found in a three-dimensional figure" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Geometric Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "identify congruent two-dimensional shapes by manipulating and matching concrete materials" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Geometric Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "solve problems requiring the greatest or least number of two-dimensional shapes needed to compose a larger shape in a variety of ways" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Geometric Relationships" }]
        ], "Location and Movement": [
            [{ "src": "assets/dot16-white.png" }, { "specval": "complete and describe designs and pictures of images that have a vertical, horizontal, or diagonal line of symmetry" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Location and Movement" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "describe movement from one location to another using a grid map" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Location and Movement" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "identify flips, slides, and turns, and name flips, slides, and turns as reflections, translations, and rotations" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Location and Movement" }]
        ] }, "Measurement": { "Attributes, Units, and Measurement Sense": [
            [{ "src": "assets/dot16-white.png" }, { "specval": "choose benchmarks for a kilogram and a litre to help them perform measurement tasks" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Attributes, Units, and Measurement Sense" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "draw items using a ruler, given specific lengths in centimetres" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Attributes, Units, and Measurement Sense" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "estimate, measure and record area" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Attributes, Units, and Measurement Sense" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "estimate, measure, and record length, height, and distance, using standard units" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Attributes, Units, and Measurement Sense" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "estimate, measure, and record the capacity of containers, using the standard unit of the litre or parts of a litre" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Attributes, Units, and Measurement Sense" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "estimate, measure, and record the mass of objects using the standard unit of the kilogram or parts of a kilogram" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Attributes, Units, and Measurement Sense" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "estimate, measure, and record the perimeter of two-dimensional shapes using standard units" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Attributes, Units, and Measurement Sense" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "estimate, read, and record positive temperatures to the nearest degree Celsius" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Attributes, Units, and Measurement Sense" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "identify benchmarks for freezing, cold, cool,warm, hot, and boiling temperatures as they relate to water and for cold, cool, warm, and hot temperatures as they relate to air" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Attributes, Units, and Measurement Sense" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "read time using analogue clocks, to the nearest five minutes, and using digital clocks, and represent time in 12-hour notation" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Attributes, Units, and Measurement Sense" }]
        ], "Measurement Relationships": [
            [{ "src": "assets/dot16-red.png" }, { "specval": "compare and order a collection of objects using standard units of mass" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Measurement Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "compare and order objects on the basis of linear measurements in centimetres and/or metres in problem-solving contexts" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Measurement Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "compare and order various shapes by area, using congruent shapes and grid paper for measuring" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Measurement Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "compare standard units of length, and select and justify the most appropriate standard unit to measure length" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Measurement Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "describe the relationship between the size of a unit of area and the number of units needed to cover a surface" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Measurement Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "solve problems involving the relationships between minutes and hours, hours and days, days and weeks, and weeks and years" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Measurement Relationships" }]
        ] }, "Number Sense and Numeration": { "Counting": [
            [{ "src": "assets/dot16-yellow.png" }, { "specval": "count backwards by 2?s, 5?s, and 10?s from 100 using multiples of 2, 5, and 10 as starting points, and count backwards by 100?s from 1000 and any number less than 1000" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Counting" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "count forward by 1?s, 2?s, 5?s, 10?s, and 100?s to 1000 from various starting points, and by 25?s to 1000 starting from multiples of 25" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Counting" }]
        ], "Operational Sense": [
            [{ "src": "assets/dot16-white.png" }, { "specval": "add and subtract money amounts, to make simulated purchases and change for amounts up to $10" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Operational Sense" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "add and subtract three-digit numbers" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Operational Sense" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "multiply to 7 x 7 and divide to 49 � 7" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Operational Sense" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "relate multiplication of one-digit numbers and division by one-digit divisors to reallife situations" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Operational Sense" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "solve problems involving the addition and subtraction of two-digit numbers" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Operational Sense" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "use estimation when solving problems involving addition and subtraction, to help judge the reasonableness of a solution" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Operational Sense" }]
        ], "Quantity Relationships": [
            [{ "src": "assets/dot16-white.png" }, { "specval": "compose and decompose three-digit numbers into hundreds, tens, and ones in a variety of ways" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Quantity Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "divide whole objects and sets of objects into equal parts, and identify the parts using fractional names" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Quantity Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "estimate, count, and represent (using the $ symbol) the value of a collection of coins and bills with a maximum value of $10" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Quantity Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "identify and represent the value of a digit in a number according to its position in the number" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Quantity Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "read and print in words whole numbers to one hundred, using meaningful contexts" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Quantity Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "represent and describe the relationships between coins and bills up to $10" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Quantity Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "represent and explain the relationship among the numbers 1, 10, 100, and 1000" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Quantity Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "represent, compare, and order whole numbers to 1000, using a variety of tools" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Quantity Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "round two-digit numbers to the nearest ten, in problems arising from real-life situations" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Quantity Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "solve problems that arise from real-life situations and that relate to the magnitude of whole numbers up to 1000" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Quantity Relationships" }]
        ] }, "Patterning and Algebra": { "Expressions and Equality": [
            [{ "src": "assets/dot16-yellow.png" }, { "specval": "determine the inverse relationship between addition and subtraction" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Expressions and Equality" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "determine, the missing number in equations involving addition and subtraction of one and two-digit numbers" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Expressions and Equality" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "identify and use the associative property of addition to facilitate computation with whole numbers" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Expressions and Equality" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "identify the properties of zero and one in multiplication" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Expressions and Equality" }]
        ], "Patterns and Relationships": [
            [{ "src": "assets/dot16-white.png" }, { "specval": "create a number pattern involving addition or subtraction, given a pattern represented on a number line or a pattern rule expressed in word" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Patterns and Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "demonstrate an understanding that a pattern results from repeating an action, repeating an operation, using a transformation, or making some other repeated change to an attribute" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Patterns and Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "extend repeating, growing, and shrinking number patterns" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Patterns and Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "identify and describe number patterns involving addition, subtraction, and multiplication, represented on a number line, on a calendar, and on a hundreds chart" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Patterns and Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "identify, extend, and create a repeating pattern involving two attributes" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Patterns and Relationships" }],
            [{ "src": "assets/dot16-white.png" }, { "specval": "represent simple geometric patterns using a number sequence, a number line, or a bar graph" }, { "url": "/assets/Curriculum.pdf#nameddest=Grade 3 - Patterns and Relationships" }]
        ] } };
        scorecard1:any;
        QuestionArr;
          ngOnInit() {
               let result = [];
               for (var key in this.scorecard) {
               if (this.scorecard.hasOwnProperty(key)) {
                  result.push(this.scorecard[key]);
                 }
               }
               this.scorecard1 = result;
               // console.log(result);
               this.QuestionArr = Object.keys(this.scorecard);
               // console.log(this.QuestionArr);

               
             }
            
        objectKeys(obj) {
          return Object.keys(obj);
          }
        getObjectinArray(obj){
           let result = [];
           for (var key in obj) {
           if (obj.hasOwnProperty(key)) {
              result.push(obj[key]);
               }
            }
         return result;
         }
    tempArr = [];
    tempArr1 = [];
     GetKey(key, key1){
         for (var k in this.scorecard) {
          if (this.scorecard.hasOwnProperty(k)) {
              this.tempArr.push(Object.keys(this.scorecard[k]));
           
            }
          }
        return this.tempArr[key][key1];
     
   }
    GetKey1(key, key1){
         for (var k in this.scorecard) {
          if (this.scorecard.hasOwnProperty(k)) {
              this.tempArr1.push(Object.keys(this.scorecard[k]));
           
            }
          }
        return this.tempArr1[key+1][key1]; 
      }
    retuenObject;
    MainColor(i){
    // return this.colorsTemp[this.QuestionArr[i]].color;
    return  {
                "background-color": this.colorsTemp[this.QuestionArr[i]].color,
                "color": "white",
            };

    }
    MainColor1(i){
        // console.log(this.colorsTemp[this.QuestionArr[i+1]].color);
     if(this.colorsTemp[this.QuestionArr[i+1]]){
       return  {
                "background-color": this.colorsTemp[this.QuestionArr[i+1]].color,
                "color": "white",
            };  
     }
    }
    getMainKey(i){     
     return this.QuestionArr[i];

     }
     getMainKey1(i){
     return this.QuestionArr[i+1];
     }
   
colorsTemp = {
     "Measurement": { "color": "#603CBA", "backgroundColor": "#E0D8F3", "displayorder": 1 },
     "Patterning and Algebra": { "color": "#FFC40D", "backgroundColor": "#FFF2CC", "displayorder": 2 },
     "Geometry and Spatial Sense": { "color": "#00A300", "backgroundColor": "#E6FFE6", "displayorder": 3 },
     "Number Sense and Numeration": { "color": "#1E7145", "backgroundColor": "#D7F4E5", "displayorder": 4 },
     "Data Management and Probability": { "color": "#9F00A7", "backgroundColor": "#FEE6FF", "displayorder": 5 },
     "Number Sense and Algebra": { "color": "#603CBA", "backgroundColor": "#E0D8F3", "displayorder": 6 },
     "Linear Relations": { "color": "#00A300", "backgroundColor": "#E6FFE6", "displayorder": 7 },
     "Analytic Geometry": { "color": "#FFC40D", "backgroundColor": "#FFF2CC", "displayorder": 8 },
     "Measurement and Geometry": { "color": "#2D89EF", "backgroundColor": "#BFD6EF", "displayorder": 9 },
     "Measurement and Trigonometry": { "color": "#1E7145", "backgroundColor": "#D7F4E5", "displayorder": 10 },
     "Modelling Linear Relations": { "color": "#9F00a7", "backgroundColor": "#FEE6FF", "displayorder": 11 },
     "Quadratic Relations of the Form y = ax² + bx + c": { "color": "#E3A21A", "backgroundColor": "#E0CB9F", "displayorder": 12 },
     "Trigonometry": { "color": "#2D89EF", "backgroundColor": "#BFD6EF", "displayorder": 13 },
     "Earning and Purchasing": { "color": "#603CBA", "backgroundColor": "#E0D8F3", "displayorder": 14 },
     "Saving, Investing and Borrowing": { "color": "#FFC40D", "backgroundColor": "#FFF2CC", "displayorder": 15 },
     "Transportation and Travel": { "color": "#00A300", "backgroundColor": "#E6FFE6", "displayorder": 16 },
     "Data Management": { "color": "#1E7145", "backgroundColor": "#D7F4E5", "displayorder": 17 },
     "Geometry and Trigonometry": { "color": "#9F00A7", "backgroundColor": "#FEE6FF", "displayorder": 18 },
     "Mathematical Models": { "color": "#E3A21A", "backgroundColor": "#E0CB9F", "displayorder": 19 },
     "Personal Finance": { "color": "#2D89EF", "backgroundColor": "#BFD6EF", "displayorder": 20 },
     "Exponential Functions": { "color": "#603CBA", "backgroundColor": "#E0D8F3", "displayorder": 21 },
     "Quadratic Functions": { "color": "#FFC40D", "backgroundColor": "#FFF2CC", "displayorder": 22 },
     "Trigonometric Functions": { "color": "#00A300", "backgroundColor": "#E6FFE6", "displayorder": 23 },
     "Characteristics of Functions": { "color": "#1E7145", "backgroundColor": "#D7F4E5", "displayorder": 24 },
     "Discrete Functions": { "color": "#9F00A7", "backgroundColor": "#FEE6FF", "displayorder": 25 },
     "Applications of Geometry": { "color": "#E3A21A", "backgroundColor": "# E0CB9F ", "displayorder": 26 },
     "Derivatives and Their Applications": { "color": "#603CBA", "backgroundColor": "#E0D8F3", "displayorder": 27 },
     "Geometry and Algebra of Vectors": { "color": "#FFC40D", "backgroundColor": "#FFF2CC", "displayorder": 28 },
     "Rate of Change": { "color": "#00A300", "backgroundColor": "#E6FFE6", "displayorder": 29 },
     "Counting and Probability": { "color": "#1E7145", "backgroundColor": "#D7F4E5", "displayorder": 30 },
     "Culminating Data Management Investigation": { "color": "#9F00a7", "backgroundColor": "#FEE6FF", "displayorder": 31 },
     "Organization of Data For Analysis": { "color": "#E3A21A", "backgroundColor": "#E0CB9F", "displayorder": 32 },
     "Probability Distributions": { "color": "#2D89EF", "backgroundColor": "#BFD6EF", "displayorder": 33 },
     "Statistical Analysis": { "color": "#603CBA", "backgroundColor": "#E0D8F3", "displayorder": 34 },
     "Applications of Measurement": { "color": "#FFC40D", "backgroundColor": "#FFF2CC", "displayorder": 35 },
     "Reasoning with Data": { "color": "#1E7145", "backgroundColor": "#D7F4E5", "displayorder": 36 },
     "Exponential and Logarithmic Functions": { "color": "#9F00A7", "backgroundColor": "#FEE6FF", "displayorder": 37 },
     "Polynomial and Rational Functions": { "color": "#E3A21A", "backgroundColor": "#E0CB9F", "displayorder": 38 },
     "Polynomial Functions": { "color": "#603CBA", "backgroundColor": "#E0D8F3", "displayorder": 39 }
 };

   myArray = [0, 1, 2, 3, 4, 5, 6];
 
  @ViewChild('height')
  height: ElementRef;

 firstDivheight;
 secondDivheight;

 heightArray:any = [];
             Height(elment,index){
              //this.firstDivheight = elment.offsetHeight;
              //setTimeout(function(){ this.heightArray.push(this.firstDivheight); this.CaroselHeight();}, 500);
              console.log(index);
             }
             Height1(elment,index){
              //this.secondDivheight = elment.offsetHeight;
              //setTimeout(function(){ this.heightArray.push(this.secondDivheight); this.CaroselHeight()}, 500);
              console.log(index);
             }
             CaroselHeight(){
               console.log(this.heightArray); 
                 
             }
}
