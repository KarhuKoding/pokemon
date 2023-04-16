[commits](https://user-images.githubusercontent.com/30233804/232327581-7e2bea3b-8bb5-4f39-a6a0-30d4436cb6e9.PNG)


# Brainstorming, (before coding)

#### Techstack:

- Next.js (npx create-next-app@latest)
- Typescript
- Mantine UI as Component Library (Pagination and Inputs)
- Page Layout custom css, next.js css modules
- fetch for requests

#### Min-requirements

- List => index Page, index.js
- Detail Page => dynamic Page, [pokemonName]
- Pagination (can get tricky with pre-rendering)
- reusable code for the request
- own feature branch, dont push on master
- I will use the next.js starter porject as foundation

#### Problems I see from now:

- I actually want to put the list and the Detail Page on one Page
  so index.js and [pokemonName] should be on one page. I am
  not really sure how to do that with next.js because it is not the recomended way
- styling will take to long => keep for the end, having this effect on a Detail Card or rendering the details in this was would be aweseome https://poke-holo.simey.me/, but is not required
- I will keep types to a minimum, just for the GET request, more if there is still time
- No big error handling
- Stuff that I come up during develompent I will just put in a comment if not nessacary

#### Optional-requirement:

- Search can be done with a autocomplete from ManintUI and the input can be handled with
  debounce from lodash, trim() and min-3 length will be just handled by react, no visual feedback

Project wont be responsible!


#### <img src="Mockup.png" alt/>

---

# Progress:

> Please use the Readme to give us a short insight into your approach. That means please describe briefly how you tackled the solution and what core elements of your solution are. You can point us to interesting pieces of code or even parts that you’d like to improve over time.

- finished in excactyl 4 hours
- 1 index page with pagination and autocomplete search
- detail page

I did these things in the following order:

1. setup project on main branch
2. created Layout
3. created List (Cards in GridContainer)
4. Detail Page and extracted data
5. Pagination
6. Search with Autocomplete

Not so good stuff:

- Waterfall approach
- run into a view issues since i expected a cleaner api, was pretty nested and a bit weird to get the images
- approach doesn't use the full potential of next.js, there is just the index page pre-rendered with 15 pokemon, the dynamic page not at all
- failed to put everything on one side, dedicated detail page approach went faster
- search doesn't work as it was asked, have chosen a more forward autocompletet apporach

# I haven't checked any typos, I was pretty much excatly at 4 hours with this "documentation"
