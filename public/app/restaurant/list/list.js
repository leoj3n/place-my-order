import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';

import City from 'app/models/city';
import State from 'app/models/state';
import Restaurant from 'app/models/restaurant';
import template from './list.stache!';

export const ViewModel = Map.extend({
  define: {
    states: {
      get() {
        return State.findAll({});
      }
    },
    state: {
      value: null,
      set() {
        // Remove the city when the state changes
        this.attr('city', null);
      }
    },
    cities: {
      get() {
        var state = this.attr('state');
        return state ? City.findAll({ state }) : null;
      }
    },
    city: {
      value: null
    },
    restaurants: {
      get: function(){
        var params = {},
          state = this.attr('state'),
          city = this.attr('city');

        return state && city ?
          Restaurant.findAll({
            'address.state': state,
            'address.city': city
          }) : null;
      }
    }
  }
});

export default Component.extend({
  tag: 'app-restaurant-list',
  viewModel: ViewModel,
  template
});
