# Workout Diary Web Application

## About project
Bachelor's degree project implemented as a web application prototype. 

### What tasks were
- development of the client side of the application on React
- development of the server side of the application on Node.js
- creating Rest API on Express.js
- organization of routing requests from the client to the server
- Linking a PostgreSQL database to an application

##  Realization
The back end of the application used the Express.js framework in conjunction with the Sequalize ORM to communicate between the application server and the database server.
___

Docker technology was used to raise the database. 
___

### Create training

After authorization or registration, the user gets to the main page of the application. To create a workout, you need to add exercises to the workout by clicking the button at the bottom of the screen.

The user has the ability to edit the workout by deleting and adding exercises from the list:


<div>
    <img align=top src="https://github.com/AlexSunchozz/react-fitnotes/blob/master/assets/photo_2023-06-12_15-33-57.jpg"/>
    <img align=top src="https://github.com/AlexSunchozz/react-fitnotes/blob/master/assets/%D0%A0%D0%B8%D1%81%D1%83%D0%BD%D0%BE%D0%BA10.png"/>
    <img align=top src="https://github.com/AlexSunchozz/react-fitnotes/blob/master/assets/%D0%A0%D0%B8%D1%81%D1%83%D0%BD%D0%BE%D0%BA9.png"/>
<div>
___

In addition, the user has the ability to search for exercises by name in the search bar and using filters.
___

### Fixing progress

The user can record data about the performance of each exercise:

<div>
    <img align=top src="https://github.com/AlexSunchozz/react-fitnotes/blob/master/assets/%D0%A0%D0%B8%D1%81%D1%83%D0%BD%D0%BE%D0%BA8.png"/>
    <img align=top src="https://github.com/AlexSunchozz/react-fitnotes/blob/master/assets/%D0%A0%D0%B8%D1%81%D1%83%D0%BD%D0%BE%D0%BA7.png"/>
<div>
___

### Statistic

A special component was provided to track the statistics of each exercise:

<div>
    <img align=top src="https://github.com/AlexSunchozz/react-fitnotes/blob/master/assets/%D0%A0%D0%B8%D1%81%D1%83%D0%BD%D0%BE%D0%BA2.png"/>
    <img align=top src="https://github.com/AlexSunchozz/react-fitnotes/blob/master/assets/%D0%A0%D0%B8%D1%81%D1%83%D0%BD%D0%BE%D0%BA1.png"/>
<div>

___

### Calculators

For users who have no idea what weight to use for how many repetitions in the exercise, a calculator has been added to calculate the working weight in the exercise, which, based on the specified weight of the inventory and the number of repetitions, calculates the recommended weight of the projectile and the corresponding number of repetitions. repetitions from 1 to 15.
In addition, to achieve certain goals, the user needs to monitor nutrition, so a calculator has been added to the application that calculates the body mass index and daily calorie intake, including the required amount of protein, fat and carbohydrates, in accordance with certain stages and training goals.

<div>
    <img align=top src="https://github.com/AlexSunchozz/react-fitnotes/blob/master/assets/%D0%A0%D0%B8%D1%81%D1%83%D0%BD%D0%BE%D0%BA6.png"/>
    <img align=top src="https://github.com/AlexSunchozz/react-fitnotes/blob/master/assets/%D0%A0%D0%B8%D1%81%D1%83%D0%BD%D0%BE%D0%BA5.png"/>
<div>
___

### View training sessions

Viewing previous workouts is organized in a convenient calendar view, which allows the user to simply select the desired date and view all the exercises and information about the exercise in the selected workout.

![Image](https://github.com/AlexSunchozz/react-fitnotes/blob/master/assets/%D0%A0%D0%B8%D1%81%D1%83%D0%BD%D0%BE%D0%BA4.png)
___

### Timer

A timer has also been added for the user, which allows you to set the rest time between sets. The time set on the timer can be changed on the training page or open additional settings, where you can set the rest time, the timer change step and turn on an audio alert that will trigger when the timer expires.

<div>
    <img align=top src="https://github.com/AlexSunchozz/react-fitnotes/blob/master/assets/%D0%A0%D0%B8%D1%81%D1%83%D0%BD%D0%BE%D0%BA6.png"/>
    <img align=top src="https://github.com/AlexSunchozz/react-fitnotes/blob/master/assets/%D0%A0%D0%B8%D1%81%D1%83%D0%BD%D0%BE%D0%BA5.png"/>
<div>