# _Alexey Ignatkevich_
# CV
### CONTACT INFO:
+ __Location__: Belarus, Brest.
+ __Phone__: +375295417824
+ __E-mail__: lexa23523@gmail.com
+ __Telegram__: @mesoke
+ __[GitHub](https://github.com/WizzArt0)__

### SKILLS:
- HTML
- CSS
- JavaScript (Fundamentals, Functional Programming, ES6+, DOM)
- Git
- C++ and Python (basic knowledge)
- Figma
- VS Code, WebStorm
### ABOUT ME:
>_A fourth-year student of Brest State Technical University. 
What comes for my outdoor activities, I'm into sports such as volleyball, baseball and, most of all, football. 
Even though my speciality is front-end developing, I'm am a quick-learner and open to any suggestions.
Unfortunately, I do not have work experience yet, as I do not have enough skills and knowledge, but I would like to get it with pleasure._

### EDUCATION: 
4th year student of Brest Technical University (BrSTU). Faculty of Electronic Information Systems. I study in the specialty automated information processing systems (ASOI).

### LANGUAGES:
1. English - Pre-Intermediate/A2 (according to the online test at Efset.org)
2. German - Intermediate/Upper-intermediate B1/B2
2. Russian - Native
3. Belorussian - Advanced
### CODE EXAMPLE:
__finds perfect numbers in a given range__

```
function getOwnDivisors(num) {
	var arr = [];
    for(let i = 1, k = 0; i < num; i++){
        if(num % i == 0){
            arr[k] = i;
            k++;
        }
    }
    return arr;
}

function getSum(arr) {
	var sum = 0;
    for(let elem of arr){
        sum += elem;
    }
    return sum;
}

function getPerfect(start, end){
    let result = [];
    for(let i = start; i <= end; i++){
        if(getSum(getOwnDivisors(i)) == i){
            result.push(i);
        }
    }
    return result;
}

 console.log(getPerfect(1, 1000));
 ```
