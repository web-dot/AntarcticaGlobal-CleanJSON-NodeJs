In the JavaScript file, write a program to perform a GET request on the route 
https://coderbyte.com/api/challenges/json/json-cleaning and then clean the object 
according to the following rules: 
1.Remove all keys that have values of N/A, -, or empty strings. 
2.If one of these values appear in an array, remove that single item from the array.
3.For all keys removed, create a key/value pair at the end of the output object with the
 key items_removed and the value is the count. 
4.Then console log the modified object as a string