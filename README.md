# Ecmascript Drabbles

Just some randomly inspired Ecmascript experiments. These were done as a personal challenge, to implement new types of programs I hadn't done before, to learn more about HTML5 and canvas. I started with the idea of developing a given drabble under a strict time limit, but eventually gave up on that since sometimes I just wanted to revisit a drabble and play with it more, add new features, etc. There's little consistency between drabbles as I learned to ways to do things as I went along. 

This whole project is a playground and sandbox for me to learn and explore Javascript in. I often make up new design patterns and try them out here, deciding if they're worthwhile or not. Maybe I'll start putting together a design patterns file to share what I've discovered / created. 

The Drabbles (in roughly cronologic order):

##derfrun - 
A simple platformer inspired by 'n'. I keep breaking the collision model as I try different ways to do it. 

##fawoosh -
Particle effects that started with no particular shape in mind, but eventually grew into a inferno. Now with "wind"!

##sploosh - 
The fawoosh code twisted to it's elemental opposite. A water hose with bouncing dropplets. 

##hyperpong - 
Done as a demonstraition for a friend to show how easy it is to make a simple game, and how much fun it can be just playing with a few parameters. Classic head to head pong, but now it just constantly sprays new balls all over. left/right arrows for player one, 'z'/'x' for player two. 

##life - 
As some point I realized I never made an implementation of conway's game of life. So here it is. I've revisited this a few times to add features, and ended up splitting it into two 'modes'. `conway.htm` uses 'screensaver' mode. This creates a instance of the game of life with no interface, which periodically resets with random data and is always running through generations. I actually used this as a sort of screensaver on a spare monitor at work for a time.  `conway2.htm` uses 'control' mode, with a bunch of HTML input elements. This mode allows cells to be drawn on the game, and for the user to pause / run / change speed of generations, among other controls. 

##pool - 
...Working on collision models, and this has become a sort of playground for them. It's getting better, but still has some problems. If my attention returns to this drabble, I will try to improve the physics model and maybe push this into being a full billiards / pool game. 

##flap - 
Another simplicity of gamedev demo, this time of flappy bird. Coded it under a strict fifteen minute time limit, and managed to get pretty far. It's not pretty, and it's not even that good, but for such a short time limit I think I did quite well. 

##synthgames - 
I've always liked chiptunes and tracker software, and when I found timbre.js I knew I had to try and make something. Even something simple. Currently the root is locked to c4, the tracker only has a range of one octave, and it's locked to 4/4 time with eigth note precision. Square, Saw, and Sine waves are available synths, and the BPM can be set. 

##RL -
Oh man, I've always loved roguelikes. This is a bare bones system just to explore certain fundamentals of the genre, namely map generation and simple movement.  A bit buggy with stairs, but I mostly made this thing from scratch with no references for how such games normally are made. (asside from a cave algorithm that I took some inspiration from)

##Snockie - 
An implementation of Snake. Took a while to get the controls right. Applespam led to what I feel is an interesting twist on the game. New apples won't spawn after the first set finishes, so the objective is to eat them all even as you grow to stupid lengths. Start managing your body right away or you won't last very long at all. 

##Nom - 
Is it obvious that I've been playing a lot of agar.io? I had a lot of fun with this, even with just adjusting parameters in different ways.

##logo - 
A playground for what I'm considering as a personal logo. It's a very low-res rendering of the string "RAVT", a truncation of my old nickname "Rav-T". I'm playing with different animations to see what I like, with a goal of creating a quick <2000 ms logo dispaly that I could use for future projects. 

##Dice - 
A dice roller that can parse a limited subset of D&D formatted dice strings. I wanted something that could be used as a library in future projects, most specifically the Roguelike drabble, but also any time I wanted random numbers with certain bounds and distributions. I also wanted to try my hand at code golf. I managed to reduce the function for parsing and rolling a given dice string (ie. "2d6+7") to 202 characters. I also included a set of qunit tests. I'm normally a big proponent of test-first development, but for drabbles I slack off on this since the goal is kinda freeform exploration. In this case I had a specific goal in mind. Plus, testing a randomness function was an interesting challenge.  I couldn't have every test have an exact result, but instead a confidence interval of results. 


##dgam -
based on 'dice.swf', a risk-like game I've seen often on 4chan's /f/. I plan on making somethign similar, a territory control game with dicerolling to see who wins a conflict. I've been having a lot of interesting things coming fromt he cellular automata I user to start the map. 
