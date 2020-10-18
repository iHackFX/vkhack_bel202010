import react, { Component } from "react";
import { render } from "react-dom";
import { ActionSheet, ActionSheetItem } from "@vkontakte/vkui";
import axios from "axios";
export function getUserConversations(userId, setConversations) {
  var config = {
    method: "get",
    url:
      "https://cors-anywhere.herokuapp.com/http://" +
      "95.71.15.60" +
      ":8000/getConversations?userID=" +
      userId,
    headers: {
      Origin: "http://localhost:10888",
      "Access-Control-Allow-Origin": "*",
    },
  };
  axios(config)
    .then(function (response) {
      if (response.data.data !== undefined) {
        setConversations(response.data.data);
      }
    })
    .catch(function (error) {});
}
export function getPubConversations(location, setPubConversations) {
  var config = {
    method: "get",
    url:
      "https://cors-anywhere.herokuapp.com/http://" +
      "95.71.15.60" +
      ":8000/getConversations?location=" +
      location,
    headers: {
      Origin: "http://localhost:10888",
      "Access-Control-Allow-Origin": "*",
    },
  };
  axios(config)
    .then(function (response) {
      if (response.data.data !== undefined) {
        setPubConversations(response.data.data);
      }
    })
    .catch(function (error) {});
}

export function search(query, setViewAddresses) {
  var config = {
    method: "get",
    url:
      "https://cors-anywhere.herokuapp.com/http://kladr-api.ru/api.php?query=" +
      query +
      "&oneString=1&limit=10&withParent=1",
    headers: {
      Origin: "http://localhost:10888",
      "Access-Control-Allow-Origin": "*",
    },
  };

  axios(config)
    .then(function (response) {
      if (response.data.result !== undefined) {
        setViewAddresses(response.data.result);
      }
    })
    .catch(function (error) {});
}
export function createConversation(name, userId, location, setPopout) {
  var config = {
    method: "get",
    url:
      "https://cors-anywhere.herokuapp.com/http://" +
      "95.71.15.60" +
      ":8000/createConversation?name=" +
      name +
      "&creator_id=" +
      userId +
      "&location=" +
      location,
    headers: {
      Origin: "http://localhost:10888",
      "Access-Control-Allow-Origin": "*",
    },
  };
  axios(config)
    .then(function (response) {
      if (response.data.status === "Error") {
        return("Error");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}