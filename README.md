**Problem 2: Fancy Form**  
Create a currency swap form based on the template provided in the folder. A user would use this form to swap assets from one currency to another.

![Problem 2](/problem2/images/demo/test-fullstack-problem-2.gif)

**Problem 4: Three ways to sum to n**  
Provide 3 unique implementations of the following function in TypeScript.  
*Input*: `n` - any integer  
*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.  
*Output*: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.  

- Comment on the complexity or efficiency of each function. 

![Problem 4](/problem4/images/test-fullstack-problem-4.png)


**Problem 5: Develop a backend server with ExpressJS**  
You are required to build a set of CRUD interface that allow a user to interact with the service. You are required to use TypeScript for this task.  

Demo:
- Using sqlite as the database
- To run the server, type `npm install` and `npm run start`  

![Problem 5](/problem5/images/test-fullstack-problem-5.gif)


**Problem 6: Architecture**  
Write the specification for a software module on the API service (backend application server).
1. Create a documentation for this module on a `README.md` file.
2. Create a diagram to illustrate the flow of execution. 
3. Add additional comments for improvement you may have in the documentation.
4. Your specification will be given to a backend engineering team to implement.

*Software Requirements*
1. We have a website with a score board, which shows the top 10 user’s scores.
2. We want live update of the score board.
3. User can do an action (which we do not need to care what the action is), completing this action will increase the user’s score.
4. Upon completion the action will dispatch an API call to the application server to update the score.
5. We want to prevent malicious users from increasing scores without authorisation.

Solution:
[Specification for score modlule](problem6/README.md)