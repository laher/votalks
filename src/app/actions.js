// ==================
// Global actions
// ==================

// Generates a unique random string
import nanoid from 'nanoid'
import YouTube from 'simple-youtube-api'

// Sets the new item input value in the state
export const SetInput = (state, ev) => ({
  ...state,
  input: ev.target.value
})

const youtube = new YouTube('AIzaSyA0rLfYb8kypIq7Ei--1NTeXKetskVnK4w');
export const Search = (state, ev) => {
  ev.preventDefault()

  youtube.searchVideos(state.input, 4)
    .then(results => {
      console.log(`The video's title is ${results[0].title}`)
    })
    .catch(console.log)
  return {
    ...state,
  }
}

// Toggle the state viewer
export const ToggleStateViewer = (state) => ({
  ...state,
  showState: !state.showState
})

// Adds a new item in the array
// and resets the input.
export const AddItem = (state, ev) => {
  ev.preventDefault()
  const id = nanoid()
  return {
    ...state,
    input: '',
    selectedItem: id,
    items: state.items.concat({
      id: id,
      value: cleanInput(state.input),
      done: false,
      editing: false
    })
  }
}

const cleanInput = (input) => {
  const pref = "https://www.youtube.com/watch?v="
  if (input.startsWith(pref)) {
    return input.substring(pref.length)
  }
  return input
}

// Updates the "value" attribute of an item by ID
export const UpdateItem = (state, id, ev) => ({
  ...state,
  selectedItem: id,
  items: state.items.map(item =>
    id === item.id
    ? ({...item, value: ev.target.value})
    : item
  )
})

// Inverts the "done" attribute of an item by ID
export const ToggleItem = (state, id) => ({
  ...state,
  selectedItem: id,
  items: state.items.map(item =>
    id === item.id
    ? ({...item, done: !item.done})
    : item
  )
})

// Inverts the "editing" attribute of an item by ID,
// and sets to false for all other items
export const ToggleItemEditing = (state, id, ev) => {
  ev.preventDefault()
  return {
    ...state,
    selectedItem: id,
    items: state.items.map(item =>
      id === item.id
      ? ({...item, editing: !item.editing})
      : ({...item, editing: false})
    )
  }
}

// Removes an item in the array by ID
export const DeleteItem = (state, id) => ({
  ...state,
  selectedItem: state.selectedItem === id ? null : state.selectedItem,
  items: state.items.filter(item => id !== item.id)
})

// Removes all "done" items
export const ClearCheckedItems = (state) => ({
  ...state,
  selectedItem: null,
  items: state.items.filter(item => !item.done)
})
