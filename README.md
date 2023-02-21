# Hack the North Frontend Challenge - Sanghoon Choi

Check out the project here: https://sanghoon5499.github.io/HTNFEC/

## 1. Walk us through your development process as you worked on this project. How did you plan out the structure and design of it? 

When designing apps, I like to create a "base template" first. This sets up the structure and logic of the page as well as its functionality. The final touches tend to be quite finicky so I also prefer to leave them to the end when I know there will not be large overhauls in the layout.

Structure:
I separated the 3 main functions into 3 separate pages. I felt it to be the simplest way to demonstrate each function as its own page. 
- Frontpage: I considered having the Login/My Account buttons of the landing page in the top right corner, but seeing as they are the main features of this page, I decided to keep them front and centre.
- Login page: The structure for this is simple. A submittable form, as well as a return to the homepage.
- Upcoming events: I structured the 15 events to take up a 5x3 matrix shape on desktops, and 15x1 on mobile devices. Using the grid system from Bootstrap made this process easier. 
- Other: I always make sure to check if the page works on 1k, 2k browsers, as well as a mobile device. 

Design:
The design is simple (you may have been able to tell I'm not much of a designer : D). I thought the name "Hackathon Global" would fit with a theme where the main highlight is the globe, mainly inspired by the Blue Marble image (https://www.nasa.gov/content/blue-marble-image-of-the-earth-from-apollo-17). I think the black coming from space is a pretty good "dark mode" too.

-----

## 2. How did decide on the tools you've used? 

In regards to tools, it was mainly Bootstrap doing a lot of the heavy lifting. For hosting, GitHub Pages is my go-to option. 
Bootstrap's grid system is simple to work with and gets me the results that I look for. The extensive documentation as well as many examples make the development process very smooth. 
GitHub pages because it's free and I version control on GitHub anyway. 

-----

## 3. Did you encounter any problems? And if so, how did you solve them? 

While most of the project went by quite smoothly, there was a source of a constant headache; edge cases. Getting the private/public events sorted out with my implementation seemed to bring about some edge cases. I'm sure there may have been better methods for implementation, but for mine, there were a few variables I had to depend on, including:
- should we render this element/row?
- are we on a mobile device?
- event permissions/is the user logged in?
- typically array shenanigans

To get these sorted out, drawing out an event flow "map" seemed to help me get things sorted out. Determining which events must come first, then branching off (if-statement), etc. Drawing things out gave me a visual representation of what to do. 

-----

## 4. Are there any areas of your code that you're particularly proud of or want to point out?

This may not be a particularly amazing, nor noteworthy part for experienced frontend developers, but I am personally proud of the continuously generative HTML elements. For some time, I've struggled with creating non-repeated code in front-end development, especially for things like lists and whatnot. Being able to combine all the required features (sorted by start_time and hiding private events when needed), into the generative code was a cool experience. Everything also works on a mobile device as well, making it a super dynamic part of the page!
Bootstrap made this easier, being able to group divs into a row. 


-----
-----
## Given additional time, how would you extend your application to become a fully functional product that thousands of hackers and the general public would use at Hackathon Global Inc.™'s next event? Would you add more features and performance metrics? If so, what would they be?

- There are many parts of this project I would like to see expanded upon if it were to become a fully functional product. One of the key features would be user registration, but that would have to be worked out with the backend team.
- I would also like to reduce the number of pages the user has to navigate through in order to login/create an account as well as other actions. For example, the login screen could be a popup, rather than a whole page itself. It would be nice to have some UI changes to keep navigation buttons pinned to the top bar, rather than centred as it is now.
- An interesting idea that I had with each event tile, was to make it so that clicking them, would bring up a smaller box (still within the same page), with more details (related events, embedded links, etc).
- As for the events page, I would've liked to see more dynamic elements. Even though it already is to some extent, things such as table columns and rows are hard-coded to become particular values depending on the user's device. Another extension of this would be each event's description text truncation. Perhaps I could write a function to determine if the text body will overlap with the next text body, and prevent the text from overflowing in that manner. The current implementation is a cutoff, set to 120 or 80 depending on desktop or mobile, respectively. 
- Continuing from before, there are a few hard-coded values that I would like to update. (repeated HTML elements, hard-coded text values in .html file itself, changing DOM elements).
- Some repeated code exists that I was not able to fix to my standards in time. While it looks a little ugly, the functionality hasn't been affected.
- This last one is a nitpick, but I think the upcoming events page looks kinda tacky with a sci-fi vibe that I don't particularly love. 


-----
-----

## Any other thoughts you have (not limited to the previous questions). 

Just wanted to say I had a fun time with this challenge. Coming from a mobile development side of things with a lot less web dev experience, there were a lot of things that seemed familiar, but also things that were new to me. Looking forward to hearing from you.
