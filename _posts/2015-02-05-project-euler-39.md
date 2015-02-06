---
layout:     post
title:      Project Euler 39 
date:       2015-02-05 07:33:00
summary:    My solution to the 39th Project Euler problem..
categories: 
---

The 39th problem in the collection of Project Euler challenges is stated as follows: 

> If p is the perimeter of a right angle triangle with integral length sides, {a,b,c}, there are exactly three solutions for p = 120.
> 
> {20,48,52}, {24,45,51}, {30,40,50}
> 
> For which value of p ≤ 1000, is the number of solutions maximised?
>

As you can probably imagine the crux of this problem really comes down to finding an efficient way to calculate the number of solutions for a given perimeter. We'll focus on a few ways to do that below.

## Brute Forcing the Solution

Naturally the first thing we can try here is set up two loops, from _1 - p_, to get the first two sides of our candidate triangle, and then calculate the third side (the three must add to _p_).

At this point we have a candidate set of sides, to check if it truly is a right triangle we can make use of the pythagorean theorem (_a^2 + b^2 = c^2_). If it holds then our candidate triangle is in fact valid.

What this looks like in code:

{% highlight python %}
def getSolutions(p):
  ret = 0;
  for i in range(2, p):
    for j in range(1, i):
      k = p - i - j;
      if k * k == (i * i + j * j):
        ret = ret + 1;
  return ret;
{% endhighlight %}

As you can see here I've made one subtle change to the algorithm discussed above which is to force _j_ to be no larger than _i_. I do this to prevent the algorithm from rediscovering duplicate solutions in which the values of _i_ and _j_ are just reversed. 

On the surface this algorithm doesn't look too bad. Given a value _p_ we can in _O(n^2)_ calculate the number of solutions. If our input values are capped at _1000_ this should give us a solution almost instantly.

Unfortunately, we are ignoring half of the problem which is that in our main method we have to try all values of _p_ up to _1000_. This means that our actual running team is _O(n^3)_ and no longer something that we can expect to run efficiently for inputs of size _1000_. 

{% highlight python %}
def solve(n):
  best = 0;
  ret = 0;
  for i in range(1, n + 1): 
    s = getSolutions(i);
    if s > best:
      best = s;
      ret = i;
  return ret;
{% endhighlight %}

When I time this solution it takes about 35 sec. Ouch. Fortunately, there are a few minor tweaks we can make to get some drastic improvement. 

## Optimizations

First off we can make use of the simple fact that _k > i_ and _k > j_ as _k_ is the hypotenuse in our right triangle. If we add the following code inside our nested loop we can get the running time immediately down to 10 sec!

{% highlight python %}
if i > k or j > k:
  break;
{% endhighlight %}

Now, asymptotically, our running time is still _O(n^3)_ but we've drastically reduced the amount of time we will spend looking for candidate solutions by terminating the inner loop when we know we can't find any more solutions.

We can continue down this path of optimizations (adding more conditions to break out of loops, tightening our upper bounds in the loop conditions, etc) but none of this will change the fact the the algorithm is _O(n^3)_. If we want to see an order of magnitude difference we have to get more creative.

## Math to the Rescue

At the end of the day what we are really trying to do in this problem is find solutions that satisfy the following system of equations.

* _a^2 + b^2 = c^2_
* _a + b + c = p_

If we solve the second equation for _c_ and plug it into the first equation we get the following.

_a^2 + b^2 = (p - a - b)^2_

Which becomes

_<s>a^2</s> + <s>b^2</s> = p^2 - 2pa - 2pb + <s>a^2</s> + <s>b^2</s> + 2ab_ 

If we solve for _b_ we get

_b = (p^2 - 2pa)/(2p - 2a)_

Now we have an equation for _b_, dependent on two variables _p_ and _a_. What this means is that, we can rewrite _getSolutions(p)_ function to have a single loop and simply iterate over all values of _a_. Then, we can check if, given _p_ and _a_, there exists an integer _b_ that satisfies the equation.

{% highlight python %}
def getSolutions(p):
    ret = 0;
    for a in range(1, p):
        if (p * p - 2 * p * a) % (2 * p - 2 * a) == 0:
            ret = ret + 1;
    return ret;
{% endhighlight %}

Our algorithm is now _O(n^2)_ and runs blazingly fast (about _.2_ sec on my laptop). We can add some further optimizations to make this even faster but for now I'll leave that as an exercise to the reader. A link to my final solution can be found [here](https://github.com/chrisbubernak/ProjectEulerChallenges/blob/master/39_IntegerRightTriangles.py).