
import {writable as internal, get} from 'svelte/store';

export const show_sub_title = writable('show_sub_title', false);
export const show_img_url = writable('show_img_url', false);
export const show_image = writable('show_image', false);
export const show_status = writable('show_status', true);

export const show_type = writable('show_type', true);
export const show_price = writable('show_price', true);

export const show_game_id = writable('show_game_id', true);
export const show_reward_amount = writable('show_reward_amount', true);

export const show_scheduled_on = writable('show_scheduled_on', true);
export const show_scheduled_off = writable('show_scheduled_off', false);
export const show_last_login = writable('show_last_login', true);
export const show_tickets_collected = writable('show_tickets_collected', true);
export const show_gems = writable('show_gems', false);

export const tour_set_ids = writable('tour_set_ids', true);

export const row_count = writable('row_count', 20);

// wraps a regular writable store
export function writable(key, initialValue) {
  
  const store = internal(initialValue)
  const {subscribe, set} = store

  // get the last value from localStorage
  let json = null
  json = localStorage.getItem(key)
  if (json) {
    set(JSON.parse(json))
  }
  
  return {

    set(value) {
      localStorage.setItem(key, "" + JSON.stringify(value))
      set(value)
    },

    update(cb) {
      const value = cb(get(store))
      this.set(value)
    },
    
    subscribe
  }
} 
