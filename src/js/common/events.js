'use strict';
import helpers from './helpers';

// Default options
var defaults = {
  formeoLoaded: (evt) => {
    // console.log(evt);
  },
  onAdd: () => {},
  onUpdate: (evt) => {
    // console.log('onUpdate', evt);
  },
  confirmClearAll: (evt) => {
    if (window.confirm(evt.confirmationMessage)) {
      evt.clearAllAction(evt.rows);
    }
  }
};

/**
 * Events class is used to register events and throttle their callbacks
 */
var events = {
  init: function(options) {
    this.opts = Object.assign({}, defaults, options);
    return this;
  }
};

document.addEventListener('formeoUpdate', function(evt) {
  evt = {
    timeStamp: evt.timeStamp,
    type: evt.type,
    formData: evt.detail.formData
  };
  events.opts.onUpdate(evt);
  // window.controlNav = evt.detail.formeo.controls.controlNav;
  // console.log(events.opts, evt.detail);
});

document.addEventListener('confirmClearAll', function(evt) {
  evt = {
    timeStamp: evt.timeStamp,
    type: evt.type,
    rows: evt.detail.rows,
    rowCount: evt.detail.rows.length,
    confirmationMessage: evt.detail.confirmationMessage,
    clearAllAction: evt.detail.clearAllAction,
    clearBtnCoords: evt.detail.clearBtnCoords
  };

  events.opts.confirmClearAll(evt);
});

document.addEventListener('formeoLoaded', function(evt) {
  events.opts.formeoLoaded(evt.detail.formeo);
  // window.controlNav = evt.detail.formeo.controls.controlNav;
  // console.log(events.opts, evt.detail);
});

export default events;