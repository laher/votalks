// vDOM builder
import {h} from 'hyperapp'

// Bundle css for this view
import 'sanitize.css'
import './style.css'

// Import icon components
import {
  Close,
  Circle,
  CheckedCircle,
  Plus,
  Check,
  Github
} from './icons.js'

// Import actions
import {
  SetInput,
  AddItem,
  UpdateItem,
  ToggleItem,
  DeleteItem,
  ToggleStateViewer,
  ToggleItemEditing,
  ClearCheckedItems
} from './actions'

// Application view
export const view = state => (
  <div class="container">
  <h1>Votalks</h1>
  <div class="card">
  <div class="left">
  <div class="video-list">
    <form class="new-item-form" onsubmit={AddItem} method="post">
    <input type="text" placeholder="Drop a youtube video id here ..." value={state.input} oninput={SetInput} required />
    <button type="submit"><Plus /></button>
    </form>
    <h4>{state.items.length} talks</h4>
    <ul class="list">
    {state.items.map(item => <Item {...item} />)}
    </ul>
  </div>

  <div class="info">
  <span>Click to edit.</span>
  <a onclick={[ClearCheckedItems]}>Clear checked items</a>
  </div>

  </div>
  <div className="right">
  <p>Watch</p>
  {state.items.filter(item => item.id === state.selectedItem).map(item => <Viewer {...item} /> )}

  </div>

  </div>

  <div id="menu-outer">
  <div class="table">
  <ul class='nav'>
  <li>Video voting app</li>
  <li><a href="https://github.com/laher/votalks" target="_blank"><Github /> Source</a></li>
  <li><div><div class="g-signin2" data-onsuccess="onSignIn"></div></div></li>
  </ul>
  </div>
  </div>
  <div class="state-viewer">
  <a onclick={ToggleStateViewer}>{state.showState ? 'Hide state' : 'Show app state'}</a>
  {state.showState ? <pre>{JSON.stringify(state, null, 2)}</pre> : null}
  </div>
  </div>
)

const Viewer = ({id, value, done, editing}) => (
  <div>
  {value}
  <iframe width="420" height="315" src={"https://www.youtube.com/embed/" + value} />
  </div>
)

// Item component
const Item = ({id, value, done, editing}) => (
  <li class="item" key={id}>
  {
    editing
    ? ( // If the item if currently being edited
      <form class="inner" method="post" onsubmit={[ToggleItemEditing, id]}>
      <input type="text" value={value} onCreate={el => el.focus()} oninput={[UpdateItem, id]} required />
      <button class="confirm">{<Plus />}</button>
      <button class="confirm">{<Check />}</button>
      </form>
    )
    : ( // If the item is NOT being edited (default)
      <div class={'inner' + (done ? ' done' : '')}>
      <button class="check" onclick={[ToggleItem, id]}>{done ? <CheckedCircle /> : <Circle />}</button>
      <div class="name" onclick={[ToggleItemEditing, id]}>
      {
        done
        ? <strike>{value}</strike>
        : <span>{value}</span>
      }
      </div>
      <button class="delete" onclick={[DeleteItem, id]}><Close /></button>
      </div>
    )
  }
  </li>
)
