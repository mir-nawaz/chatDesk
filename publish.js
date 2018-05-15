'use strict';

const zipFolder = require('zip-folder');
const path = require('path');
const fs = require('fs');
const request = require('request');
const config = require('./config');

const rootFolder = path.resolve('.');
const zipPath = path.resolve(rootFolder, config.zipPath);

function uploadZip(callback) {
  fs.createReadStream(zipPath).pipe(request.put(config.kuduApi, {
    auth: {
      username: config.userName,
      password: config.password,
      sendImmediately: true
    },
    headers: {
      'Content-Type': 'applicaton/zip'
    }
  }))
    .on('response', function(resp) {
      if (resp.statusCode >= 200 && resp.statusCode < 300) {
        fs.unlink(zipPath);
        callback(null);
      }
      else if (resp.statusCode >= 400) {
        callback(resp);
      }
    })
    .on('error', function(err) {
      callback(err);
    });
}

function publish(callback) {
  zipFolder(rootFolder, zipPath, function(err) {
    if (!err) {
      uploadZip(callback);
    }
    else {
      callback(err);
    }
  });
}

publish(function(err) {
  if (!err) {
    console.log('etisalatdesk publish'); // eslint-disable-line no-console
  }
  else {
    console.error('failed to publish etisalatdesk', err); // eslint-disable-line no-console
  }
});
